<script>
/* ================= Fluxo de caixa ================= */
const SIMS = {
  ca:[{k:'med', n:'Antecipar medição da obra Jardins (R$ 48 mil) para 18/10', dia:3, v:48000},{k:'ger', n:'Renegociar Gerdau Aços para 30 dias', dia:4, v:21450, volta:34},{k:'emp', n:'Capital de giro de R$ 30 mil em 17/10', dia:2, v:30000, volta:60}],
  def:[{k:'ant', n:'Antecipar recebíveis de cartão (taxa 1,9%)', dia:2, v:15000},{k:'adi', n:'Adiar compra de estoque para o dia 25', dia:5, v:9000, volta:10}]
};
VIEWS.fluxo = {
  t:'Fluxo de caixa', sub:'Realizado e projetado por cliente, com alerta de saldo mínimo',
  render(){
    const c = C[state.fluxoCli]; const pts = serieCaixa(c); const sims = SIMS[c.id] || SIMS.def;
    sims.forEach(s => { if (!state.sims.has(c.id+s.k)) return; pts.forEach(p => { if (p.i>=s.dia) p.s += s.v; if (s.volta && p.i>=s.volta) p.s -= s.v*(s.k==='emp'?1.08:1); }); });
    this._pts = pts; this._min = c.minimo;
    const minP = pts.reduce((a,p)=>p.s<a.s?p:a, pts[0]);
    const e30 = pts.slice(1,31).reduce((a,p)=>a+p.ent,0), s30 = pts.slice(1,31).reduce((a,p)=>a+p.sai,0);
    const weeks = [0,1,2,3,4,5].map(w=>{ const sl = pts.slice(w*7+1, w*7+8); return {ini:sl[0].d, fim:sl.at(-1).d, ent:sl.reduce((a,p)=>a+p.ent,0), sai:sl.reduce((a,p)=>a+p.sai,0), fin:sl.at(-1).s}; });
    return `<div class="toolbar"><div class="row"><select class="sel" id="fx-cli" aria-label="Cliente">${cliOptions(state.fluxoCli,false)}</select><span class="sub">${c.contas} contas consolidadas · saldo mínimo definido com o cliente: <b>${brl(c.minimo,0)}</b></span></div>
      <div class="seg" role="group" aria-label="Período"><button type="button" aria-pressed="false">30 dias</button><button type="button" aria-pressed="true">90 dias</button><button type="button" aria-pressed="false">12 meses</button></div></div>
    <div class="grid g4">
      ${kpi({t:'Saldo hoje', v:brl(c.saldo), c:'#fff', hero:true, icn:'wallet', foot:`<span>${c.contas} contas bancárias</span><span>atualizado 07:02</span>`})}
      ${kpi({t:'Menor saldo em 90 dias', v:brl(minP.s), c:minP.s<0?'var(--red)':minP.s<c.minimo?'var(--amber)':'var(--green)', icn:'alert', foot:`<span>em <b>${dmy(minP.d)}</b> (${rel(minP.i)})</span>${minP.s<0?'<span class="chip bad">negativo</span>':minP.s<c.minimo?'<span class="chip warn">abaixo do mínimo</span>':'<span class="chip ok">seguro</span>'}`})}
      ${kpi({t:'Entradas previstas · 30 dias', v:brl(e30,0), c:'var(--green)', icn:'down', foot:`<span>recebíveis + cartões</span>`})}
      ${kpi({t:'Saídas previstas · 30 dias', v:brl(s30,0), c:'var(--red)', icn:'up', foot:`<span>contas, folha e impostos</span>`})}
    </div>
    <section class="card"><div class="ch"><div><h3>Saldo projetado · ${esc(c.nome)}</h3><div class="sub">Passe o mouse para ver entradas, saídas e saldo de cada dia</div></div><div class="legend"><span><i style="--c:var(--blue)"></i>Saldo projetado</span><span><i class="dash" style="--c:var(--amber)"></i>Saldo mínimo</span><span><i style="--c:var(--red)"></i>Negativo</span></div></div>
      ${cashLine(pts, c.minimo, {id:'cl1'})}</section>
    <div class="grid g-7-5">
      <section class="card"><div class="ch"><div><h3>Próximas semanas</h3><div class="sub">Projeção semanal</div></div></div><div class="tw"><table><thead><tr><th>Semana</th><th class="r">Entradas</th><th class="r">Saídas</th><th class="r">Saldo final</th><th></th></tr></thead><tbody>
        ${weeks.map(w=>`<tr><td><b>${dmy(w.ini)} a ${dmy(w.fim)}</b></td><td class="r num" style="color:var(--green);font-weight:700">${brl(w.ent,0)}</td><td class="r num" style="font-weight:700">${brl(-w.sai,0)}</td><td class="r num" style="font-weight:800;${w.fin<0?'color:var(--red)':''}">${brl(w.fin,0)}</td><td>${w.fin<0?'<span class="chip bad">negativo</span>':w.fin<c.minimo?'<span class="chip warn">abaixo do mínimo</span>':'<span class="chip ok">ok</span>'}</td></tr>`).join('')}
      </tbody></table></div></section>
      <section class="card"><div class="ch"><div><h3>Simulador</h3><div class="sub">Ligue uma ação para ver o efeito no gráfico</div></div></div>
        <div class="ck">${sims.map(s=>{ const on = state.sims.has(c.id+s.k); return `<div class="ck-i${on?' on':''}" style="${on?'':'text-decoration:none'}"><button type="button" class="bx" data-sim="${s.k}" aria-pressed="${on}" aria-label="Simular: ${esc(s.n)}">${on?ic('check',3):''}</button><span style="text-decoration:none;color:var(--ink)">${esc(s.n)}</span><span class="chip ${on?'ok':'mute'} num">${s.volta?'±':'+'}${brlK(s.v)}</span></div>`; }).join('')}</div>
        <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" type="button" id="fx-send">${ic('send')}Enviar cenário ao cliente</button></div></section>
    </div>`;
  },
  bind(v){
    bindCashLine('cl1', this._pts, this._min);
    $('#fx-cli', v).onchange = e => { state.fluxoCli = e.target.value; render(); };
    $$('[data-sim]', v).forEach(b=>b.onclick=()=>{ const k = state.fluxoCli+b.dataset.sim; state.sims.has(k)?state.sims.delete(k):state.sims.add(k); render(); });
    $('#fx-send', v).onclick = () => toast('Cenário publicado no app do cliente com seu comentário');
  }
};

/* ================= Fechamentos ================= */
function fechDrawer(id){
  const c = C[id], pr = FECH_PROG[id];
  const body = () => `<div class="row">${av(c,'lg')}<div><b style="font-size:15px">${esc(c.nome)}</b><div class="sub">Competência setembro/2026 · ${ANALISTAS[c.an].nome}</div></div></div>
    <div><div class="row" style="justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:6px"><span>${pr.filter(Boolean).length} de ${pr.length} itens</span><span class="num">${Math.round(pr.filter(Boolean).length/pr.length*100)}%</span></div><div class="prog" style="height:8px"><i style="width:${pr.filter(Boolean).length/pr.length*100}%"></i></div></div>
    <div class="ck">${CHECK.map(([n,auto],i)=>`<div class="ck-i${pr[i]?' on':''}">${auto?`<span class="bx">${pr[i]?ic('check',3):''}</span>`:`<button type="button" class="bx" data-ck="${i}" aria-label="Marcar ${esc(n)}">${pr[i]?ic('check',3):''}</button>`}<span>${n}</span>${auto?`<span class="chip ${pr[i]?'ok':'bad'}">${pr[i]?'verificado':'pendente'}</span>`:''}</div>`).join('')}</div>
    <div class="note">Itens com selo são conferidos pelo sistema. Os outros você marca.</div>`;
  const foot = `<button class="btn" type="button" id="fd-pkg">${ic('dl')}Pacote para a contabilidade</button><button class="btn pri" type="button" id="fd-ok">${ic('lock')}Concluir e travar competência</button>`;
  const wire = () => {
    $$('[data-ck]', $('#drawer')).forEach(b=>b.onclick=()=>{ pr[+b.dataset.ck] = pr[+b.dataset.ck]?0:1; $('#dr-body').innerHTML = body(); wire(); if (state.view==='fechamentos') render(); });
  };
  openDrawer('Checklist de fechamento', body(), foot); wire();
  $('#fd-pkg').onclick = () => toast('Pacote gerado: extratos, comprovantes, NFs e razão · enviado a contabil@escritoriomoraes.com.br');
  $('#fd-ok').onclick = () => { FECH[id]='ok'; FECH_PROG[id] = FECH_PROG[id].map(()=>1); closeDrawer(); render(); toast(`Setembro de ${c.curto} concluído e travado`); };
}
VIEWS.fechamentos = {
  t:'Fechamentos', sub:'Competência setembro/2026 · checklist padrão do escritório',
  render(){
    const done = CLIENTES.filter(c=>FECH[c.id]==='ok').length;
    return `<div class="toolbar"><div class="row"><div class="seg" role="group" aria-label="Competência"><button type="button" aria-pressed="false">Agosto</button><button type="button" aria-pressed="true">Setembro</button><button type="button" aria-pressed="false">Outubro</button></div><span class="sub"><b style="color:var(--ink)">${done} de ${CLIENTES.length}</b> concluídos · prazo interno 22/10 (10º dia útil)</span></div>
      <button class="btn" type="button" id="fc-tpl">${ic('checks')}Editar checklist padrão</button></div>
    <div class="kanban">${FECH_COLS.map(col=>{ const cs = CLIENTES.filter(c=>FECH[c.id]===col.k); return `<div class="col"><div class="col-h"><span><i style="--c:${col.c}"></i>${col.n}</span><em>${cs.length}</em></div>
      ${cs.map(c=>{ const pr = FECH_PROG[c.id], n = pr.filter(Boolean).length; return `<button type="button" class="kc" data-fech="${c.id}"><div class="kc-t">${av(c,'sm')}<b>${esc(c.nome)}</b></div><div class="prog"><i style="width:${n/pr.length*100}%;--c:${col.c}"></i></div><div class="kc-f"><span>${n}/${pr.length} itens</span><span class="row" style="gap:5px">${col.k==='cli'?`<span class="chip wait">${c.pend||2} pedidos</span>`:''}<span class="av sm round" style="--c:${ANALISTAS[c.an].cor};width:20px;height:20px;font-size:8.5px" title="${ANALISTAS[c.an].nome}">${c.an}</span></span></div></button>`; }).join('') || `<div class="sub" style="text-align:center;padding:14px 0">Nenhum cliente</div>`}</div>`; }).join('')}</div>
    <div class="grid g3">
      <section class="card"><div class="ch"><div><h3>O que mais trava o fechamento</h3><div class="sub">Itens pendentes em todos os clientes</div></div></div>${hbars(CHECK.map(([n],i)=>({n, v:CLIENTES.filter(c=>!FECH_PROG[c.id][i]).length, cor:'var(--blue)'})).sort((a,b)=>b.v-a.v).slice(0,5).map(x=>({...x, q:'de 12'})), {max:12, fmt:v=>v+' clientes'})}</section>
      <section class="card"><div class="ch"><div><h3>Pedidos abertos aos clientes</h3><div class="sub">Gerados automaticamente pelo checklist</div></div></div>
        <div class="list">${[['rs','Extrato da maquininha Stone · set'],['rs','NF de 3 compras do Atacadão'],['ca','Contrato da obra Jardins'],['ca','Comprovante da medição 7'],['ps','Extrato do cartão Itaú · set']].map(([id,t])=>`<div class="li" style="grid-template-columns:auto minmax(0,1fr) auto"><span class="q-ic" style="--c:var(--violet)">${ic('file')}</span><div class="li-m"><b><span>${t}</span></b><small>${cliTag(C[id])}<span>pedido há ${id==='rs'?12:5} dias</span></small></div><button class="btn sm" type="button" data-remind="${id}">Lembrar</button></div>`).join('')}</div></section>
      <section class="card"><div class="ch"><div><h3>Tempo médio de fechamento</h3><div class="sub">Dias úteis após o fim do mês</div></div></div>
        ${groupedBars(['abr','mai','jun','jul','ago','set'].map((m,i)=>({lab:m, full:m+'/2026', d:[12,11,9,8,7,6.5][i]})), [{k:'d', nome:'Dias úteis', cor:'var(--blue)'}], {h:200, W:420, fmt:v=>v.toLocaleString('pt-BR')+' dias', tfmt:t=>String(t)})}
        <div class="sub" style="margin-top:6px">Meta do escritório: até 8 dias úteis</div></section>
    </div>`;
  },
  bind(v){
    $$('[data-fech]', v).forEach(b=>b.onclick=()=>fechDrawer(b.dataset.fech));
    $$('[data-remind]', v).forEach(b=>b.onclick=()=>toast(`Lembrete enviado para ${C[b.dataset.remind].curto}`));
    $('#fc-tpl', v).onclick = () => toast('Abriria o editor do checklist padrão');
  }
};

/* ================= Relatórios ================= */
VIEWS.relatorios = {
  t:'Relatórios', sub:'Relatório mensal pronto para o cliente, com a sua análise',
  render(){
    const c = C[state.relCli]; seed = c.ini.charCodeAt(0)*13; const k = c.honor/1450;
    const meses = ['abr','mai','jun','jul','ago','set'].map((m,i)=>{ const rec = (118+i*4+rnd()*14)*1000*k, desp = (104+i*2.4+rnd()*12)*1000*k; return {lab:m, full:m+'/2026', rec, desp, res:rec-desp, hl:i===5}; });
    const cur = meses[5], prev = meses[4];
    const cats = [['Matéria-prima',0.38],['Pessoal',0.27],['Ocupação',0.09],['Impostos',0.08],['Energia e gás',0.06],['Taxas de cartão',0.04],['Marketing',0.03],['Outros',0.05]];
    const CAT_COR = ['#2563EB','#0D9488','#D97706','#DB2777','#7C3AED','#0284C7','#65A30D','#8B899C'];
    const donutItems = cats.map(([n,p],i)=>({n, v:cur.desp*p, cor:CAT_COR[i]}));
    const dre = [
      ['Receita bruta', cur.rec*1.06, prev.rec*1.06, 'l1'],['(−) Impostos sobre vendas', -cur.rec*0.06, -prev.rec*0.06, 'l2'],['Receita líquida', cur.rec, prev.rec, 'tot'],
      ['(−) Custos variáveis', -cur.desp*0.46, -prev.desp*0.47, 'l2'],['Margem de contribuição', cur.rec-cur.desp*0.46, prev.rec-prev.desp*0.47, 'tot'],
      ['(−) Pessoal', -cur.desp*0.27, -prev.desp*0.27, 'l2'],['(−) Ocupação', -cur.desp*0.09, -prev.desp*0.09, 'l2'],['(−) Despesas administrativas', -cur.desp*0.18, -prev.desp*0.17, 'l2'],
      ['Resultado operacional', cur.res, prev.res, 'tot']
    ];
    const mg = cur.res/cur.rec*100;
    return `<div class="toolbar"><div class="row"><select class="sel" id="rl-cli" aria-label="Cliente">${cliOptions(state.relCli,false)}</select><div class="seg" role="group" aria-label="Período"><button type="button" aria-pressed="true">Setembro/26</button><button type="button" aria-pressed="false">3º tri</button><button type="button" aria-pressed="false">2026</button></div></div>
      <div class="row"><button class="btn" type="button" data-go="portal">${ic('eye')}Ver como o cliente</button><button class="btn g" type="button" id="rl-pub">${ic('send')}Publicar para o cliente</button></div></div>
    <div class="grid g4">
      ${kpi({t:'Receita líquida', v:brl(cur.rec,0), c:'var(--green)', icn:'down', foot:`<span>vs. agosto <b class="${cur.rec>=prev.rec?'':'neg'}">${cur.rec>=prev.rec?'+':''}${pct((cur.rec/prev.rec-1)*100,1)}</b></span>`})}
      ${kpi({t:'Despesas', v:brl(cur.desp,0), c:'var(--red)', icn:'up', foot:`<span>vs. agosto <b>${cur.desp>=prev.desp?'+':''}${pct((cur.desp/prev.desp-1)*100,1)}</b></span>`})}
      ${kpi({t:'Resultado', v:brl(cur.res,0), c:'#fff', hero:true, icn:'trend', sp:meses.map(m=>m.res), foot:`<span>6 meses</span><span>acumulado <b>${brlK(meses.reduce((a,m)=>a+m.res,0))}</b></span>`})}
      ${kpi({t:'Margem operacional', v:pct(mg,1), c:'var(--blue)', icn:'gauge', foot:`<span>segmento: 8% a 12%</span>${mg>=8?'<span class="chip ok">na faixa</span>':'<span class="chip warn">abaixo</span>'}`})}
    </div>
    <div class="grid g2">
      <section class="card"><div class="ch"><div><h3>Receitas x despesas</h3><div class="sub">Últimos 6 meses</div></div><div class="legend"><span><i style="--c:var(--green)"></i>Receitas</span><span><i style="--c:var(--red)"></i>Despesas</span></div></div>${groupedBars(meses, [{k:'rec', nome:'Receitas', cor:'var(--green)'},{k:'desp', nome:'Despesas', cor:'var(--red)'}])}</section>
      <section class="card"><div class="ch"><div><h3>Despesas por categoria</h3><div class="sub">Setembro/2026</div></div></div>${donut(donutItems, {sub:'Gasto'})}</section>
    </div>
    <div class="grid g-7-5">
      <section class="card"><div class="ch"><div><h3>DRE gerencial</h3><div class="sub">Setembro comparado a agosto</div></div><button class="lnk" type="button" id="rl-xls">Exportar</button></div><div class="tw"><table class="dre"><thead><tr><th>Conta</th><th class="r">Set/26</th><th class="r">Ago/26</th><th class="r">Var.</th></tr></thead><tbody>
        ${dre.map(([n,a,b,cl])=>{ const vr = (a/b-1)*100*(a<0?-1:1); return `<tr class="${cl==='tot'?'tot':''}"><td class="${cl==='l2'?'l2':'l1'}">${n}</td><td class="r num">${brl(a,0)}</td><td class="r num" style="color:var(--muted)">${brl(b,0)}</td><td class="r"><span class="var ${vr>=0?'up':'dn'}">${vr>=0?'▲':'▼'} ${pct(Math.abs(vr),1)}</span></td></tr>`; }).join('')}
      </tbody></table></div></section>
      <section class="card" style="display:flex;flex-direction:column;gap:12px"><div class="ch" style="margin:0"><div><h3>Análise do consultor</h3><div class="sub">Rascunho gerado a partir dos números · edite antes de publicar</div></div><span class="chip wait">${ic('spark')}rascunho</span></div>
        <div class="comment"><b>Destaque do mês:</b> a receita cresceu ${pct((cur.rec/prev.rec-1)*100,1)} e a margem fechou em ${pct(mg,1)}. Matéria-prima segue como maior despesa (38%). Renegociar o prazo com o Moinho Paulista liberaria cerca de ${brlK(cur.desp*0.38*0.3)} de caixa no início do mês.</div>
        <div class="field"><label for="rl-note">Seu comentário</label><textarea id="rl-note" rows="4">Taxas de cartão subiram para 4% das despesas. Vale cotar outra maquininha: a diferença de 0,4 p.p. na taxa representa cerca de R$ 380 por mês.</textarea></div>
        <div class="row" style="justify-content:space-between"><span class="sub">Reunião de resultados: <b style="color:var(--ink)">22/10 às 10h</b></span><button class="btn sm" type="button" id="rl-meet">${ic('cal')}Remarcar</button></div></section>
    </div>`;
  },
  bind(v){
    $('#rl-cli', v).onchange = e => { state.relCli = e.target.value; render(); };
    $('#rl-pub', v).onclick = () => toast(`Relatório de setembro publicado no app de ${C[state.relCli].curto} · cliente notificado`);
    $('#rl-xls', v).onclick = () => toast('Exportaria em PDF e Excel com a sua marca');
    $('#rl-meet', v).onclick = () => toast('Abriria a agenda');
  }
};

/* ================= Clientes ================= */
function fichaCliente(id){
  const c = C[id]; const an = ANALISTAS[c.an];
  openDrawer('Ficha do cliente', `<div class="row">${av(c,'lg')}<div style="min-width:0"><b style="font-size:15px">${esc(c.nome)}</b><div class="sub">${esc(c.seg)} · CNPJ 12.${String(345+c.honor).slice(0,3)}.678/0001-${String(c.honor).slice(-2)}</div></div><span class="light ${c.saude}" style="margin-left:auto"></span></div>
    <div class="grid g2" style="gap:8px">${[['Saldo hoje', brl(c.saldo,0)], ['Saldo mínimo', brl(c.minimo,0)], ['Honorário', brl(c.honor,0)+'/mês'], ['SLA no mês', pct(c.sla)], ['Lançamentos/mês', c.mov], ['Analista', an.nome]].map(([l,v])=>`<div style="padding:10px 12px;border:1px solid var(--line);border-radius:10px"><div class="sub">${l}</div><b class="num">${v}</b></div>`).join('')}</div>
    <div><h3 style="font-size:13px;margin:0 0 8px">Aprovadores</h3><div class="list"><div class="li" style="grid-template-columns:auto minmax(0,1fr) auto"><span class="av round sm" style="--c:#4A4856">MS</span><div class="li-m"><b><span>Marcos Silva · sócio</span></b><small>aprova até R$ 10 mil sozinho</small></div><span class="chip ok">ativo</span></div><div class="li" style="grid-template-columns:auto minmax(0,1fr) auto"><span class="av round sm" style="--c:#8B899C">LS</span><div class="li-m"><b><span>Luciana Silva · sócia</span></b><small>2ª aprovação acima de R$ 10 mil</small></div><span class="chip ok">ativo</span></div></div></div>
    <div><h3 style="font-size:13px;margin:0 0 8px">Escopo do contrato</h3><div class="row">${['Contas a pagar','Contas a receber','Conciliação diária','Fluxo de caixa','Relatório mensal','Reunião mensal'].map(s=>`<span class="chip info">${s}</span>`).join('')}<span class="chip mute">Folha: fora do escopo</span></div></div>
    <div><h3 style="font-size:13px;margin:0 0 8px">Particularidades</h3><div class="note" style="line-height:1.6">• Aprova pagamentos à noite; mandar o lote até 17h.<br>• Aluguel tem reajuste pelo IGP-M em março.<br>• Fornecedor de gás aceita só Pix.</div></div>
    <div class="rule">${ic('lock')}<span>Cofre de acessos: 4 credenciais · último acesso por ${an.nome.split(' ')[0]} ontem</span></div>`,
    `<button class="btn" type="button" onclick="closeDrawer();go('relatorios',{relCli:'${id}'})">${ic('bars')}Relatórios</button><button class="btn pri" type="button" onclick="closeDrawer();go('fluxo',{fluxoCli:'${id}'})">${ic('trend')}Fluxo de caixa</button>`);
}
VIEWS.clientes = {
  t:'Clientes', sub:'Carteira do escritório · 12 empresas atendidas',
  render(){
    const f = state.cliF; const list = CLIENTES.filter(c=>f==='todos'||c.saude===f);
    const n = k => CLIENTES.filter(c=>c.saude===k).length;
    return `<div class="toolbar"><div class="seg" role="group" aria-label="Saúde">${[['todos','Todos',CLIENTES.length],['bad','Crítico',n('bad')],['warn','Atenção',n('warn')],['ok','Em dia',n('ok')]].map(([k,l,q])=>`<button type="button" data-cf="${k}" aria-pressed="${f===k}">${l}<span class="c">${q}</span></button>`).join('')}</div>
      <button class="btn pri" type="button" id="cli-new">${ic('plus')}Novo cliente</button></div>
    <section class="card"><div class="tw"><table><thead><tr><th>Cliente</th><th>Saúde</th><th>Analista</th><th class="r">Saldo</th><th>Conciliação</th><th>Pendências</th><th>SLA do mês</th><th class="r">Honorário</th><th>Fechamento set</th></tr></thead><tbody>
      ${list.map(c=>{ const fc = FECH_COLS.find(x=>x.k===FECH[c.id]); return `<tr data-cli="${c.id}" style="cursor:pointer"><td><div class="cell-c">${av(c)}<div><b>${esc(c.nome)}</b><small>${esc(c.seg)}</small></div></div></td>
        <td><span class="row" style="gap:7px;font-weight:700;font-size:12px"><span class="light ${c.saude}"></span>${{ok:'Em dia',warn:'Atenção',bad:'Crítico'}[c.saude]}</span></td>
        <td><span class="row" style="gap:6px"><span class="av sm round" style="--c:${ANALISTAS[c.an].cor}">${c.an}</span>${ANALISTAS[c.an].nome.split(' ')[0]}</span></td>
        <td class="r num" style="font-weight:800;${c.saldo<0?'color:var(--red)':''}">${brl(c.saldo,0)}</td>
        <td>${c.conc?`<span class="chip ${c.conc>=3?'bad':'warn'}">até D−${c.conc}</span>`:'<span class="chip ok">em dia</span>'}</td>
        <td>${c.pend+c.aprov+c.docs?`<span class="chip mute">${c.pend+c.aprov+c.docs} itens</span>`:'<span class="sub">—</span>'}</td>
        <td><div class="row" style="gap:8px;flex-wrap:nowrap"><div class="prog" style="width:70px"><i style="width:${c.sla}%;--c:${c.sla>=95?'var(--green)':c.sla>=85?'var(--amber)':'var(--red)'}"></i></div><b class="num" style="font-size:12px">${c.sla}%</b></div></td>
        <td class="r num">${brl(c.honor,0)}</td>
        <td><span class="row" style="gap:6px;font-size:12px;font-weight:700"><span class="light" style="background:${fc.c}"></span>${fc.n}</span></td></tr>`; }).join('')}
    </tbody></table></div></section>
    <section class="card"><div class="ch"><div><h3>Onboarding em andamento</h3><div class="sub">Novos clientes entrando na operação</div></div></div>
      <div class="grid g2">${[['Mercearia Dois Irmãos','#0F766E','MI',4,7,'Aguardando conexão Open Finance do Bradesco'],['Clínica Pet Saúde','#B45309','CP',2,7,'Aguardando lista de fornecedores']].map(([n,cor,ini,a,t,s])=>`<div class="row" style="padding:12px;border:1px solid var(--line);border-radius:12px;flex-wrap:nowrap"><span class="av" style="--c:${cor}">${ini}</span><div style="flex:1;min-width:0"><b style="font-size:13px">${n}</b><div class="sub">${s}</div><div class="row" style="margin-top:8px;flex-wrap:nowrap"><div class="prog" style="flex:1"><i style="width:${a/t*100}%;--c:var(--blue)"></i></div><span class="num" style="font-size:11.5px;font-weight:800">${a}/${t}</span></div></div></div>`).join('')}</div></section>`;
  },
  bind(v){
    $$('[data-cf]', v).forEach(b=>b.onclick=()=>{ state.cliF=b.dataset.cf; render(); });
    $$('tr[data-cli]', v).forEach(r=>r.onclick=()=>fichaCliente(r.dataset.cli));
    $('#cli-new', v).onclick = () => toast('Abriria o assistente: CNPJ → aprovadores → contas → rotinas e SLA');
  }
};

/* ================= Rentabilidade ================= */
VIEWS.rentabilidade = {
  t:'Rentabilidade', sub:'Quanto cada cliente rende para o escritório',
  render(){
    const rec = CLIENTES.reduce((a,c)=>a+c.honor,0), custo = CLIENTES.reduce((a,c)=>a+c.horas*CUSTO_HORA,0), hs = CLIENTES.reduce((a,c)=>a+c.horas,0);
    const neg = CLIENTES.filter(c=>c.margem<0), baixa = CLIENTES.filter(c=>c.margem>=0 && c.margem<40);
    const statusCor = c => c.margem<0?'var(--red)':c.margem<40?'var(--amber)':'var(--green)';
    const pts = CLIENTES.map(c=>({x:c.horas, y:c.honor, cor:statusCor(c), lab:c.margem<25?c.curto:'', tip:`<b>${esc(c.nome)}</b>${tipRow(statusCor(c),'Margem',pct(c.margem,0))}${tipRow('var(--blue)','Honorário',brl(c.honor,0))}${tipRow('var(--ink-2)','Horas/mês',c.horas+'h')}${tipRow('var(--ink-2)','Custo',brl(c.horas*CUSTO_HORA,0))}`}));
    const sorted = [...CLIENTES].sort((a,b)=>a.margem-b.margem);
    return `<div class="grid g4">
      ${kpi({t:'Receita mensal da carteira', v:brl(rec,0), c:'#fff', hero:true, icn:'wallet', sp:[19.8,20.4,21.2,22.1,23.0,rec/1000], foot:`<span>12 contratos</span><span>+16% em 6 meses</span>`})}
      ${kpi({t:'Custo estimado da equipe', v:brl(custo,0), c:'var(--red)', icn:'users', foot:`<span><b>${hs}h</b> no mês</span><span>custo-hora ${brl(CUSTO_HORA,0)}</span>`})}
      ${kpi({t:'Margem média', v:pct((rec-custo)/rec*100,1), c:'var(--green)', icn:'gauge', foot:`<span>meta do escritório: 40%</span>`})}
      ${kpi({t:'Clientes abaixo da meta', v:`${neg.length+baixa.length} <span style="font-size:13px;color:var(--muted);font-weight:700">de 12</span>`, c:'var(--amber)', icn:'alert', foot:`<span><b>${neg.length}</b> com prejuízo</span><span><b>${baixa.length}</b> abaixo de 40%</span>`})}
    </div>
    <div class="grid g-7-5">
      <section class="card"><div class="ch"><div><h3>Esforço x honorário</h3><div class="sub">Cada ponto é um cliente · abaixo da linha vermelha há prejuízo</div></div><div class="legend"><span><i style="--c:var(--green)"></i>Margem ≥ 40%</span><span><i style="--c:var(--amber)"></i>0 a 40%</span><span><i style="--c:var(--red)"></i>Prejuízo</span><span><i class="dash" style="--c:var(--red)"></i>Empate</span><span><i class="dash" style="--c:var(--green)"></i>Meta 40%</span></div></div>${scatter(pts)}</section>
      <section class="card"><div class="ch"><div><h3>Sugestões de reajuste</h3><div class="sub">Volume atual comparado ao contratado</div></div></div>
        <div class="list">${sorted.slice(0,4).map(c=>{ const nov = Math.ceil(c.horas*CUSTO_HORA/0.6/50)*50; return `<div class="li" style="grid-template-columns:auto minmax(0,1fr) auto">${av(c)}<div class="li-m"><b><span>${esc(c.nome)}</span></b><small><span>${c.mov} lançamentos/mês (+${Math.round(c.mov/4.2)}% desde a contratação)</span></small><small><span>Honorário ${brl(c.honor,0)} → sugerido <b style="color:var(--ink)">${brl(nov,0)}</b></span></small></div><span class="chip ${c.margem<0?'bad':'warn'}">${pct(c.margem,0)}</span></div>`; }).join('')}</div></section>
    </div>
    <div class="grid g-7-5">
      <section class="card"><div class="ch"><div><h3>Ranking por margem</h3><div class="sub">Horas registradas nas tarefas e no tempo de tela</div></div></div><div class="tw"><table><thead><tr><th>Cliente</th><th class="r">Honorário</th><th class="r">Horas</th><th class="r">Custo</th><th>Margem</th></tr></thead><tbody>
        ${[...CLIENTES].sort((a,b)=>b.margem-a.margem).map(c=>`<tr><td><div class="cell-c">${av(c,'sm')}<b>${esc(c.curto)}</b></div></td><td class="r num">${brl(c.honor,0)}</td><td class="r num">${c.horas}h</td><td class="r num">${brl(c.horas*CUSTO_HORA,0)}</td><td><div class="row" style="gap:8px;flex-wrap:nowrap"><div class="prog" style="width:90px"><i style="width:${Math.max(3,Math.min(100,c.margem))}%;--c:${statusCor(c)}"></i></div><b class="num" style="font-size:12px;${c.margem<0?'color:var(--red)':''}">${pct(c.margem,0)}</b></div></td></tr>`).join('')}
      </tbody></table></div></section>
      <section class="card"><div class="ch"><div><h3>Demandas fora do escopo</h3><div class="sub">Registradas este mês · cobráveis à parte</div></div></div>
        <div class="list">${[['rs','Reconciliar caixa de 2024 para o contador','6h',510],['ca','Planilha de custos por obra','4h',340],['db','Atender auditoria do banco','3h',255],['ps','Cadastro de 40 produtos no PDV','2h',170]].map(([id,t,h,v])=>`<div class="li" style="grid-template-columns:auto minmax(0,1fr) auto"><span class="q-ic" style="--c:var(--violet)">${ic('timer')}</span><div class="li-m"><b><span>${t}</span></b><small>${cliTag(C[id])}<span>${h}</span></small></div><div style="text-align:right"><div class="li-v num">${brl(v,0)}</div><button class="lnk" type="button" data-bill="${id}">Incluir na fatura</button></div></div>`).join('')}</div></section>
    </div>`;
  },
  bind(v){ $$('[data-bill]', v).forEach(b=>b.onclick=()=>{ b.textContent='Incluído'; b.disabled=true; toast(`Extra incluído na próxima fatura de ${C[b.dataset.bill].curto}`); }); }
};

/* ================= App do cliente ================= */
let PH_SEL = new Set([1,2,3,4,5]);
VIEWS.portal = {
  t:'App do cliente', sub:'O que o dono da empresa vê no celular: aprovar, enviar documentos e acompanhar o caixa',
  render(){
    const its = [[1,'Frigorífico Serrano','vence hoje',11240.60],[2,'Hortifruti Vale Verde','vence hoje',2310.30],[3,'Ambev Distribuidora','amanhã',6830.00],[4,'Gás Ultragaz','sáb, 17/10',1290.00],[5,'Folha · adiantamento','ter, 20/10',14800.00]];
    const tot = its.filter(i=>PH_SEL.has(i[0])).reduce((a,i)=>a+i[3],0);
    const chk = ic('check',3);
    return `<div class="phones">
      <div><div class="phone"><div class="screen"><div class="notch"></div>
        <div class="ph-top"><small>Olá, Marcos · Sabor da Serra</small><b>R$ 8.740,00</b><p>Saldo de hoje nas 3 contas. Seu caixa fica abaixo do mínimo na terça (20/10). Veja a sugestão do André abaixo.</p></div>
        <div class="ph-b">
          <div class="ph-act"><button type="button" class="dark" data-ph="ap">${ic('check')}Aprovar pagamentos<span>5 aguardando</span></button><button type="button" data-ph="doc">${ic('camera')}Enviar documento<span>foto ou PDF</span></button></div>
          <div class="ph-pend">${ic('file')}<span>Seu consultor precisa do extrato da maquininha Stone de setembro</span></div>
          <div class="ph-card"><h4>Esta semana</h4>
            <div class="ph-row"><div><b>Entra</b><small>vendas e iFood</small></div><span class="v" style="color:#16A34A">+ R$ 31.400</span></div>
            <div class="ph-row"><div><b>Sai</b><small>fornecedores e folha</small></div><span class="v">− R$ 36.470</span></div></div>
          <div class="ph-card"><h4>Recado do André</h4><p style="margin:0;font-size:11.5px;line-height:1.5;color:#4A4856">Sugiro pagar o Gás Ultragaz no dia 20 em vez de 17. Assim o caixa não fica abaixo do mínimo.</p></div>
          <div class="ph-card"><h4>Setembro em resumo</h4><div class="ph-row"><div><b>Resultado</b><small>margem de 9,8%</small></div><span class="v" style="color:#16A34A">R$ 14.210</span></div><button class="ph-cta alt" type="button" data-ph="rel">Ver relatório completo</button></div>
        </div></div></div><div class="ph-cap">Início</div></div>

      <div><div class="phone"><div class="screen"><div class="notch"></div>
        <div class="ph-top" style="padding-bottom:14px"><small>Lote de quinta · enviado por André</small><b class="num">R$ ${tot.toLocaleString('pt-BR',{minimumFractionDigits:2})}</b><p>${PH_SEL.size} de 5 selecionados · toque para desmarcar</p></div>
        <div class="ph-b">
          <div class="ph-card">${its.map(([id,n,d,v])=>`<div class="ph-row"><button type="button" class="ph-chk${PH_SEL.has(id)?' on':''}" data-phc="${id}" aria-label="Selecionar ${n}">${PH_SEL.has(id)?chk:''}</button><div><b>${n}</b><small>${d} · boleto</small></div><span class="v num">R$ ${v.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>`).join('')}</div>
          <div class="ph-pend" style="background:#EDE9FE;color:#5B21B6">${ic('shield')}<span>A folha passa de R$ 10 mil e também precisa da aprovação da Luciana.</span></div>
        </div><div class="ph-foot"><button class="ph-cta" type="button" data-ph="ok"${PH_SEL.size?'':' disabled'}>Aprovar ${PH_SEL.size} pagamento${PH_SEL.size===1?'':'s'}</button>
          <button class="ph-cta alt" type="button" data-ph="adiar">Pedir para adiar ou conversar</button></div></div></div><div class="ph-cap">Aprovação em 1 toque</div></div>

      <section class="card" style="max-width:380px;align-self:center;display:flex;flex-direction:column;gap:14px"><div><h3>Por que o cliente usa</h3><div class="sub">Feito para quem não é do financeiro</div></div>
        <div class="feat"><span class="ico" style="--c:var(--green)">${ic('zap')}</span><div><b>Entrada sem senha</b><p>Link mágico pelo WhatsApp. Abre direto na tela de aprovação.</p></div></div>
        <div class="feat"><span class="ico" style="--c:var(--blue)">${ic('camera')}</span><div><b>Foto do boleto basta</b><p>A leitura automática preenche tudo. O documento cai na sua caixa já organizado.</p></div></div>
        <div class="feat"><span class="ico" style="--c:var(--violet)">${ic('msg')}</span><div><b>Conversa com contexto</b><p>Cada pergunta fica presa ao lançamento ou documento, e não se perde no WhatsApp.</p></div></div>
        <div class="feat"><span class="ico" style="--c:var(--amber)">${ic('eye')}</span><div><b>Linguagem simples</b><p>“Entra” e “sai” em vez de DRE. O relatório completo está a um toque.</p></div></div>
        <div class="feat"><span class="ico" style="--c:var(--ink-2)">${ic('edit')}</span><div><b>Com a sua marca</b><p>Logo e cores do seu escritório em todo o app.</p></div></div>
      </section></div>`;
  },
  bind(v){
    $$('[data-phc]', v).forEach(b=>b.onclick=()=>{ const id=+b.dataset.phc; PH_SEL.has(id)?PH_SEL.delete(id):PH_SEL.add(id); render(); });
    $$('[data-ph]', v).forEach(b=>b.onclick=()=>{ const k=b.dataset.ph; if (k==='ap') return toast('Abre a tela de aprovação (ao lado)'); if (k==='ok'){ const n=PH_SEL.size; toast(`${n} pagamentos aprovados · o consultor foi avisado`, ()=>{}); return; } toast({doc:'Abre a câmera do celular', rel:'Abre o relatório de setembro', adiar:'Abre uma conversa com o consultor sobre este lote'}[k]); });
  }
};

/* ================= Navegação ================= */
const NAV = [
  ['OPERAÇÃO', [['torre','Torre de Controle','radar'],['documentos','Documentos','inbox', ()=>DOCS.filter(d=>d.st!=='lancado').length],['pagar','Contas a Pagar','up', ()=>PAGAR.filter(p=>p.d<=0 && !['pago','agendado'].includes(p.st)).length, true],['receber','Contas a Receber','down'],['conciliacao','Conciliação','link', ()=>47]]],
  ['CLIENTES', [['fluxo','Fluxo de Caixa','trend'],['fechamentos','Fechamentos','checks', ()=>CLIENTES.filter(c=>FECH[c.id]!=='ok').length],['relatorios','Relatórios','bars'],['clientes','Carteira','users']]],
  ['ESCRITÓRIO', [['rentabilidade','Rentabilidade','gauge'],['portal','App do Cliente','phone']]]
];
function drawNav(){
  $('#nav').innerHTML = NAV.map(([g, its]) => `<div class="nav-g"><div class="nav-l">${g}</div>${its.map(([k,n,i,b,hot]) => { const c = b?b():0; return `<a href="#${k}" data-nav="${k}" class="${state.view===k?'on':''}">${ic(i)}<span>${n}</span>${c?`<span class="bdg${hot?' hot':''}">${c}</span>`:''}</a>`; }).join('')}</div>`).join('');
}
function render(){
  const V = VIEWS[state.view]; const sc = $('#content').scrollTop;
  $('#h-title').textContent = V.t; $('#h-sub').textContent = V.sub;
  const view = $('#view'); view.innerHTML = V.render();
  bindTips(view); $$('[data-go]', view).forEach(b=>b.onclick=()=>{ const o={}; if (b.dataset.cli) o.fluxoCli=b.dataset.cli; if (b.dataset.doc) o.doc=+b.dataset.doc; go(b.dataset.go, o); });
  V.bind && V.bind(view); drawNav();
  if (render._same) $('#content').scrollTop = sc;
}
function go(k, opts={}){
  Object.assign(state, opts); const same = state.view===k; state.view = k; render._same = same; render(); render._same = true;
  if (!same) $('#content').scrollTop = 0;
  try { history.replaceState(null,'','#'+k); } catch(e){}
  try { localStorage.setItem('torre-view', k); } catch(e){}
  $('#side').classList.remove('on'); $('#side-scrim').classList.remove('on');
}
window.go = go; window.closeDrawer = closeDrawer;

/* Busca rápida (Ctrl+K) */
function palItems(q){
  q = q.trim().toLowerCase(); const all = [];
  NAV.forEach(([,its])=>its.forEach(([k,n,i])=>all.push({g:'Telas', n, i, run:()=>go(k)})));
  CLIENTES.forEach(c=>all.push({g:'Clientes', n:c.nome, av:c, sm:c.seg, run:()=>fichaCliente(c.id)}));
  PAGAR.forEach(p=>all.push({g:'Contas a pagar', n:p.forn+' · '+brl(p.v), i:'up', sm:C[p.cli].curto, run:()=>go('pagar',{pagCli:p.cli, pagF:'todos'})}));
  return all.filter(x => !q || (x.n+' '+(x.sm||'')).toLowerCase().includes(q)).slice(0, q?14:10);
}
let palIdx = 0;
function drawPal(){
  const its = palItems($('#pal-in').value); let g = '';
  $('#pal-l').innerHTML = its.length ? its.map((x,i)=>{ const head = x.g!==g ? `<div class="pal-g">${(g=x.g).toUpperCase()}</div>` : ''; return head + `<button type="button" class="pal-i${i===palIdx?' on':''}" data-pi="${i}">${x.av?av(x.av,'sm'):`<span class="src" style="width:24px;height:24px">${ic(x.i)}</span>`}<span>${esc(x.n)}</span>${x.sm?`<small>${esc(x.sm)}</small>`:''}</button>`; }).join('') : `<div class="empty">Nada encontrado</div>`;
  $$('[data-pi]', $('#pal-l')).forEach(b=>b.onclick=()=>{ closePal(); its[+b.dataset.pi].run(); });
  drawPal.its = its;
}
function openPal(){ $('#palette').classList.add('on'); $('#scrim').classList.add('on'); $('#pal-in').value=''; palIdx=0; drawPal(); setTimeout(()=>$('#pal-in').focus(), 30); }
function closePal(){ $('#palette').classList.remove('on'); if (!$('#drawer').classList.contains('on')) $('#scrim').classList.remove('on'); }

/* Init */
$('#burger').innerHTML = ic('menu'); $('#search-ic').innerHTML = ic('search');
$('#notif-btn').insertAdjacentHTML('afterbegin', ic('bell')); $('#help-btn').innerHTML = ic('help'); $('#dr-close').innerHTML = ic('x');
function themeIcon(){ const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches; $('#theme-btn').innerHTML = ic(dark?'sun':'moon'); }
themeIcon();
$('#theme-btn').onclick = () => { const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.dataset.theme = dark?'light':'dark'; themeIcon(); };
$('#burger').onclick = () => { $('#side').classList.add('on'); $('#side-scrim').classList.add('on'); };
$('#side-scrim').onclick = () => { $('#side').classList.remove('on'); $('#side-scrim').classList.remove('on'); };
$('#scrim').onclick = () => { closeDrawer(); closePal(); };
$('#dr-close').onclick = closeDrawer;
$('#search-btn').onclick = openPal;
$('#help-btn').onclick = () => toast('Atalhos: Ctrl+K busca · Esc fecha painéis');
$('#office-btn').onclick = () => toast('Trocaria de escritório (para redes de BPO com várias unidades)');
$('#cfg-btn').onclick = () => toast('Configurações: equipe, rotinas, SLA, modelos e integrações');
$('#notif-btn').onclick = () => openDrawer('Notificações', `<div class="list">${[
  ['var(--green)','check','Dra. Helena aprovou o lote da Clínica Vida','08:12','cv'],
  ['var(--amber)','file','Marcos enviou 1 boleto pelo app','há 12 min','rs'],
  ['var(--red)','alert','Saldo negativo projetado na Alicerce','07:02','ca'],
  ['var(--blue)','link','Open Finance: 214 transações importadas','07:02','ps'],
  ['var(--violet)','msg','Sr. Otávio respondeu sobre a remessa','ontem','db']
].map(([c,i,t,q,cli])=>`<div class="li" style="grid-template-columns:auto minmax(0,1fr)"><span class="q-ic" style="--c:${c}">${ic(i)}</span><div class="li-m"><b><span>${t}</span></b><small>${cliTag(C[cli])}<span>${q}</span></small></div></div>`).join('')}</div><div class="note">Resumo diário por e-mail às 8h · ajustável em Configurações</div>`);
$('#nav').addEventListener('click', e => { const a = e.target.closest('[data-nav]'); if (!a) return; e.preventDefault(); go(a.dataset.nav); });
document.addEventListener('keydown', e => {
  if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openPal(); }
  if (e.key==='Escape'){ closeDrawer(); closePal(); }
  if ($('#palette').classList.contains('on')){
    const its = drawPal.its||[];
    if (e.key==='ArrowDown'){ e.preventDefault(); palIdx=Math.min(its.length-1,palIdx+1); drawPal(); }
    if (e.key==='ArrowUp'){ e.preventDefault(); palIdx=Math.max(0,palIdx-1); drawPal(); }
    if (e.key==='Enter' && its[palIdx]){ e.preventDefault(); closePal(); its[palIdx].run(); }
  }
});
$('#pal-in').addEventListener('input', () => { palIdx=0; drawPal(); });
let start = (location.hash||'').slice(1);
if (!VIEWS[start]) { try { start = localStorage.getItem('torre-view'); } catch(e){ start = null; } }
state.view = VIEWS[start] ? start : 'torre';
render(); render._same = true;
</script>
