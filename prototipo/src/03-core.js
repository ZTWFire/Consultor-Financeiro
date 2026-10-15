<script>
/* ================= Ícones ================= */
const P = {
  radar:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  up:'<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  down:'<path d="M17 7 7 17"/><path d="M16 17H7V8"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  trend:'<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  checks:'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  bars:'<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  gauge:'<path d="M12 14 16 10"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  phone:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  msg:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  chev:'<path d="m9 18 6-6-6-6"/>',
  spark:'<path d="M9.94 14.06 4 20M12 2l1.9 5.8L20 10l-6.1 2.2L12 18l-1.9-5.8L4 10l6.1-2.2Z"/>',
  wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  bank:'<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4Z"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  undo:'<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>',
  ban:'<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
  dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  barcode:'<path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  timer:'<path d="M10 2h4M12 14l3-3"/><circle cx="12" cy="14" r="8"/>'
};
const ic = (n, sw=2) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||''}</svg>`;

/* ================= Utilitários ================= */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const brl = (v, d=2) => (v<0?'−':'') + 'R$ ' + Math.abs(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const brlK = v => { const a=Math.abs(v); const s=v<0?'−':''; return a>=1e6? s+'R$ '+(a/1e6).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mi' : a>=1e3? s+'R$ '+(a/1e3).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mil' : s+'R$ '+Math.round(a); };
const pct = (v, d=0) => v.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d})+'%';
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let seed = 7; const rnd = () => (seed = (seed*16807) % 2147483647) / 2147483647;
const TODAY = new Date(2026, 9, 15);
const addD = (d, n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
const dmy = d => String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0');
const WD = ['dom','seg','ter','qua','qui','sex','sáb'];
const MES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const rel = n => n===0?'hoje':n===1?'amanhã':n===-1?'ontem':n<0?`há ${-n} dias`:`em ${n} dias`;
const av = (c, cls='') => `<span class="av ${cls}" style="--c:${c.cor}" title="${esc(c.nome)}">${c.ini}</span>`;
const cliTag = c => `<span class="q-cli" style="--c:${c.cor}"><i></i>${esc(c.curto)}</span>`;

/* ================= Dados de exemplo ================= */
const ANALISTAS = { AC:{nome:'André Campos', cor:'#7C3AED'}, JL:{nome:'Júlia Lima', cor:'#0284C7'}, RS:{nome:'Rafael Souza', cor:'#EA580C'} };
const CLIENTES = [
  {id:'ps', nome:'Padaria Sol Nascente', curto:'Padaria Sol', ini:'PS', seg:'Alimentação · varejo', cor:'#EA580C', an:'JL', honor:1450, horas:19, saldo:38420, conc:1, pend:2, aprov:3, docs:4, sla:96, minimo:15000, mov:412, contas:3},
  {id:'cv', nome:'Clínica Vida Plena', curto:'Clínica Vida', ini:'CV', seg:'Saúde', cor:'#0D9488', an:'AC', honor:2800, horas:22, saldo:124900, conc:0, pend:0, aprov:2, docs:1, sla:100, minimo:40000, mov:286, contas:2},
  {id:'ap', nome:'Agência Pixel Norte', curto:'Pixel Norte', ini:'PN', seg:'Serviços · marketing', cor:'#4F46E5', an:'RS', honor:1900, horas:14, saldo:52310, conc:2, pend:1, aprov:0, docs:0, sla:94, minimo:20000, mov:158, contas:2},
  {id:'rs', nome:'Restaurante Sabor da Serra', curto:'Sabor da Serra', ini:'SS', seg:'Alimentação · restaurante', cor:'#BE123C', an:'JL', honor:1650, horas:31, saldo:8740, conc:4, pend:3, aprov:5, docs:3, sla:78, minimo:12000, mov:640, contas:3},
  {id:'ar', nome:'Auto Peças Ribeiro', curto:'Auto Peças', ini:'AR', seg:'Comércio', cor:'#475569', an:'RS', honor:2200, horas:24, saldo:71230, conc:1, pend:1, aprov:1, docs:2, sla:92, minimo:30000, mov:520, contas:2},
  {id:'sf', nome:'Studio Fit Academia', curto:'Studio Fit', ini:'SF', seg:'Serviços · academia', cor:'#DB2777', an:'AC', honor:1200, horas:9, saldo:19870, conc:0, pend:0, aprov:0, docs:0, sla:100, minimo:8000, mov:190, contas:1},
  {id:'os', nome:'Odonto Sorriso', curto:'Odonto Sorriso', ini:'OS', seg:'Saúde', cor:'#0284C7', an:'AC', honor:1800, horas:12, saldo:46100, conc:0, pend:1, aprov:2, docs:0, sla:98, minimo:15000, mov:174, contas:2},
  {id:'ca', nome:'Construtora Alicerce', curto:'Alicerce', ini:'CA', seg:'Construção', cor:'#A16207', an:'RS', honor:3900, horas:41, saldo:61800, conc:3, pend:2, aprov:4, docs:2, sla:81, minimo:50000, mov:705, contas:4},
  {id:'pa', nome:'Pet Shop Amigo Fiel', curto:'Amigo Fiel', ini:'AF', seg:'Comércio · pet', cor:'#4D7C0F', an:'JL', honor:990, horas:11, saldo:12450, conc:1, pend:0, aprov:1, docs:1, sla:95, minimo:6000, mov:233, contas:2},
  {id:'ov', nome:'Ótica Visão Clara', curto:'Visão Clara', ini:'VC', seg:'Comércio', cor:'#9333EA', an:'AC', honor:1100, horas:8, saldo:27600, conc:0, pend:0, aprov:0, docs:0, sla:100, minimo:10000, mov:121, contas:1},
  {id:'ep', nome:'Escola Pequeno Saber', curto:'Pequeno Saber', ini:'PQ', seg:'Educação', cor:'#0E7490', an:'JL', honor:2400, horas:16, saldo:88900, conc:0, pend:1, aprov:0, docs:0, sla:97, minimo:35000, mov:302, contas:2},
  {id:'db', nome:'Distribuidora Bom Grão', curto:'Bom Grão', ini:'BG', seg:'Atacado', cor:'#7C3AED', an:'RS', honor:3200, horas:38, saldo:142300, conc:2, pend:1, aprov:2, docs:1, sla:88, minimo:60000, mov:880, contas:3}
];
const C = Object.fromEntries(CLIENTES.map(c => [c.id, c]));
const CUSTO_HORA = 65;
CLIENTES.forEach(c => {
  const risco = (c.conc>=3?2:c.conc>=1?1:0) + (c.saldo<c.minimo?2:0) + (c.sla<85?2:c.sla<95?1:0) + (c.pend>=2?1:0);
  c.saude = risco>=4?'bad':risco>=2?'warn':'ok';
  c.margem = (c.honor - c.horas*CUSTO_HORA) / c.honor * 100;
});

/* Fila do dia */
let FILA = [
  {id:1, t:'pagar', cli:'cv', tit:'Lote de pagamentos aprovado (4 títulos)', det:'Aprovado por Dra. Helena às 08:12', v:-18640.5, prazo:0, acao:'Pagar agora'},
  {id:2, t:'aprov', cli:'rs', tit:'Lote aguardando aprovação há 2 dias', det:'5 títulos · vence hoje: Frigorífico Serrano', v:-23180.9, prazo:0, acao:'Cobrar aprovação'},
  {id:3, t:'alerta', cli:'ca', tit:'Saldo negativo projetado em 6 dias', det:'Folha + INSS em 21/10 sem cobertura', v:-41200, prazo:6, acao:'Ver fluxo'},
  {id:4, t:'doc', cli:'rs', tit:'Extrato da maquininha Stone · setembro', det:'Solicitado em 03/10 · 2 lembretes enviados', v:null, prazo:-4, acao:'Cobrar cliente'},
  {id:5, t:'conc', cli:'rs', tit:'Conciliação atrasada · Itaú e Stone', det:'38 transações pendentes desde 11/10', v:null, prazo:-4, acao:'Conciliar'},
  {id:6, t:'pagar', cli:'ps', tit:'DAS Simples Nacional · competência 09/2026', det:'Aprovação automática (imposto recorrente)', v:-3920.18, prazo:5, acao:'Agendar'},
  {id:7, t:'aprov', cli:'ca', tit:'Medição Concretex · acima da alçada', det:'Precisa de 2 sócios · 1 de 2 aprovou', v:-58700, prazo:1, acao:'Cobrar 2º sócio'},
  {id:8, t:'rotina', cli:'ap', tit:'Relatório mensal de setembro', det:'SLA do contrato: até dia 15', v:null, prazo:0, acao:'Gerar relatório'},
  {id:9, t:'conc', cli:'ca', tit:'Conciliação atrasada · 3 contas', det:'27 transações pendentes', v:null, prazo:-3, acao:'Conciliar'},
  {id:10, t:'doc', cli:'ps', tit:'NF do fornecedor Moinho Paulista', det:'Boleto lançado sem nota fiscal anexada', v:null, prazo:-1, acao:'Cobrar cliente'},
  {id:11, t:'pagar', cli:'db', tit:'Remessa CNAB · 7 fornecedores', det:'Aprovado ontem por Sr. Otávio', v:-64215.3, prazo:1, acao:'Gerar remessa'},
  {id:12, t:'aprov', cli:'os', tit:'2 títulos aguardando aprovação', det:'Dental Cremer · Aluguel sala 2', v:-9480, prazo:2, acao:'Cobrar aprovação'},
  {id:13, t:'rotina', cli:'ar', tit:'Revisar régua de cobrança · 6 inadimplentes', det:'Rotina semanal (quinta-feira)', v:null, prazo:0, acao:'Abrir'},
  {id:14, t:'conc', cli:'ap', tit:'Conciliação · Banco Inter', det:'9 transações desde 13/10', v:null, prazo:-2, acao:'Conciliar'}
];
const FILA_TIPO = {
  pagar:{nome:'Pagar', ic:'up', c:'var(--green)'},
  aprov:{nome:'Aprovação', ic:'clock', c:'var(--violet)'},
  alerta:{nome:'Alerta', ic:'alert', c:'var(--red)'},
  doc:{nome:'Documento', ic:'file', c:'var(--amber)'},
  conc:{nome:'Conciliação', ic:'link', c:'var(--blue)'},
  rotina:{nome:'Rotina', ic:'checks', c:'var(--ink-2)'}
};

/* Contas a pagar */
const FORN = [
  ['ps','Moinho Paulista Farinhas','Matéria-prima',8420.00,-1,'aguardando','dda'],
  ['ps','Laticínios Boa Vista','Matéria-prima',3180.40,2,'aguardando','app'],
  ['ps','Enel Distribuição','Energia',2894.77,3,'aprovado','email'],
  ['ps','DAS Simples Nacional','Impostos',3920.18,5,'aprovado','recorrente'],
  ['ps','Aluguel · Imobiliária Central','Ocupação',6500.00,5,'aguardando','recorrente'],
  ['rs','Frigorífico Serrano','Matéria-prima',11240.60,0,'aguardando','app'],
  ['rs','Hortifruti Vale Verde','Matéria-prima',2310.30,0,'aguardando','app'],
  ['rs','Ambev Distribuidora','Bebidas',6830.00,1,'aguardando','dda'],
  ['rs','Gás Ultragaz','Utilidades',1290.00,2,'aguardando','email'],
  ['rs','Folha · adiantamento quinzena','Pessoal',14800.00,5,'rascunho','recorrente'],
  ['cv','Medical Supply Ltda','Insumos',7210.50,0,'aprovado','email'],
  ['cv','Laboratório Analisa','Serviços',4380.00,0,'aprovado','dda'],
  ['cv','Software Clínica Nas Nuvens','Sistemas',890.00,0,'aprovado','recorrente'],
  ['cv','Aluguel · Ed. Paulista Center','Ocupação',6160.00,0,'aprovado','recorrente'],
  ['ca','Concretex Usinagem','Materiais',58700.00,1,'parcial','email'],
  ['ca','Gerdau Aços','Materiais',21450.90,4,'aguardando','dda'],
  ['ca','Locadora Equipa Obras','Equipamentos',8900.00,6,'aguardando','email'],
  ['os','Dental Cremer','Insumos',3480.00,2,'aguardando','dda'],
  ['os','Aluguel sala 2','Ocupação',6000.00,2,'aguardando','recorrente'],
  ['db','Cerealista Paraná','Mercadorias',38420.00,1,'aprovado','dda'],
  ['db','Transportadora Rápida Sul','Frete',9870.30,1,'aprovado','email'],
  ['ar','Distribuidora Bosch','Mercadorias',17330.25,3,'agendado','dda'],
  ['ap','Adobe · licenças','Sistemas',1840.00,4,'agendado','recorrente'],
  ['pa','PremieRpet Distribuição','Mercadorias',5620.00,6,'aguardando','dda'],
  ['ep','Folha professores','Pessoal',42800.00,5,'agendado','recorrente'],
  ['sf','Technogym manutenção','Manutenção',1450.00,-3,'pago','email']
];
let PAGAR = FORN.map((f,i) => ({id:i+1, cli:f[0], forn:f[1], cat:f[2], v:f[3], d:f[4], st:f[5], orig:f[6], anexo: !(f[0]==='ps'&&i===0)}));
const ST = {
  rascunho:{n:'Rascunho', k:'mute'}, aguardando:{n:'Aguardando', k:'wait'}, parcial:{n:'1 de 2 sócios', k:'wait'},
  aprovado:{n:'Aprovado', k:'info'}, agendado:{n:'Agendado', k:'ok'}, pago:{n:'Pago', k:'ok'}, enviado:{n:'Enviado', k:'wait'}
};
const ORIG = {dda:['barcode','DDA'], app:['camera','App do cliente'], email:['mail','E-mail'], recorrente:['undo','Recorrente'], wa:['msg','WhatsApp']};

/* Documentos (inbox) */
let DOCS = [
  {id:1, cli:'rs', tipo:'Boleto', orig:'app', quando:'há 12 min', forn:'Frigorífico Serrano Ltda', cnpj:'12.384.990/0001-07', v:11240.60, venc:'15/10/2026', cat:'Matéria-prima', ld:'34191.79001 01043.510047 91020.150008 1 96530001124060', conf:98, st:'novo', obs:'“é da carne da semana” — Marcos'},
  {id:2, cli:'ps', tipo:'Boleto', orig:'dda', quando:'há 40 min', forn:'Moinho Paulista Farinhas S.A.', cnpj:'03.551.204/0001-90', v:8420.00, venc:'14/10/2026', cat:'Matéria-prima', ld:'23793.38128 60082.140217 48000.063307 5 96520000842000', conf:99, st:'novo', obs:'Recebido via DDA do Itaú', dup:true},
  {id:3, cli:'ca', tipo:'Nota fiscal', orig:'email', quando:'há 1 h', forn:'Concretex Usinagem de Concreto', cnpj:'21.004.118/0001-55', v:58700.00, venc:'16/10/2026', cat:'Materiais', ld:'NF-e 000.184.223 · Série 1', conf:93, st:'novo', obs:'Enviado por financeiro@concretex.com.br'},
  {id:4, cli:'cv', tipo:'Comprovante', orig:'app', quando:'há 2 h', forn:'Medical Supply Ltda', cnpj:'09.774.352/0001-12', v:7210.50, venc:'15/10/2026', cat:'Insumos', ld:'Pix · ID E1234567820261015', conf:97, st:'novo', obs:'Comprovante de pagamento'},
  {id:5, cli:'os', tipo:'Boleto', orig:'dda', quando:'há 3 h', forn:'Dental Cremer Produtos Odontológicos', cnpj:'82.641.325/0001-18', v:3480.00, venc:'17/10/2026', cat:'Insumos', ld:'00190.00009 02945.120004 18456.217171 8 96550000348000', conf:99, st:'novo', obs:''},
  {id:6, cli:'pa', tipo:'Boleto', orig:'email', quando:'há 5 h', forn:'PremieRpet Distribuição', cnpj:'01.237.411/0001-60', v:5620.00, venc:'21/10/2026', cat:'Mercadorias', ld:'34191.09065 44830.136085 21004.410009 2 96590000562000', conf:96, st:'novo', obs:''},
  {id:7, cli:'rs', tipo:'Foto de recibo', orig:'wa', quando:'ontem 19:42', forn:'Não identificado', cnpj:'—', v:380.00, venc:'—', cat:'—', ld:'Recibo manuscrito', conf:41, st:'duvida', obs:'Imagem com baixa nitidez'},
  {id:8, cli:'ap', tipo:'Nota fiscal', orig:'email', quando:'ontem 16:10', forn:'Adobe Systems Brasil', cnpj:'05.479.142/0001-34', v:1840.00, venc:'19/10/2026', cat:'Sistemas', ld:'NFS-e 2026/88123', conf:95, st:'novo', obs:''},
  {id:9, cli:'db', tipo:'Boleto', orig:'dda', quando:'ontem 14:05', forn:'Cerealista Paraná Ltda', cnpj:'76.512.448/0001-03', v:38420.00, venc:'16/10/2026', cat:'Mercadorias', ld:'10499.38822 20000.100046 00000.432188 4 96540003842000', conf:99, st:'novo', obs:''},
  {id:10, cli:'ar', tipo:'Extrato', orig:'email', quando:'ontem 11:30', forn:'Extrato cartão Cielo · set/26', cnpj:'—', v:42317.88, venc:'—', cat:'Conciliação de cartões', ld:'CSV · 1.284 linhas', conf:100, st:'novo', obs:'Arquivo para conciliação de cartões'},
  {id:11, cli:'ps', tipo:'Boleto', orig:'app', quando:'13/10', forn:'Laticínios Boa Vista', cnpj:'44.120.871/0001-20', v:3180.40, venc:'17/10/2026', cat:'Matéria-prima', ld:'03399.12347 56000.000123 41000.101018 9 96550000318040', conf:97, st:'lancado', obs:''}
];

/* Conciliação (Padaria Sol) */
let CONC = [
  {id:1, d:'14/10', ext:'PIX RECEBIDO IFOOD PAGAMENTOS', ev:4820.35, lanc:'Repasse iFood · semana 40', lv:4820.35, conf:99, motivo:'valor e data exatos'},
  {id:2, d:'14/10', ext:'BOLETO PAGO ENEL SP', ev:-2894.77, lanc:'Enel Distribuição · out/26', lv:-2894.77, conf:98, motivo:'código de barras'},
  {id:3, d:'14/10', ext:'TAR PACOTE SERVICOS', ev:-89.90, lanc:'Despesas bancárias · tarifa', lv:-89.90, conf:95, motivo:'regra “TAR*” → Tarifas'},
  {id:4, d:'14/10', ext:'STONE PAGAMENTOS LIQUIDACAO', ev:12340.18, lanc:'Vendas cartão · 3 lotes (12 a 13/10)', lv:12340.18, conf:91, motivo:'3 lançamentos somam o valor', multi:3},
  {id:5, d:'13/10', ext:'PIX ENV LATICINIOS BOA VI', ev:-3180.40, lanc:'Laticínios Boa Vista', lv:-3180.40, conf:87, motivo:'valor igual · data +2 dias'},
  {id:6, d:'13/10', ext:'PIX ENV MARCIO A SILVA', ev:-450.00, lanc:'Frete · Márcio (motoboy)', lv:-450.00, conf:72, motivo:'favorecido parecido'},
  {id:7, d:'13/10', ext:'DEB AUT VIVO EMPRESAS', ev:-219.90, lanc:null, lv:null, conf:0, motivo:'sem lançamento correspondente', sug:'Telefonia & internet'},
  {id:8, d:'12/10', ext:'TED RECEBIDA CONDOMINIO SOLAR', ev:2150.00, lanc:'Fornecimento coffee break · NF 1182', lv:2150.00, conf:89, motivo:'cliente e valor'},
  {id:9, d:'12/10', ext:'SAQUE CAIXA 24H', ev:-600.00, lanc:null, lv:null, conf:0, motivo:'saque sem justificativa', sug:'Perguntar ao cliente'},
  {id:10, d:'11/10', ext:'IOF ADIC CHEQUE ESPECIAL', ev:-14.32, lanc:'Juros e IOF', lv:-14.32, conf:94, motivo:'regra “IOF*” → Juros e IOF'}
];

/* Fechamentos */
const FECH_COLS = [
  {k:'nao', n:'Não iniciado', c:'var(--muted)'},
  {k:'and', n:'Em andamento', c:'var(--blue)'},
  {k:'cli', n:'Aguardando cliente', c:'var(--violet)'},
  {k:'rev', n:'Em revisão', c:'var(--amber)'},
  {k:'ok', n:'Concluído', c:'var(--green)'}
];
let FECH = {ps:'and', cv:'ok', ap:'rev', rs:'cli', ar:'and', sf:'ok', os:'ok', ca:'cli', pa:'and', ov:'ok', ep:'rev', db:'nao'};
const CHECK = [
  ['Todas as contas conciliadas até 30/09', true],
  ['Nenhum lançamento sem categoria', true],
  ['Todos os pagamentos com comprovante', true],
  ['Extratos de cartão recebidos', false],
  ['Revisão de lançamentos atípicos', false],
  ['Relatório gerado e revisado', false],
  ['Pacote enviado à contabilidade', false],
  ['Reunião de resultados agendada', false]
];
const FECH_PROG = {ps:[1,1,0,1,0,0,0,0], cv:[1,1,1,1,1,1,1,1], ap:[1,1,1,1,1,1,0,0], rs:[0,1,0,0,0,0,0,0], ar:[1,1,1,0,1,0,0,0], sf:[1,1,1,1,1,1,1,1], os:[1,1,1,1,1,1,1,1], ca:[0,1,1,0,0,0,0,0], pa:[1,0,1,1,0,0,0,0], ov:[1,1,1,1,1,1,1,1], ep:[1,1,1,1,1,1,0,1], db:[0,0,0,0,0,0,0,0]};

/* Série de saldo projetado (90 dias) por cliente */
function serieCaixa(c){
  seed = c.id.charCodeAt(0)*31 + c.id.charCodeAt(1);
  const pts = []; let s = c.saldo; const base = c.honor*14;
  for (let i=0;i<=90;i++){
    const d = addD(TODAY, i);
    let ent = d.getDay()===0 ? 0 : base*(0.5+rnd()*0.6)/6;
    let sai = d.getDay()===0 ? 0 : base*(0.2+rnd()*0.45)/6;
    if (d.getDate()===5) sai += base*1.1;
    if (d.getDate()===20) sai += base*0.9;
    if (d.getDate()===10) ent += base*0.7;
    if (c.id==='ca' && i===6) sai += 41200;
    if (c.id==='ca' && i===12) ent += 52000;
    if (c.id==='rs' && (i===5||i===35)) sai += 16000;
    if (i>0) s += ent - sai;
    pts.push({i, d, s, ent: i?ent:0, sai: i?sai:0});
  }
  return pts;
}

/* ================= Tooltip ================= */
const tip = $('#tip');
function showTip(e, html){ tip.innerHTML = html; tip.classList.add('on'); const w = tip.offsetWidth, h = tip.offsetHeight; let x = e.clientX + 14, y = e.clientY - h - 12; if (x + w > innerWidth - 8) x = e.clientX - w - 14; if (y < 8) y = e.clientY + 16; tip.style.left = x+'px'; tip.style.top = y+'px'; }
function hideTip(){ tip.classList.remove('on'); }
function bindTips(root){ $$('[data-tip]', root).forEach(el => { el.addEventListener('mousemove', e => showTip(e, el.dataset.tip)); el.addEventListener('mouseleave', hideTip); }); }
const tipRow = (c, l, v) => `<div><span><i style="--c:${c}"></i>${l}</span><strong>${v}</strong></div>`;

/* ================= Gráficos (SVG) ================= */
function niceTicks(min, max, n=4){
  const span = max - min || 1; const step0 = span / n; const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1,2,2.5,5,10].map(m=>m*mag).find(s => s >= step0);
  const lo = Math.floor(min/step)*step, hi = Math.ceil(max/step)*step; const t=[]; for (let v=lo; v<=hi+1e-9; v+=step) t.push(+v.toFixed(6)); return t;
}
function spark(vals, color){
  const w=200, h=28, min=Math.min(...vals), max=Math.max(...vals), sx=i=>i/(vals.length-1)*w, sy=v=>h-2-(v-min)/((max-min)||1)*(h-6);
  const line = vals.map((v,i)=>(i?'L':'M')+sx(i).toFixed(1)+' '+sy(v).toFixed(1)).join(' ');
  const gid = 'g'+Math.random().toString(36).slice(2,7);
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".22"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><path d="${line} L${w} ${h} L0 ${h} Z" fill="url(#${gid})"/><path d="${line}" fill="none" stroke="${color}" stroke-width="1.8" vector-effect="non-scaling-stroke"/><circle cx="${sx(vals.length-1)}" cy="${sy(vals.at(-1))}" r="2.6" fill="${color}"/></svg>`;
}
/* Barras empilhadas por dia: segs = [{k, nome, cor}] ; rows = [{lab, sub, vals:{k:v}, hl}] */
function stackedBars(rows, segs, {h=210, W=640}={}){
  const pl=46, pr=8, pt=10, pb=34, iw=W-pl-pr, ih=h-pt-pb;
  const tot = rows.map(r => segs.reduce((a,s)=>a+(r.vals[s.k]||0),0));
  const ticks = niceTicks(0, Math.max(...tot)); const ymax = ticks.at(-1);
  const bw = iw/rows.length; const barW = Math.min(26, bw*0.62);
  const y = v => pt + ih - v/ymax*ih;
  let g = `<g class="grid">${ticks.map(t=>`<line x1="${pl}" x2="${W-pr}" y1="${y(t)}" y2="${y(t)}"/>`).join('')}</g>`;
  g += ticks.map(t=>`<text x="${pl-8}" y="${y(t)+3.5}" text-anchor="end">${t?brlK(t).replace('R$ ',''):'0'}</text>`).join('');
  rows.forEach((r,i) => {
    const cx = pl + bw*i + bw/2; let acc = 0; const parts=[];
    segs.forEach((s,si) => { const v = r.vals[s.k]||0; if (!v) return; const y0=y(acc), y1=y(acc+v); acc+=v; const top = segs.slice(si+1).every(s2=>!(r.vals[s2.k])); const hh=Math.max(0,y0-y1-(acc>v?2:0));
      parts.push(top ? `<path d="M${cx-barW/2} ${y0-(acc>v?2:0)} V${y1+4} Q${cx-barW/2} ${y1} ${cx-barW/2+4} ${y1} H${cx+barW/2-4} Q${cx+barW/2} ${y1} ${cx+barW/2} ${y1+4} V${y0-(acc>v?2:0)} Z" fill="${s.cor}"/>` : `<rect x="${cx-barW/2}" y="${y1}" width="${barW}" height="${hh}" fill="${s.cor}"/>`); });
    const tipH = `<b>${r.full||r.lab}</b>` + segs.map(s=>tipRow(s.cor, s.nome, brl(r.vals[s.k]||0,0))).join('') + `<div style="margin-top:4px;padding-top:4px;border-top:1px solid rgba(127,127,127,.3)"><span>Total</span><strong>${brl(tot[i],0)}</strong></div>`;
    g += `<g data-tip="${esc(tipH)}"><rect x="${pl+bw*i}" y="${pt}" width="${bw}" height="${ih}" fill="transparent"/>${r.hl?`<rect x="${pl+bw*i+2}" y="${pt}" width="${bw-4}" height="${ih}" rx="6" fill="var(--track)"/>`:''}${parts.join('')}</g>`;
    g += `<text x="${cx}" y="${h-pb+15}" text-anchor="middle" style="${r.hl?'fill:var(--ink);font-weight:800':''}">${r.lab}</text><text x="${cx}" y="${h-pb+28}" text-anchor="middle" style="font-size:9.5px">${r.sub||''}</text>`;
  });
  return `<div class="chart"><svg viewBox="0 0 ${W} ${h}" role="img" aria-label="Gráfico de barras">${g}</svg></div>`;
}
/* Barras agrupadas (receita x despesa por mês) */
function groupedBars(rows, segs, {h=220, W=640, fmt=v=>brl(v,0), tfmt=t=>brlK(t).replace('R$ ','')}={}){
  const pl=46, pr=8, pt=10, pb=24, iw=W-pl-pr, ih=h-pt-pb;
  const max = Math.max(...rows.flatMap(r=>segs.map(s=>r[s.k])));
  const ticks = niceTicks(0, max); const ymax = ticks.at(-1); const y = v => pt+ih-v/ymax*ih;
  const bw = iw/rows.length; const barW = Math.min(22, bw*0.3);
  let g = `<g class="grid">${ticks.map(t=>`<line x1="${pl}" x2="${W-pr}" y1="${y(t)}" y2="${y(t)}"/>`).join('')}</g>`;
  g += ticks.map(t=>`<text x="${pl-8}" y="${y(t)+3.5}" text-anchor="end">${t?tfmt(t):'0'}</text>`).join('');
  rows.forEach((r,i)=>{ const cx = pl+bw*i+bw/2; const n=segs.length; let bars='';
    segs.forEach((s,si)=>{ const x = cx - (n*barW + (n-1)*2)/2 + si*(barW+2); const y1=y(r[s.k]), y0=y(0);
      bars += `<path d="M${x} ${y0} V${y1+4} Q${x} ${y1} ${x+4} ${y1} H${x+barW-4} Q${x+barW} ${y1} ${x+barW} ${y1+4} V${y0} Z" fill="${s.cor}"/>`; });
    const tipH = `<b>${r.full||r.lab}</b>`+segs.map(s=>tipRow(s.cor,s.nome,fmt(r[s.k]))).join('') + (r.res!==undefined?`<div style="margin-top:4px;padding-top:4px;border-top:1px solid rgba(127,127,127,.3)"><span>Resultado</span><strong>${brl(r.res,0)}</strong></div>`:'');
    g += `<g data-tip="${esc(tipH)}"><rect x="${pl+bw*i}" y="${pt}" width="${bw}" height="${ih}" fill="transparent"/>${bars}</g><text x="${cx}" y="${h-6}" text-anchor="middle" style="${r.hl?'fill:var(--ink);font-weight:800':''}">${r.lab}</text>`; });
  return `<div class="chart"><svg viewBox="0 0 ${W} ${h}" role="img" aria-label="Gráfico de barras agrupadas">${g}</svg></div>`;
}
/* Linha de saldo projetado com faixa de saldo mínimo */
function cashLine(pts, minimo, {h=300, id='cl'}={}){
  const W=1000, pl=54, pr=14, pt=14, pb=28, iw=W-pl-pr, ih=h-pt-pb;
  const vals = pts.map(p=>p.s); const lo = Math.min(0, ...vals, minimo), hi = Math.max(...vals, minimo);
  const ticks = niceTicks(lo, hi, 5); const y0v = ticks[0], y1v = ticks.at(-1);
  const x = i => pl + i/(pts.length-1)*iw, y = v => pt + ih - (v-y0v)/(y1v-y0v)*ih;
  const line = pts.map((p,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(p.s).toFixed(1)).join(' ');
  let g = `<defs><linearGradient id="${id}g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--blue)" stop-opacity=".2"/><stop offset="1" stop-color="var(--blue)" stop-opacity="0"/></linearGradient><clipPath id="${id}neg"><rect x="${pl}" y="${y(0)}" width="${iw}" height="${Math.max(0,pt+ih-y(0))}"/></clipPath></defs>`;
  g += `<g class="grid">${ticks.map(t=>`<line x1="${pl}" x2="${W-pr}" y1="${y(t)}" y2="${y(t)}"/>`).join('')}</g>`;
  g += ticks.map(t=>`<text x="${pl-8}" y="${y(t)+3.5}" text-anchor="end">${brlK(t).replace('R$ ','')}</text>`).join('');
  if (lo < 0) g += `<rect x="${pl}" y="${y(0)}" width="${iw}" height="${pt+ih-y(0)}" fill="var(--red-soft)"/><line x1="${pl}" x2="${W-pr}" y1="${y(0)}" y2="${y(0)}" stroke="var(--red)" stroke-width="1" opacity=".5"/>`;
  g += `<path d="${line} L${x(pts.length-1)} ${y(y0v)} L${x(0)} ${y(y0v)} Z" fill="url(#${id}g)"/>`;
  g += `<line x1="${pl}" x2="${W-pr}" y1="${y(minimo)}" y2="${y(minimo)}" stroke="var(--amber)" stroke-width="1.5" stroke-dasharray="5 4"/><text x="${W-pr}" y="${y(minimo)-6}" text-anchor="end" style="fill:var(--amber);font-weight:800">Saldo mínimo ${brlK(minimo)}</text>`;
  g += `<path d="${line}" fill="none" stroke="var(--blue)" stroke-width="2.2" stroke-linejoin="round"/>`;
  g += `<path d="${line}" fill="none" stroke="var(--red)" stroke-width="2.4" clip-path="url(#${id}neg)"/>`;
  [0,15,30,45,60,75,90].forEach(i=>{ g += `<text x="${x(i)}" y="${h-8}" text-anchor="middle">${i===0?'Hoje':dmy(pts[i].d)}</text>`; });
  const minP = pts.reduce((a,p)=>p.s<a.s?p:a, pts[0]);
  g += `<circle cx="${x(minP.i)}" cy="${y(minP.s)}" r="5" fill="${minP.s<0?'var(--red)':'var(--amber)'}" stroke="var(--surface)" stroke-width="2"/><text x="${x(minP.i)}" y="${y(minP.s)+18}" text-anchor="middle" style="fill:var(--ink);font-weight:800">Menor saldo ${brlK(minP.s)}</text>`;
  g += `<g class="xh" style="display:none"><line y1="${pt}" y2="${pt+ih}" stroke="var(--ink-2)" stroke-width="1" stroke-dasharray="3 3"/><circle r="5" fill="var(--blue)" stroke="var(--surface)" stroke-width="2"/></g>`;
  g += `<rect class="hit" x="${pl}" y="${pt}" width="${iw}" height="${ih}" fill="transparent"/>`;
  return `<div class="chart" id="${id}" data-pl="${pl}" data-iw="${iw}" data-w="${W}" data-pt="${pt}" data-ih="${ih}" data-lo="${y0v}" data-hi="${y1v}"><svg viewBox="0 0 ${W} ${h}" role="img" aria-label="Saldo projetado para 90 dias">${g}</svg></div>`;
}
function bindCashLine(id, pts, minimo){
  const el = document.getElementById(id); if (!el) return; const svg = $('svg', el), xh = $('.xh', el), hit = $('.hit', el);
  const {pl, iw, w, pt, ih, lo, hi} = Object.fromEntries(Object.entries(el.dataset).map(([k,v])=>[k,+v]));
  hit.addEventListener('mousemove', e => { const r = svg.getBoundingClientRect(); const sx = (e.clientX - r.left) / r.width * w; const i = Math.max(0, Math.min(pts.length-1, Math.round((sx-pl)/iw*(pts.length-1)))); const p = pts[i];
    const X = pl + i/(pts.length-1)*iw, Y = pt + ih - (p.s-lo)/(hi-lo)*ih; xh.style.display=''; $('line', xh).setAttribute('x1',X); $('line', xh).setAttribute('x2',X); $('circle', xh).setAttribute('cx',X); $('circle', xh).setAttribute('cy',Y); $('circle', xh).setAttribute('fill', p.s<0?'var(--red)':'var(--blue)');
    showTip(e, `<b>${WD[p.d.getDay()]}, ${dmy(p.d)}${i===0?' · hoje':''}</b>${tipRow('var(--green)','Entradas',brl(p.ent,0))}${tipRow('var(--red)','Saídas',brl(p.sai,0))}<div style="margin-top:4px;padding-top:4px;border-top:1px solid rgba(127,127,127,.3)"><span>Saldo</span><strong>${brl(p.s,0)}</strong></div>${p.s<minimo?`<div style="color:${p.s<0?'#FCA5A5':'#FCD34D'};margin-top:4px">${p.s<0?'Caixa negativo':'Abaixo do mínimo'}</div>`:''}`); });
  hit.addEventListener('mouseleave', () => { xh.style.display='none'; hideTip(); });
}
function donut(items, {centro='', sub=''}={}){
  const tot = items.reduce((a,b)=>a+b.v,0); const r=50, circ=2*Math.PI*r; let off=0;
  const segs = items.map(it => { const len = it.v/tot*circ; const gap = items.length>1?2:0; const s = `<circle cx="75" cy="75" r="${r}" fill="none" stroke="${it.cor}" stroke-width="24" stroke-dasharray="${Math.max(0,len-gap)} ${circ}" stroke-dashoffset="${-off}" data-tip="${esc(`<b>${it.n}</b>${tipRow(it.cor, pct(it.v/tot*100,1), brl(it.v,0))}`)}"/>`; off += len; return s; }).join('');
  const rank = items.map(it => `<div class="rk" style="--c:${it.cor}"><i></i><div class="nm">${esc(it.n)}<small>${pct(it.v/tot*100,1)}</small></div><div class="bar"><b style="width:${it.v/items[0].v*100}%"></b></div><div class="vl num">${brl(it.v,0)}</div></div>`).join('');
  return `<div class="cat-wrap"><div class="donut"><svg viewBox="0 0 150 150">${segs}</svg><div class="donut-c"><small>${sub}</small><b class="num">${centro||brl(tot,0)}</b><span>${items.length} categorias</span></div></div><div class="rank">${rank}</div></div>`;
}
function scatter(pts, {h=300}={}){
  const W=640, pl=54, pr=16, pt=14, pb=36, iw=W-pl-pr, ih=h-pt-pb;
  const xt = niceTicks(0, Math.max(...pts.map(p=>p.x))*1.05, 5), yt = niceTicks(0, Math.max(...pts.map(p=>p.y))*1.08, 4);
  const x = v => pl + v/xt.at(-1)*iw, y = v => pt + ih - v/yt.at(-1)*ih;
  let g = `<g class="grid">${yt.map(t=>`<line x1="${pl}" x2="${W-pr}" y1="${y(t)}" y2="${y(t)}"/>`).join('')}</g>`;
  g += yt.map(t=>`<text x="${pl-8}" y="${y(t)+3.5}" text-anchor="end">${t?brlK(t).replace('R$ ',''):'0'}</text>`).join('');
  g += xt.map(t=>`<text x="${x(t)}" y="${pt+ih+16}" text-anchor="middle">${t}h</text>`).join('');
  g += `<text x="${pl+iw/2}" y="${h-4}" text-anchor="middle" style="font-weight:700">Horas dedicadas por mês</text>`;
  const xm = xt.at(-1); const be = v => v*CUSTO_HORA, be2 = v => v*CUSTO_HORA/0.6;
  g += `<path d="M${x(0)} ${y(0)} L${x(xm)} ${y(Math.min(be(xm), yt.at(-1)))}" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="5 4"/>`;
  g += `<path d="M${x(0)} ${y(0)} L${x(Math.min(xm, yt.at(-1)/(CUSTO_HORA/0.6)))} ${y(Math.min(be2(xm), yt.at(-1)))}" stroke="var(--green)" stroke-width="1.5" stroke-dasharray="2 4"/>`;
  pts.forEach(p => { g += `<g data-tip="${esc(p.tip)}"><circle cx="${x(p.x)}" cy="${y(p.y)}" r="14" fill="transparent"/><circle cx="${x(p.x)}" cy="${y(p.y)}" r="7" fill="${p.cor}" stroke="var(--surface)" stroke-width="2"/></g>`; if (p.lab) g += `<text x="${x(p.x)+11}" y="${y(p.y)+4}" style="fill:var(--ink-2);font-weight:700">${p.lab}</text>`; });
  return `<div class="chart"><svg viewBox="0 0 ${W} ${h}" role="img" aria-label="Dispersão de horas por honorário">${g}</svg></div>`;
}
function hbars(items, {max, fmt=v=>brl(v,0)}={}){
  const m = max || Math.max(...items.map(i=>i.v));
  return `<div style="display:flex;flex-direction:column;gap:10px">${items.map(it=>`<div data-tip="${esc(`<b>${it.n}</b>${tipRow(it.cor, it.q, fmt(it.v))}`)}"><div class="row" style="justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:5px"><span style="color:var(--ink-2)">${it.n}</span><span class="num">${fmt(it.v)} <span style="color:var(--muted);font-weight:600">· ${it.q}</span></span></div><div class="prog" style="height:10px"><i style="width:${it.v/m*100}%;--c:${it.cor}"></i></div></div>`).join('')}</div>`;
}

/* ================= Toast, drawer, palette ================= */
function toast(msg, undo){
  const t = document.createElement('div'); t.className='toast'; t.innerHTML = ic('check',2.5) + `<span>${msg}</span>` + (undo?'<button type="button">Desfazer</button>':'');
  if (undo) $('button', t).onclick = () => { undo(); t.remove(); };
  $('#toasts').appendChild(t); setTimeout(()=>t.remove(), 4200);
}
function openDrawer(title, body, foot=''){
  $('#dr-title').textContent = title; $('#dr-body').innerHTML = body; $('#dr-foot').innerHTML = foot; $('#dr-foot').hidden = !foot;
  $('#drawer').classList.add('on'); $('#drawer').setAttribute('aria-hidden','false'); $('#scrim').classList.add('on'); bindTips($('#drawer'));
}
function closeDrawer(){ $('#drawer').classList.remove('on'); $('#drawer').setAttribute('aria-hidden','true'); $('#scrim').classList.remove('on'); }
</script>
