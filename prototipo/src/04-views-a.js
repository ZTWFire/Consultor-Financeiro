<script>
const VIEWS = {};
const state = { carteira:'todos', filaF:'todos', pagF:'abertos', pagCli:'todos', sel:new Set(), doc:1, concCli:'ps', concAcc:0, fluxoCli:'ca', sims:new Set(), relCli:'ps', cliF:'todos' };
const cliOptions = (sel, todos=true) => (todos?`<option value="todos"${sel==='todos'?' selected':''}>Todos os clientes</option>`:'') + CLIENTES.map(c=>`<option value="${c.id}"${sel===c.id?' selected':''}>${esc(c.nome)}</option>`).join('');
const kpi = ({t, v, c, icn, foot, hero, sp}) => `<div class="card kpi${hero?' hero':''}" style="--c:${c}"><div class="kpi-h"><span>${t}</span><span class="ico">${ic(icn)}</span></div><div class="kpi-v num">${v}</div>${sp?spark(sp, hero?'#FFFFFF':c):''}<div class="kpi-f">${foot}</div></div>`;
const dueChip = d => d<0?`<span class="chip bad">${ic('alert')}Venceu ${rel(d)}</span>`:d===0?`<span class="chip warn">${ic('clock')}Vence hoje</span>`:d<=2?`<span class="chip warn">Vence ${rel(d)}</span>`:`<span class="chip mute">${dmy(addD(TODAY,d))}</span>`;

/* ================= Torre de Controle ================= */
VIEWS.torre = {
  t:'Torre de Controle', sub:'Quinta-feira, 15 de outubro · tudo o que precisa de você hoje, em todos os clientes',
  render(){
    const mine = c => state.carteira==='todos' || C[c].an==='AC';
    const pagHoje = PAGAR.filter(p=>p.d===0 && mine(p.cli));
    const totHoje = pagHoje.reduce((a,p)=>a+p.v,0), aprovHoje = pagHoje.filter(p=>['aprovado','agendado'].includes(p.st)).reduce((a,p)=>a+p.v,0);
    const aguard = PAGAR.filter(p=>['aguardando','parcial','enviado'].includes(p.st) && mine(p.cli));
    const docsN = DOCS.filter(d=>d.st!=='lancado' && mine(d.cli));
    const concP = CLIENTES.filter(c=>mine(c.id)).reduce((a,c)=>a + c.conc*9 + (c.conc?2:0),0);
    const emDia = CLIENTES.filter(c=>mine(c.id) && c.conc<=1).length, nCli = CLIENTES.filter(c=>mine(c.id)).length;
    const fila = FILA.filter(f => mine(f.cli) && (state.filaF==='todos' || f.t===state.filaF));
    const cont = k => FILA.filter(f=>mine(f.cli) && (k==='todos'||f.t===k) && !f.done).length;
    const venc = [...Array(10)].map((_,i)=>i).map(i=>{ const d = addD(TODAY,i); return d; }).filter(d=>d.getDay()%6!==0);
    seed = 11;
    const rows = venc.slice(0,8).map((d,i)=>{ const off = Math.round((d-TODAY)/864e5); const its = PAGAR.filter(p=>p.d===off && mine(p.cli)); let ap = its.filter(p=>['aprovado','agendado','pago'].includes(p.st)).reduce((a,p)=>a+p.v,0), ag = its.filter(p=>!['aprovado','agendado','pago'].includes(p.st)).reduce((a,p)=>a+p.v,0); if (off>6){ ap = 6000+rnd()*18000; ag = 3000+rnd()*9000; } return {lab:off===0?'Hoje':WD[d.getDay()], sub:dmy(d), full:`${WD[d.getDay()]}, ${dmy(d)}`, hl:off===0, vals:{ap, ag}}; });
    const fechCount = k => CLIENTES.filter(c=>mine(c.id) && FECH[c.id]===k).length;
    const lst = fila.length ? fila.map(f => { const c = C[f.cli], T = FILA_TIPO[f.t]; return `<div class="li${f.done?' done':''}" data-id="${f.id}"><span class="q-ic" style="--c:${T.c}">${ic(T.ic)}</span><div class="li-m"><b><span>${esc(f.tit)}</span></b><small>${cliTag(c)}<span>${esc(f.det)}</span></small></div><div style="text-align:right">${f.v?`<div class="li-v num">${brl(f.v)}</div>`:''}<div style="margin-top:3px">${f.prazo<0?`<span class="chip bad">${rel(f.prazo)}</span>`:f.prazo===0?`<span class="chip warn">hoje</span>`:`<span class="chip mute">${rel(f.prazo)}</span>`}</div></div><div class="li-a"><button class="btn sm${f.t==='pagar'?' pri':''}" type="button" data-act="${f.id}">${f.acao}</button><button class="mini-ib" type="button" title="Marcar como feito" data-done="${f.id}">${ic('check')}</button></div></div>`; }).join('') : `<div class="empty">${ic('check')}Nada pendente neste filtro.</div>`;
    const health = CLIENTES.filter(c=>mine(c.id)).sort((a,b)=>({bad:0,warn:1,ok:2}[a.saude]-({bad:0,warn:1,ok:2}[b.saude]))).map(c=>`<button class="hc" type="button" data-cli="${c.id}"><div class="hc-t">${av(c)}<div><b>${esc(c.nome)}</b><small>${ANALISTAS[c.an].nome.split(' ')[0]} · ${c.seg.split(' ·')[0]}</small></div><span class="light ${c.saude}" title="${{ok:'Em dia',warn:'Atenção',bad:'Crítico'}[c.saude]}"></span></div><div class="hc-m"><div>Saldo<b class="num ${c.saldo<0?'bad':c.saldo<c.minimo?'warn':''}">${brlK(c.saldo)}</b></div><div>Conciliação<b class="${c.conc>=3?'bad':c.conc>=1?'warn':''}">${c.conc?'D−'+c.conc:'Em dia'}</b></div><div>Pendências<b class="${c.pend+c.aprov>=5?'bad':c.pend+c.aprov>=2?'warn':''}">${c.pend+c.aprov+c.docs}</b></div></div></button>`).join('');
    return `
    <div class="toolbar"><div class="seg" role="group" aria-label="Carteira"><button type="button" data-cart="todos" aria-pressed="${state.carteira==='todos'}">Toda a equipe</button><button type="button" data-cart="AC" aria-pressed="${state.carteira==='AC'}">Minha carteira</button></div>
      <div class="row"><button class="btn" type="button" data-go="documentos">${ic('inbox')}Caixa de documentos</button><button class="btn g" type="button" data-go="pagar">${ic('send')}Montar lotes de pagamento</button></div></div>
    <div class="grid g4">
      ${kpi({t:'A pagar hoje · carteira', v:brl(totHoje), c:'#fff', icn:'wallet', hero:true, sp:[42,38,51,47,60,44,58,62,49,71,66,totHoje/1000], foot:`<span>Aprovado <b class="num">${brlK(aprovHoje)}</b></span><span>Sem aprovação <b class="num">${brlK(totHoje-aprovHoje)}</b></span>`})}
      ${kpi({t:'Aguardando aprovação do cliente', v:brl(aguard.reduce((a,p)=>a+p.v,0)), c:'var(--violet)', icn:'clock', sp:[8,9,7,11,10,12,9,13,aguard.length], foot:`<span><b>${aguard.length} títulos</b> em ${new Set(aguard.map(p=>p.cli)).size} clientes</span><span>mais antigo: 2 dias</span>`})}
      ${kpi({t:'Caixa de documentos', v:`${docsN.length} <span style="font-size:13px;color:var(--muted);font-weight:700">novos</span>`, c:'var(--amber)', icn:'inbox', sp:[14,9,12,7,10,6,8,11,docsN.length], foot:`<span><b>${docsN.filter(d=>d.conf>=90).length}</b> lidos com alta confiança</span><span><b>1</b> duplicidade</span>`})}
      ${kpi({t:'Conciliação pendente', v:`${concP} <span style="font-size:13px;color:var(--muted);font-weight:700">transações</span>`, c:'var(--blue)', icn:'link', sp:[80,72,66,70,58,61,52,49,concP], foot:`<span>Em dia (D−1): <b>${emDia} de ${nCli}</b></span><span>74% automático</span>`})}
    </div>
    <div class="ins">
      <div class="ins-c" style="--c:var(--red)"><div class="ins-h"><span class="ico">${ic('alert')}</span><span class="ins-t">Caixa negativo projetado</span><b class="num">${brlK(-41200)}</b></div><div class="ins-r"><span>Alicerce · em 6 dias (21/10)</span><b>Folha + INSS</b></div><div class="ins-r"><span>Sugestão: antecipar medição</span><button class="lnk" type="button" data-go="fluxo" data-cli="ca">Ver fluxo</button></div></div>
      <div class="ins-c" style="--c:var(--amber)"><div class="ins-h"><span class="ico">${ic('file')}</span><span class="ins-t">Possível boleto duplicado</span><b class="num">${brlK(8420)}</b></div><div class="ins-r"><span>Padaria Sol · Moinho Paulista</span><b>DDA + app</b></div><div class="ins-r"><span>Mesmo código de barras</span><button class="lnk" type="button" data-go="documentos" data-doc="2">Revisar</button></div></div>
      <div class="ins-c" style="--c:var(--violet)"><div class="ins-h"><span class="ico">${ic('timer')}</span><span class="ins-t">SLA em risco este mês</span><b class="num">78%</b></div><div class="ins-r"><span>Sabor da Serra · meta 95%</span><b>4 atrasos</b></div><div class="ins-r"><span>Causa: documentos fora do prazo</span><button class="lnk" type="button" data-go="clientes">Ver clientes</button></div></div>
      <div class="ins-c" style="--c:var(--blue)"><div class="ins-h"><span class="ico">${ic('alert')}</span><span class="ins-t">Valor fora do padrão</span><b class="num">+38%</b></div><div class="ins-r"><span>Bom Grão · Transportadora Rápida Sul</span><b>${brlK(9870)}</b></div><div class="ins-r"><span>Média dos últimos 6 meses: R$ 7,1 mil</span><button class="lnk" type="button" data-go="pagar">Conferir</button></div></div>
    </div>
    <div class="grid g-7-5">
      <section class="card"><div class="ch"><div><h3>Fila do dia</h3><div class="sub">Ordenada por urgência: prazo, valor e SLA do cliente</div></div>
        <div class="seg" role="group" aria-label="Filtrar fila">${[['todos','Tudo'],['pagar','Pagar'],['aprov','Aprovação'],['doc','Documentos'],['conc','Conciliação'],['rotina','Rotinas']].map(([k,n])=>`<button type="button" data-fila="${k}" aria-pressed="${state.filaF===k}">${n}<span class="c">${cont(k)}</span></button>`).join('')}</div></div>
        <div class="list">${lst}</div></section>
      <div style="display:flex;flex-direction:column;gap:12px;min-width:0">
        <section class="card"><div class="ch"><div><h3>Vencimentos dos próximos dias</h3><div class="sub">Contas a pagar somadas de todos os clientes</div></div><div class="legend"><span><i style="--c:var(--blue)"></i>Aprovado</span><span><i style="--c:var(--violet)"></i>Sem aprovação</span></div></div>
          ${stackedBars(rows, [{k:'ap', nome:'Aprovado', cor:'var(--blue)'},{k:'ag', nome:'Sem aprovação', cor:'var(--violet)'}], {W:460, h:220})}</section>
        <section class="card"><div class="ch"><div><h3>Fechamento de setembro</h3><div class="sub">Prazo interno: dia 10 útil · faltam 5 dias</div></div><button class="lnk" type="button" data-go="fechamentos">Abrir quadro</button></div>
          <div class="stack" style="margin-bottom:12px">${FECH_COLS.map(col=>`<i style="--c:${col.c};flex:${fechCount(col.k)}" data-tip="${esc(`<b>${col.n}</b>${tipRow(col.c,'Clientes',fechCount(col.k))}`)}"></i>`).join('')}</div>
          <div class="close-mini">${FECH_COLS.map(col=>`<div class="close-row"><span class="row" style="gap:7px"><span class="light" style="background:${col.c}"></span>${col.n}</span><div class="prog"><i style="width:${fechCount(col.k)/nCli*100}%;--c:${col.c}"></i></div><b class="num" style="text-align:right">${fechCount(col.k)}</b></div>`).join('')}</div></section>
        <section class="card"><div class="ch"><div><h3>Equipe hoje</h3><div class="sub">Tarefas do dia concluídas e SLA do mês</div></div></div>
          <div class="team">${[['AC',9,12,98],['JL',11,19,89],['RS',7,15,90]].map(([k,f,t,sla])=>`<div class="tm"><span class="av round" style="--c:${ANALISTAS[k].cor}">${k}</span><div><div class="row" style="justify-content:space-between"><b>${ANALISTAS[k].nome}</b><span class="num" style="font-size:12px;font-weight:800">${f}/${t}</span></div><div class="prog" style="margin-top:6px"><i style="width:${f/t*100}%;--c:var(--blue)"></i></div><small>${CLIENTES.filter(c=>c.an===k).length} clientes · ${t-f} tarefas restantes</small></div><span class="chip ${sla>=95?'ok':'warn'}">SLA ${sla}%</span></div>`).join('')}</div></section>
      </div>
    </div>
    <section class="card"><div class="ch"><div><h3>Saúde da carteira</h3><div class="sub">Semáforo calculado por conciliação, saldo vs. mínimo, SLA e pendências</div></div><div class="legend"><span><i class="light ok" style="box-shadow:none"></i>Em dia</span><span><i class="light warn" style="box-shadow:none"></i>Atenção</span><span><i class="light bad" style="box-shadow:none"></i>Crítico</span></div></div><div class="health">${health}</div></section>`;
  },
  bind(v){
    $$('[data-cart]', v).forEach(b=>b.onclick=()=>{ state.carteira=b.dataset.cart; render(); });
    $$('[data-fila]', v).forEach(b=>b.onclick=()=>{ state.filaF=b.dataset.fila; render(); });
    $$('[data-done]', v).forEach(b=>b.onclick=()=>{ const f = FILA.find(x=>x.id==b.dataset.done); f.done=!f.done; render(); if (f.done) toast('Tarefa concluída · registrada no histórico do cliente', ()=>{ f.done=false; render(); }); });
    $$('[data-act]', v).forEach(b=>b.onclick=()=>{ const f = FILA.find(x=>x.id==b.dataset.act);
      if (f.t==='conc') return go('conciliacao', {concCli:f.cli});
      if (f.t==='alerta') return go('fluxo', {fluxoCli:f.cli});
      if (f.t==='rotina' && f.cli==='ap') return go('relatorios', {relCli:'ap'});
      f.done = true; render();
      toast({pagar:'Lote marcado como pago · comprovantes serão vinculados na conciliação', aprov:`Lembrete enviado para ${C[f.cli].curto} por WhatsApp e e-mail`, doc:`Pedido reenviado ao cliente com link para envio`, rotina:'Rotina aberta'}[f.t]||'Feito', ()=>{ f.done=false; render(); }); });
    $$('.hc', v).forEach(b=>b.onclick=()=>fichaCliente(b.dataset.cli));
  }
};

/* ================= Documentos ================= */
VIEWS.documentos = {
  t:'Caixa de documentos', sub:'Boletos, notas e comprovantes de todos os canais, lidos automaticamente',
  render(){
    const d = DOCS.find(x=>x.id===state.doc) || DOCS[0]; const c = C[d.cli];
    const novos = DOCS.filter(x=>x.st!=='lancado');
    const list = DOCS.map(x=>{ const o = ORIG[x.orig]; return `<button type="button" class="doc-i${x.id===d.id?' on':''}" data-doc="${x.id}"><span class="src" title="${o[1]}">${ic(o[0])}</span><span style="min-width:0"><b>${esc(x.forn)}</b><small>${cliTag(C[x.cli])}· ${x.tipo} · ${x.quando}</small></span><span style="text-align:right"><div class="num" style="font-weight:800;font-size:12.5px">${brl(x.v)}</div>${x.st==='lancado'?'<span class="chip ok">Lançado</span>':x.st==='duvida'?'<span class="chip warn">Dúvida</span>':x.dup?'<span class="chip warn">Duplicado?</span>':'<span class="chip info">Novo</span>'}</span></button>`; }).join('');
    const isBol = d.tipo==='Boleto';
    const paper = `<div class="paper"><span class="ocr-tag">Leitura automática · ${d.conf}%</span>
      <div class="pp-h"><span class="row" style="gap:10px"><span class="bank">${isBol?'Itaú | 341-7':d.tipo}</span><b>${isBol?'Recibo do sacado':esc(d.tipo)}</b></span></div>
      <div class="ld"><span class="hl">${esc(d.ld)}</span></div>
      <div class="pp-g" style="margin-top:10px">
        <div><small>Beneficiário</small><span class="hl">${esc(d.forn)}</span></div><div><small>Vencimento</small><span class="hl">${d.venc}</span></div>
        <div><small>CNPJ do beneficiário</small><span class="hl">${d.cnpj}</span></div><div><small>Valor do documento</small><span class="hl">${brl(d.v)}</span></div>
        <div><small>Pagador</small><span>${esc(c.nome.toUpperCase())}</span></div><div><small>Nosso número</small><span>109/${String(d.id*7193).padStart(8,'0')}-4</span></div>
        <div style="border-bottom:0"><small>Instruções</small><span>Após o vencimento cobrar multa de 2% e juros de 1% a.m.</span></div><div style="border-bottom:0"><small>Espécie</small><span>R$</span></div>
      </div>${isBol?'<div class="barcode"></div>':''}</div>`;
    const form = `<section class="card form-col" style="display:flex;flex-direction:column;gap:12px">
      <div class="ch" style="margin:0"><div><h3>Lançar como conta a pagar</h3><div class="sub">Campos em roxo vieram da leitura automática</div></div>${av(c)}</div>
      ${d.dup?`<div class="dupe">${ic('alert')}<span>Este código de barras já foi lançado pelo app do cliente em 13/10 (R$ 8.420,00). Confirme antes de lançar para não pagar duas vezes.</span></div>`:''}
      ${d.conf<60?`<div class="dupe">${ic('alert')}<span>Leitura com baixa confiança. Peça ao cliente uma foto mais nítida ou preencha manualmente.</span></div>`:''}
      <div class="field"><label for="f-forn">Fornecedor <span class="conf">${ic('spark')} reconhecido do histórico</span></label><input id="f-forn" class="ai" value="${esc(d.forn)}"></div>
      <div class="grid g2" style="gap:10px"><div class="field"><label for="f-val">Valor</label><input id="f-val" class="ai num" value="${brl(d.v)}"></div><div class="field"><label for="f-venc">Vencimento</label><input id="f-venc" class="ai" value="${d.venc}"></div></div>
      <div class="field"><label for="f-cat">Categoria <span class="conf">${ic('spark')} sugerida</span></label><input id="f-cat" class="ai" value="${esc(d.cat)}"></div>
      <div class="grid g2" style="gap:10px"><div class="field"><label for="f-cc">Conta de pagamento</label><select id="f-cc"><option>Itaú · 12345-6</option><option>Inter · 998877-1</option></select></div><div class="field"><label for="f-apr">Aprovação</label><select id="f-apr"><option>Enviar no lote de quinta</option><option>Pedir agora</option><option>Automática (regra)</option></select></div></div>
      ${d.obs?`<div class="note">${ic('msg')} ${esc(d.obs)}</div>`:''}
      <div class="row" style="justify-content:flex-end;margin-top:2px"><button class="btn" type="button" id="doc-ask">${ic('msg')}Perguntar ao cliente</button><button class="btn pri" type="button" id="doc-ok"${d.st==='lancado'?' disabled':''}>${ic('check')}${d.st==='lancado'?'Já lançado':'Confirmar lançamento'}</button></div>
    </section>`;
    return `<div class="toolbar"><div class="row"><span class="chip info">${novos.length} para triar</span><span class="sub">Canais: app do cliente, e-mail exclusivo por cliente, DDA e WhatsApp</span></div>
      <div class="row"><span class="note" style="padding:6px 10px">${ic('mail')} <b>padaria-sol@docs.camposbpo.com.br</b></span><button class="btn" type="button" id="doc-up">${ic('upload')}Enviar arquivo</button></div></div>
      <div class="inbox"><section class="card" style="padding:10px"><div class="doc-l">${list}</div></section>
      <section class="card" style="display:flex;flex-direction:column;gap:12px"><div class="ch" style="margin:0"><div><h3>${esc(d.tipo)} · ${esc(d.forn)}</h3><div class="sub">${cliTag(c)} · recebido ${d.quando} via ${ORIG[d.orig][1]}</div></div><div class="row"><button class="mini-ib" type="button" title="Baixar">${ic('dl')}</button><button class="mini-ib" type="button" title="Descartar" id="doc-del">${ic('ban')}</button></div></div>${paper}</section>
      ${form}</div>`;
  },
  bind(v){
    $$('[data-doc]', v).forEach(b=>b.onclick=()=>{ state.doc=+b.dataset.doc; render(); });
    $('#doc-ok', v).onclick = () => { const d = DOCS.find(x=>x.id===state.doc); d.st='lancado'; const nx = DOCS.find(x=>x.st!=='lancado'); const prev = state.doc; if (nx) state.doc = nx.id; render(); toast(`Lançado em ${C[d.cli].curto} · entrou no lote de aprovação de quinta`, ()=>{ d.st='novo'; state.doc=prev; render(); }); };
    $('#doc-ask', v).onclick = () => toast('Pergunta enviada ao cliente, ligada a este documento');
    $('#doc-up', v).onclick = () => toast('No sistema real: arraste PDFs ou fotos aqui');
    $('#doc-del', v).onclick = () => toast('Documento descartado');
  }
};

/* ================= Contas a pagar ================= */
VIEWS.pagar = {
  t:'Contas a pagar', sub:'Lotes de pagamento, aprovação do cliente e alçadas',
  render(){
    let rows = PAGAR.filter(p => (state.pagCli==='todos' || p.cli===state.pagCli));
    const f = state.pagF;
    rows = rows.filter(p => f==='abertos' ? p.st!=='pago' : f==='aguardando' ? ['aguardando','parcial','enviado'].includes(p.st) : f==='aprovado' ? ['aprovado','agendado'].includes(p.st) : f==='rascunho' ? p.st==='rascunho' : true).sort((a,b)=>a.d-b.d);
    const base = PAGAR.filter(p => state.pagCli==='todos' || p.cli===state.pagCli);
    const sum = arr => arr.reduce((a,p)=>a+p.v,0);
    const venc = base.filter(p=>p.d<0 && p.st!=='pago'), hoje = base.filter(p=>p.d===0), sem = base.filter(p=>p.d>=0 && p.d<=7 && p.st!=='pago'), ag = base.filter(p=>['aguardando','parcial','enviado'].includes(p.st));
    const selV = sum(PAGAR.filter(p=>state.sel.has(p.id)));
    const tb = rows.map(p => { const c = C[p.cli], o = ORIG[p.orig], s = ST[p.st]; return `<tr><td><input type="checkbox" data-sel="${p.id}" aria-label="Selecionar ${esc(p.forn)}"${state.sel.has(p.id)?' checked':''}${p.st==='pago'?' disabled':''}></td>
      <td><div class="cell-c">${av(c,'sm')}<div><b>${esc(p.forn)}</b><small>${esc(c.curto)} · ${esc(p.cat)}</small></div></div></td>
      <td><span class="row" style="gap:6px;color:var(--ink-2);font-weight:600;font-size:12px;flex-wrap:nowrap" title="Origem">${ic(o[0])}${o[1]}</span></td>
      <td>${p.st==='pago'?`<span class="chip mute">${dmy(addD(TODAY,p.d))}</span>`:dueChip(p.d)}</td>
      <td class="r num" style="font-weight:800">${brl(p.v)}</td>
      <td><span class="chip ${s.k}">${s.n}</span></td>
      <td>${p.anexo?`<span title="Documento anexado" style="color:var(--green)">${ic('file')}</span>`:`<span class="chip bad" title="Falta NF">sem NF</span>`}</td></tr>`; }).join('');
    const c = state.pagCli==='todos' ? null : C[state.pagCli];
    return `<div class="grid g4">
      ${kpi({t:'Vencidos sem pagamento', v:brl(sum(venc)), c:'var(--red)', icn:'alert', foot:`<span><b>${venc.length}</b> títulos</span><span>multa estimada ${brl(sum(venc)*0.02)}</span>`})}
      ${kpi({t:'Vencem hoje', v:brl(sum(hoje)), c:'var(--amber)', icn:'clock', foot:`<span><b>${hoje.length}</b> títulos</span><span>corte bancário 16h</span>`})}
      ${kpi({t:'Próximos 7 dias', v:brl(sum(sem)), c:'var(--blue)', icn:'cal', foot:`<span><b>${sem.length}</b> títulos</span>`})}
      ${kpi({t:'Aguardando aprovação', v:brl(sum(ag)), c:'var(--violet)', icn:'users', foot:`<span><b>${ag.length}</b> títulos</span><span>lembrete automático às 14h</span>`})}
    </div>
    <div class="grid g-8-4">
      <section class="card"><div class="ch"><div class="row"><select class="sel" id="pag-cli" aria-label="Cliente">${cliOptions(state.pagCli)}</select>
        <div class="seg" role="group" aria-label="Status">${[['abertos','Em aberto'],['aguardando','Aguardando'],['aprovado','Aprovados'],['rascunho','Rascunhos'],['todos','Todos']].map(([k,n])=>`<button type="button" data-pf="${k}" aria-pressed="${f===k}">${n}</button>`).join('')}</div></div>
        <button class="btn" type="button" id="pag-new">${ic('plus')}Novo título</button></div>
        <div class="tw"><table><thead><tr><th style="width:28px"><input type="checkbox" id="sel-all" aria-label="Selecionar todos"></th><th>Fornecedor</th><th>Origem</th><th>Vencimento</th><th class="r">Valor</th><th>Status</th><th>Doc.</th></tr></thead><tbody>${tb||`<tr><td colspan="7"><div class="empty">Nenhum título neste filtro.</div></td></tr>`}</tbody></table></div>
        <div class="row" style="justify-content:space-between;margin-top:12px;padding:10px 12px;border-radius:12px;background:${state.sel.size?'var(--surface-2)':'transparent'};border:1px dashed ${state.sel.size?'var(--line)':'transparent'}">
          <span style="font-weight:700;font-size:13px">${state.sel.size?`${state.sel.size} selecionados · <span class="num">${brl(selV)}</span>`:'<span class="sub">Selecione títulos para montar um lote</span>'}</span>
          <div class="row"><button class="btn sm" type="button" id="lote-cnab"${state.sel.size?'':' disabled'}>${ic('dl')}Gerar remessa CNAB</button><button class="btn sm g" type="button" id="lote-env"${state.sel.size?'':' disabled'}>${ic('send')}Enviar lote para aprovação</button></div></div>
      </section>
      <div style="display:flex;flex-direction:column;gap:12px;min-width:0">
        <section class="card"><div class="ch"><div><h3>Alçadas de aprovação</h3><div class="sub">${c?esc(c.nome):'Regras do cliente selecionado'}</div></div>${c?av(c):''}</div>
          ${c?`<div style="display:flex;flex-direction:column;gap:8px">
            <div class="rule">${ic('zap')}<span>Até <code>R$ 500</code> e fornecedor recorrente</span><span class="chip ok">Automática</span></div>
            <div class="rule">${ic('undo')}<span>Impostos e aluguel <code>recorrentes</code></span><span class="chip ok">Automática</span></div>
            <div class="rule">${ic('users')}<span>Até <code>R$ 10 mil</code></span><span class="chip wait">1 sócio</span></div>
            <div class="rule">${ic('shield')}<span>Acima de <code>R$ 10 mil</code></span><span class="chip wait">2 sócios</span></div>
            <div class="rule">${ic('alert')}<span>Dados bancários do fornecedor mudaram</span><span class="chip bad">Bloqueia</span></div></div>`:`<div class="note">Escolha um cliente no filtro para ver e editar as alçadas dele.</div>`}</section>
        <section class="card"><div class="ch"><div><h3>Como o cliente aprova</h3><div class="sub">Notificação no WhatsApp com link para o app</div></div></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div class="feat"><span class="ico" style="--c:var(--violet)">${ic('send')}</span><div><b>1. Você envia o lote</b><p>Um único pedido por semana, com todos os anexos.</p></div></div>
            <div class="feat"><span class="ico" style="--c:var(--blue)">${ic('phone')}</span><div><b>2. Cliente aprova no celular</b><p>Aprova tudo com um toque, rejeita com motivo ou pede para adiar.</p></div></div>
            <div class="feat"><span class="ico" style="--c:var(--green)">${ic('shield')}</span><div><b>3. Fica registrado</b><p>Quem aprovou, quando e de qual aparelho.</p></div></div>
            <button class="btn" type="button" data-go="portal">${ic('eye')}Ver a tela do cliente</button></div></section>
      </div></div>`;
  },
  bind(v){
    $('#pag-cli', v).onchange = e => { state.pagCli = e.target.value; render(); };
    $$('[data-pf]', v).forEach(b=>b.onclick=()=>{ state.pagF=b.dataset.pf; render(); });
    $$('[data-sel]', v).forEach(b=>b.onchange=()=>{ const id=+b.dataset.sel; b.checked?state.sel.add(id):state.sel.delete(id); render(); });
    $('#sel-all', v).onchange = e => { $$('[data-sel]', v).forEach(b=>{ if(!b.disabled){ e.target.checked?state.sel.add(+b.dataset.sel):state.sel.delete(+b.dataset.sel);} }); render(); };
    $('#lote-env', v).onclick = () => { const ids=[...state.sel]; const prev = ids.map(id=>[id, PAGAR.find(p=>p.id===id).st]); ids.forEach(id=>{ const p=PAGAR.find(x=>x.id===id); if(!['aprovado','agendado'].includes(p.st)) p.st='enviado'; }); const n=new Set(ids.map(id=>PAGAR.find(p=>p.id===id).cli)).size; state.sel.clear(); render(); toast(`Lote enviado para ${n} cliente${n>1?'s':''} · lembrete automático às 14h`, ()=>{ prev.forEach(([id,st])=>PAGAR.find(p=>p.id===id).st=st); render(); }); };
    $('#lote-cnab', v).onclick = () => toast('Remessa CNAB 240 gerada para os títulos aprovados');
    $('#pag-new', v).onclick = () => toast('Abriria o formulário de novo título');
  }
};

/* ================= Contas a receber ================= */
VIEWS.receber = {
  t:'Contas a receber', sub:'Recebíveis, inadimplência e régua de cobrança automática',
  render(){
    const aging = [{n:'1 a 15 dias', v:18420, q:'9 títulos', cor:'#F59E0B'},{n:'16 a 30 dias', v:11730, q:'5 títulos', cor:'#EA580C'},{n:'31 a 60 dias', v:8960, q:'4 títulos', cor:'#DC2626'},{n:'Mais de 60 dias', v:6240, q:'3 títulos', cor:'#991B1B'}];
    const inad = [
      ['ar','Oficina Mecânica Turbo', 'Boleto 0045/26', 4380, 23, 'D+15 enviado'],
      ['ar','Transportes Lima ME','Boleto 0039/26', 2910, 41, 'Negociação'],
      ['ps','Condomínio Solar','NF 1170', 1640, 12, 'D+7 enviado'],
      ['ep','Família Andrade (mensalidade)','Mensalidade set', 1280, 15, 'D+15 enviado'],
      ['ap','Construtora Horizonte','NF 2026/312', 7800, 9, 'D+7 enviado'],
      ['db','Mercado Bom Preço','Duplicata 8821', 5320, 64, 'Protesto sugerido']
    ];
    const regua = [['D−3','Lembrete amigável','mail','var(--blue)'],['D0','Aviso de vencimento','msg','var(--blue)'],['D+1','Boleto atualizado','send','var(--amber)'],['D+7','Cobrança firme','msg','var(--amber)'],['D+15','Ligação do analista','phone','var(--red)'],['D+30','Negociação ou protesto','shield','var(--red)']];
    const months = ['mai','jun','jul','ago','set','out'].map((m,i)=>({lab:m, full:m+'/2026', prev:[182,176,191,188,204,212][i]*1000, rec:[171,170,183,179,196,128][i]*1000, hl:i===5}));
    return `<div class="grid g4">
      ${kpi({t:'A receber · próximos 30 dias', v:brl(412380), c:'var(--green)', icn:'down', foot:`<span><b>186</b> títulos em 12 clientes</span>`})}
      ${kpi({t:'Recebido em outubro', v:brl(128450), c:'var(--blue)', icn:'wallet', foot:`<span>60% do previsto no mês</span>`})}
      ${kpi({t:'Inadimplência da carteira', v:pct(4.8,1), c:'var(--red)', icn:'alert', foot:`<span><b>${brl(45350,0)}</b> vencidos</span><span>set: 5,6%</span>`})}
      ${kpi({t:'Recuperado pela régua', v:brl(21900), c:'var(--violet)', icn:'zap', foot:`<span>neste mês, sem ligação manual</span>`})}
    </div>
    <div class="grid g-5-7">
      <section class="card"><div class="ch"><div><h3>Vencidos por tempo de atraso</h3><div class="sub">Todos os clientes</div></div></div>${hbars(aging)}</section>
      <section class="card"><div class="ch"><div><h3>Previsto x recebido</h3><div class="sub">Carteira inteira · outubro até hoje</div></div><div class="legend"><span><i style="--c:var(--ink-2)"></i>Previsto</span><span><i style="--c:var(--green)"></i>Recebido</span></div></div>
        ${groupedBars(months, [{k:'prev', nome:'Previsto', cor:'var(--ink-2)'},{k:'rec', nome:'Recebido', cor:'var(--green)'}], {h:200})}</section>
    </div>
    <div class="grid g-8-4">
      <section class="card"><div class="ch"><div><h3>Inadimplentes</h3><div class="sub">A régua já agiu; estes precisam de decisão</div></div></div>
        <div class="tw"><table><thead><tr><th>Devedor</th><th>Documento</th><th class="r">Valor</th><th>Atraso</th><th>Etapa da régua</th><th></th></tr></thead><tbody>
        ${inad.map(r=>`<tr><td><div class="cell-c">${av(C[r[0]],'sm')}<div><b>${r[1]}</b><small>${C[r[0]].curto}</small></div></div></td><td>${r[2]}</td><td class="r num" style="font-weight:800">${brl(r[3])}</td><td><span class="chip ${r[4]>30?'bad':'warn'}">${r[4]} dias</span></td><td><span class="chip ${r[5].includes('Protesto')?'bad':'mute'}">${r[5]}</span></td><td class="r"><button class="mini-ib" type="button" title="Cobrar agora" aria-label="Cobrar ${r[1]}" data-cob="${r[1]}">${ic('send')}</button></td></tr>`).join('')}
        </tbody></table></div></section>
      <section class="card"><div class="ch"><div><h3>Régua de cobrança</h3><div class="sub">Modelo padrão do escritório · editável por cliente</div></div></div>
        <div style="display:flex;flex-direction:column;gap:0">${regua.map((r,i)=>`<div class="feat" style="padding:8px 0;${i<regua.length-1?'border-bottom:1px solid var(--line)':''}"><span class="ico" style="--c:${r[3]}">${ic(r[2])}</span><div style="flex:1"><b>${r[0]} · ${r[1]}</b><p>${['E-mail com boleto e Pix','WhatsApp com link de pagamento','2ª via com juros calculados','WhatsApp + e-mail ao responsável','Tarefa criada para o analista','Tarefa para o gestor decidir'][i]}</p></div></div>`).join('')}</div></section>
    </div>`;
  },
  bind(v){ $$('[data-cob]', v).forEach(b=>b.onclick=()=>toast(`Cobrança enviada para ${b.dataset.cob}`)); }
};

/* ================= Conciliação ================= */
VIEWS.conciliacao = {
  t:'Conciliação bancária', sub:'Extratos via Open Finance, com sugestões automáticas de pareamento',
  render(){
    const c = C[state.concCli];
    const accs = [{n:'Itaú', cc:'Ag 0912 · CC 12345-6', cor:'#EC7000', s:31280.44, ate:'14/10', p:CONC.filter(r=>!r.ok).length, ini:'IT'},{n:'Inter', cc:'CC 998877-1', cor:'#FF7A00', s:5120.90, ate:'14/10', p:0, ini:'IN'},{n:'Stone', cc:'Conta de pagamentos', cor:'#00A868', s:2018.66, ate:'13/10', p:3, ini:'ST'}];
    const alta = CONC.filter(r=>!r.ok && r.conf>=85).length;
    const pend = CONC.filter(r=>!r.ok);
    const rows = CONC.map(r => { const k = r.conf>=85?'var(--green)':r.conf>=60?'var(--amber)':'var(--line)';
      return `<div class="rec${r.ok?' ok':''}" data-r="${r.id}">
        <div class="side-a"><div class="txt"><b>${esc(r.ext)}</b><small>${r.d} · extrato Itaú</small></div><span class="val num ${r.ev>0?'in':'out'}">${brl(r.ev)}</span></div>
        <div class="link" style="--c:${k}">${r.lanc?`<div class="ln"></div><small>${r.ok?'Conciliado':r.conf+'% · '+(r.conf>=85?'alta':'média')}</small>`:`<small style="color:var(--muted)">sem par</small>`}</div>
        ${r.lanc?`<div class="side-b" title="${esc(r.motivo)}"><div class="txt"><b>${esc(r.lanc)}</b><small>${r.multi?r.multi+' lançamentos · ':''}${esc(r.motivo)}</small></div><span class="val num ${r.lv>0?'in':'out'}">${brl(r.lv)}</span></div>`:`<div class="side-b none">${r.sug==='Perguntar ao cliente'?'Saque sem justificativa':'Sugestão: criar lançamento em “'+r.sug+'”'}</div>`}
        <div class="act">${r.ok?`<button class="mini-ib" type="button" data-undo="${r.id}" title="Desfazer">${ic('undo')}</button>`:r.lanc?`<button class="mini-ib ok" type="button" data-ok="${r.id}" title="Aceitar">${ic('check')}</button><button class="mini-ib" type="button" title="Escolher outro">${ic('search')}</button>`:r.sug==='Perguntar ao cliente'?`<button class="btn sm" type="button" data-ask="${r.id}">${ic('msg')}Perguntar</button>`:`<button class="btn sm" type="button" data-create="${r.id}">${ic('plus')}Criar</button>`}</div></div>`; }).join('');
    return `<div class="toolbar"><div class="row"><select class="sel" id="conc-cli" aria-label="Cliente">${cliOptions(state.concCli,false)}</select><span class="chip ok">${ic('zap')}Open Finance conectado · atualizado 07:02</span></div>
      <div class="row"><button class="btn" type="button" id="conc-ofx">${ic('upload')}Importar OFX</button><button class="btn g" type="button" id="conc-all"${alta?'':' disabled'}>${ic('check')}Aceitar ${alta} sugestões de alta confiança</button></div></div>
    <div class="acc">${accs.map((a,i)=>`<button type="button" class="acc-c${state.concAcc===i?' on':''}" data-acc="${i}"><div class="acc-t"><span class="bank-ic" style="--c:${a.cor}">${a.ini}</span><div><b>${a.n}</b><small>${a.cc}</small></div></div><div class="row" style="justify-content:space-between"><span class="num" style="font-weight:800;font-size:16px">${brl(a.s)}</span>${a.p?`<span class="chip warn">${a.p} pendentes</span>`:`<span class="chip ok">${ic('check')}Em dia</span>`}</div><div class="sub">Conciliado até ${a.ate}</div></button>`).join('')}</div>
    <div class="grid g-8-4">
      <section class="card"><div class="ch"><div><h3>Extrato x lançamentos · ${esc(c.curto)}</h3><div class="sub">${pend.length} pendentes · passe o mouse no par para ver o motivo da sugestão</div></div><div class="legend"><span><i style="--c:var(--green)"></i>Alta confiança</span><span><i style="--c:var(--amber)"></i>Média</span><span><i style="--c:var(--muted)"></i>Sem par</span></div></div>
        <div class="rec-h"><span>Extrato bancário</span><span style="text-align:center">Pareamento</span><span>Lançamento no sistema</span><span></span></div>${rows}</section>
      <div style="display:flex;flex-direction:column;gap:12px;min-width:0">
        <section class="card"><div class="ch"><div><h3>Automação este mês</h3><div class="sub">${esc(c.curto)} · outubro</div></div></div>
          <div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="num" style="font-size:28px;font-weight:800;letter-spacing:-.02em">74%</div><div class="sub">conciliado sem intervenção</div></div><div style="text-align:right"><div class="num" style="font-weight:800">2h40</div><div class="sub">economizadas vs. manual</div></div></div>
          <div class="stack" style="margin-top:12px"><i style="--c:var(--green);flex:74" data-tip="${esc('<b>Automático</b>'+tipRow('var(--green)','Transações','305'))}"></i><i style="--c:var(--amber);flex:19" data-tip="${esc('<b>Sugestão aceita</b>'+tipRow('var(--amber)','Transações','78'))}"></i><i style="--c:var(--muted);flex:7" data-tip="${esc('<b>Manual</b>'+tipRow('var(--muted)','Transações','29'))}"></i></div>
          <div class="legend" style="margin-top:10px"><span><i style="--c:var(--green)"></i>Automático 305</span><span><i style="--c:var(--amber)"></i>Sugestão 78</span><span><i style="--c:var(--muted)"></i>Manual 29</span></div></section>
        <section class="card"><div class="ch"><div><h3>Regras de categorização</h3><div class="sub">Criadas com 1 clique a partir de uma conciliação</div></div><button class="lnk" type="button" id="rule-new">+ Nova</button></div>
          <div style="display:flex;flex-direction:column;gap:6px">
            <div class="rule"><code>TAR*</code>→ Tarifas bancárias<span class="chip mute">42×</span></div>
            <div class="rule"><code>IFOOD*</code>→ Receita delivery<span class="chip mute">31×</span></div>
            <div class="rule"><code>STONE LIQ*</code>→ Vendas cartão<span class="chip mute">58×</span></div>
            <div class="rule"><code>IOF*</code>→ Juros e IOF<span class="chip mute">12×</span></div>
            <div class="rule"><code>DEB AUT VIVO</code>→ Telefonia<span class="chip info">sugerida</span></div></div></section>
      </div></div>`;
  },
  bind(v){
    $('#conc-cli', v).onchange = e => { state.concCli = e.target.value; render(); };
    $$('[data-acc]', v).forEach(b=>b.onclick=()=>{ state.concAcc=+b.dataset.acc; render(); });
    $$('[data-ok]', v).forEach(b=>b.onclick=()=>{ const r=CONC.find(x=>x.id==b.dataset.ok); r.ok=true; render(); toast('Conciliado · lançamento travado para edição', ()=>{ r.ok=false; render(); }); });
    $$('[data-undo]', v).forEach(b=>b.onclick=()=>{ CONC.find(x=>x.id==b.dataset.undo).ok=false; render(); });
    $$('[data-create]', v).forEach(b=>b.onclick=()=>{ const r=CONC.find(x=>x.id==b.dataset.create); r.lanc='Vivo Empresas · '+r.sug; r.lv=r.ev; r.conf=100; r.motivo='criado a partir do extrato · regra sugerida'; r.ok=true; render(); toast('Lançamento criado e conciliado · regra “DEB AUT VIVO” sugerida'); });
    $$('[data-ask]', v).forEach(b=>b.onclick=()=>toast('Pergunta enviada ao cliente: “Saque de R$ 600 em 12/10, qual foi o uso?”'));
    $('#conc-all', v).onclick = () => { const ids = CONC.filter(r=>!r.ok && r.conf>=85).map(r=>r.id); ids.forEach(id=>CONC.find(r=>r.id===id).ok=true); render(); toast(`${ids.length} transações conciliadas`, ()=>{ ids.forEach(id=>CONC.find(r=>r.id===id).ok=false); render(); }); };
    $('#conc-ofx', v).onclick = () => toast('Importação OFX/CSV para bancos sem Open Finance');
    $('#rule-new', v).onclick = () => toast('Abriria o editor de regras');
  }
};
</script>
