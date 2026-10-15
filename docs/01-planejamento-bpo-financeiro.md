# Planejamento: Sistema para Consultores de BPO Financeiro

> **Etapa 1: Pesquisa, dores e desenho funcional.**
> Próximas etapas: (2) arquitetura de informação e wireframes → (3) protótipo HTML navegável → (4) definição técnica.

---

## Sumário

1. [Resumo executivo](#1-resumo-executivo)
2. [O que é BPO financeiro e o que o consultor faz](#2-o-que-é-bpo-financeiro-e-o-que-o-consultor-faz)
3. [Quem usa o sistema (personas)](#3-quem-usa-o-sistema-personas)
4. [Mapa de dores do consultor](#4-mapa-de-dores-do-consultor)
5. [Princípios de produto](#5-princípios-de-produto)
6. [Visão geral dos módulos](#6-visão-geral-dos-módulos)
7. [Funcionalidades detalhadas](#7-funcionalidades-detalhadas)
8. [Fluxos principais de ponta a ponta](#8-fluxos-principais-de-ponta-a-ponta)
9. [Modelo de dados conceitual](#9-modelo-de-dados-conceitual)
10. [Integrações](#10-integrações)
11. [Diretrizes de design e UX](#11-diretrizes-de-design-e-ux)
12. [Mapa de telas para o protótipo HTML](#12-mapa-de-telas-para-o-protótipo-html)
13. [Roadmap: MVP, V2 e V3](#13-roadmap-mvp-v2-e-v3)
14. [Métricas de sucesso](#14-métricas-de-sucesso)
15. [Riscos e cuidados](#15-riscos-e-cuidados)
16. [Fontes consultadas](#16-fontes-consultadas)

---

## 1. Resumo executivo

O consultor de BPO financeiro **opera o financeiro de várias empresas ao mesmo tempo**. A maioria das ferramentas do mercado (Conta Azul, Omie, Nibo) é um **ERP pensado para uma empresa**. Algumas têm versões para BPO, mas a lógica continua sendo "entrar em um cliente por vez". O consultor acaba trocando de conta o dia inteiro e controlando o que falta fazer em planilhas, no WhatsApp e na memória.

**Tese do produto:** o sistema não deve ser "mais um ERP". Deve ser a **torre de controle da carteira**, o lugar onde o consultor:

1. **Vê de uma vez o que precisa ser feito hoje em todos os clientes** (pagamentos, conciliações, pendências, aprovações).
2. **Recebe documentos e aprovações do cliente sem perseguir ninguém no WhatsApp** (portal e app do cliente com cobrança automática).
3. **Executa as rotinas repetitivas com o máximo de automação** (extrato via Open Finance, conciliação sugerida, DDA, regras de categorização).
4. **Entrega valor visível ao cliente** (relatórios e fechamento mensal com um clique e um link bonito).
5. **Sabe se o próprio negócio dá lucro** (horas e rentabilidade por cliente, controle de escopo e SLA).

O diferencial está em três coisas que o mercado resolve mal: a **visão multi-cliente orientada a tarefas**, a **comunicação estruturada com o cliente** e a **gestão do próprio BPO** (rentabilidade e escopo).

---

## 2. O que é BPO financeiro e o que o consultor faz

**BPO financeiro** (*Business Process Outsourcing*) é a terceirização, total ou parcial, da rotina financeira de uma empresa. O prestador executa a operação, mas **o dono da empresa continua decidindo e aprovando**. O consultor prepara os pagamentos e o cliente dá o "clique final" ou define alçadas.

Clientes típicos: pequenas e médias empresas (comércio, serviços, clínicas, restaurantes, agências) sem estrutura financeira interna. O mercado cobra de **R\$ 500 a R\$ 5.000 por cliente/mês**, conforme volume de lançamentos, número de contas bancárias e complexidade.

### 2.1 Escopo típico de serviço

| Área | Atividades |
|---|---|
| **Contas a pagar** | Receber boletos/NFs, cadastrar fornecedores, lançar, agendar, montar lote para aprovação, pagar ou preparar o pagamento, anexar comprovante |
| **Contas a receber** | Emitir boletos/Pix/NFS-e, acompanhar recebimentos, dar baixa, régua de cobrança de inadimplentes |
| **Conciliação bancária** | Importar extratos (OFX/Open Finance), casar com lançamentos, investigar divergências. Idealmente **diária** |
| **Conciliação de cartões e adquirentes** | Casar vendas em maquininha (Stone, Cielo, Rede…) com o que caiu na conta, conferir taxas e antecipações |
| **Fluxo de caixa** | Realizado e projetado (30/60/90 dias), alerta de caixa negativo |
| **Relatórios gerenciais** | DRE gerencial, fluxo de caixa, contas em aberto, indicadores |
| **Fechamento mensal** | Conferir que tudo foi conciliado, enviar documentação para a contabilidade, gerar relatório e fazer reunião com o sócio |
| **Interface com a contabilidade** | Enviar extratos, comprovantes e NFs organizados ao contador |
| **Extras (cobrados à parte)** | Folha operacional, gestão de adiantamentos e reembolsos, orçamento, consultoria estratégica |

### 2.2 Ritmo de trabalho

| Frequência | O que acontece |
|---|---|
| **Diário** | Conciliar o dia anterior, verificar vencimentos do dia, montar e enviar lote de pagamentos, responder dúvidas, cobrar documentos |
| **Semanal** | Revisar o fluxo de caixa projetado, cobrar inadimplentes, conferir pendências antigas |
| **Mensal** | Fechamento: conciliação 100%, relatórios, envio à contabilidade, reunião com o cliente |
| **Eventual** | Onboarding de novo cliente, mudança de banco, auditoria, renegociação de dívida |

Um consultor solo costuma atender **de 5 a 20 clientes**. Um escritório com equipe atende **de 30 a 150+**. Na escala de dezenas de clientes, **o problema deixa de ser técnico e passa a ser organizacional**.

---

## 3. Quem usa o sistema (personas)

### P1. Consultor solo ("Ana", 8 a 15 clientes)
- Ex-analista financeira que abriu o próprio BPO.
- Faz tudo sozinha: operação, comercial e atendimento.
- **Dor maior:** sobrecarga, esquecer coisas, cliente que manda tudo pelo WhatsApp a qualquer hora.
- **Quer:** saber o que fazer hoje, parar de perseguir documento e parecer profissional para o cliente.

### P2. Gestor de escritório de BPO ("Ricardo", equipe de 4 a 10 analistas, 60+ clientes)
- Pode ser um escritório contábil que adicionou o BPO como serviço.
- **Dor maior:** falta de visibilidade sobre a equipe ("quem está atrasado?"), clientes que dão prejuízo, padronização.
- **Quer:** painel da operação, distribuição de carteira, SLA, rentabilidade.

### P3. Analista operacional ("Júlia", 10 a 20 clientes atribuídos)
- Executa a rotina diária.
- **Quer:** fila de trabalho clara, atalhos, conciliação rápida, checklists.

### P4. Cliente final ("Seu Marcos", dono de restaurante)
- Não é usuário de sistema e usa o celular.
- **Quer:** aprovar pagamentos rápido, mandar foto de boleto, ver "como está meu caixa" em linguagem simples.
- Precisa de uma experiência **mobile-first e extremamente simples**. Se for complicado, ele volta para o WhatsApp.

---

## 4. Mapa de dores do consultor

As dores abaixo vêm da pesquisa (blogs de mercado, materiais do CFC, fornecedores de software) e da lógica operacional do serviço. Estão priorizadas por **frequência × impacto**.

| # | Dor | Sintoma no dia a dia | Impacto | Prioridade |
|---|---|---|---|---|
| D1 | **Documentos e informações chegam atrasados, incompletos ou por canais dispersos** | Boleto na foto do WhatsApp, NF no e-mail, "paga aquele do fornecedor X" por áudio | Atraso, multa e juros para o cliente, retrabalho, culpa recai no BPO | 🔴 Crítica |
| D2 | **Trocar de sistema e conta para cada cliente** | 20 logins (ERP do cliente, internet banking, planilha) | Perda de tempo, erro de lançar no cliente errado | 🔴 Crítica |
| D3 | **Não ter visão consolidada do que vence ou está pendente em todos os clientes** | Controle em planilha paralela ou de memória | Pagamento esquecido = cliente perdido | 🔴 Crítica |
| D4 | **Conciliação bancária manual e demorada** | Importar OFX, casar linha a linha, lançamentos sem descrição clara | Maior consumidor de horas, fechamento atrasa | 🔴 Crítica |
| D5 | **Fluxo de aprovação de pagamentos informal** | "Pode pagar?" no WhatsApp e o "ok" se perde | Risco jurídico e de fraude, sem trilha de auditoria | 🟠 Alta |
| D6 | **Escopo indefinido / demandas fora do contrato** | Cliente pede "só uma planilhinha", reconciliar 2 anos atrás… | Margem corroída, equipe sem previsibilidade | 🟠 Alta |
| D7 | **Não sabe quanto tempo gasta nem quanto lucra por cliente** | Preço chutado, clientes "pesados" pagando o mesmo que os leves | Contratos deficitários sem perceber | 🟠 Alta |
| D8 | **Relatórios mensais trabalhosos e pouco valorizados** | Montar DRE no Excel, colar gráfico em PDF | Horas perdidas; cliente não enxerga valor e cancela | 🟠 Alta |
| D9 | **Falta de padronização entre clientes e analistas** | Cada cliente com plano de contas, categorias e rotina diferentes | Difícil delegar, onboarding de analista lento | 🟡 Média |
| D10 | **Urgências e interrupções constantes** | "Preciso pagar isso agora!" às 17h50 | Quebra de foco, erros | 🟡 Média |
| D11 | **Onboarding de cliente novo é lento** | Coletar acessos, histórico, cadastros, saldos iniciais | Semanas até o cliente "rodar" | 🟡 Média |
| D12 | **Conciliação de cartões e adquirentes** | Taxas, antecipações e parcelas difíceis de conferir | Cliente perde dinheiro em taxas sem saber | 🟡 Média |
| D13 | **Dependência de pessoas (bus factor)** | Analista sai e leva o conhecimento do cliente | Qualidade cai, risco de churn | 🟡 Média |
| D14 | **Segurança e LGPD** | Senhas de banco em planilha, documentos em grupos de WhatsApp | Risco legal e reputacional | 🟡 Média |

> **Leitura principal:** as dores D1, D2, D3 e D5 são de **coordenação e comunicação**, não de contabilidade. É aí que um sistema novo ganha do ERP tradicional.

---

## 5. Princípios de produto

1. **Carteira primeiro, cliente depois.** A tela inicial é sempre a visão consolidada. Entrar em um cliente é um filtro, não uma troca de contexto.
2. **Tudo vira tarefa com prazo e dono.** Pagamento, documento pendente, conciliação, fechamento: tudo aparece numa fila única priorizada.
3. **O cliente faz o mínimo, e faz pelo celular.** Aprovar = 1 toque. Enviar documento = tirar foto. Nada de cadastro complexo.
4. **Automatizar o repetitivo e deixar o humano decidir.** O sistema sugere (conciliação, categoria, vencimento extraído do boleto) e o consultor confirma.
5. **Rastro de tudo.** Toda aprovação, alteração e documento tem histórico (quem, quando, de onde).
6. **Valor visível.** O trabalho do BPO precisa aparecer para o cliente (relatórios bonitos, resumo mensal, "o que fizemos por você").
7. **Integrar, não substituir à força.** Muitos clientes já usam um ERP. O sistema pode ser o operacional principal ou uma camada de controle sobre ERPs existentes (V2/V3).

---

## 6. Visão geral dos módulos

```
┌──────────────────────────────────────────────────────────────────────┐
│                       TORRE DE CONTROLE (Home)                        │
│  Fila do dia · Alertas · Saúde da carteira · Aprovações aguardando   │
└──────────────────────────────────────────────────────────────────────┘
       │               │                 │                 │
┌──────▼─────┐  ┌──────▼──────┐  ┌───────▼──────┐  ┌───────▼───────┐
│ OPERAÇÃO   │  │ COMUNICAÇÃO │  │ ENTREGA      │  │ GESTÃO DO BPO │
│ FINANCEIRA │  │ C/ CLIENTE  │  │ DE VALOR     │  │               │
├────────────┤  ├─────────────┤  ├──────────────┤  ├───────────────┤
│ A pagar    │  │ Portal/App  │  │ Relatórios   │  │ Rotinas/SLA   │
│ A receber  │  │ Solicitações│  │ Fechamento   │  │ Equipe        │
│ Conciliação│  │ Aprovações  │  │ Dashboard    │  │ Horas         │
│ Fluxo caixa│  │ Inbox docs  │  │  do cliente  │  │ Rentabilidade │
│ Cartões    │  │ Mensagens   │  │ Envio contab.│  │ Contratos     │
└────────────┘  └─────────────┘  └──────────────┘  └───────────────┘
       │               │                 │                 │
┌──────▼───────────────▼─────────────────▼─────────────────▼──────────┐
│ BASE: Clientes · Cofre de acessos · Plano de contas modelo · Regras  │
│ de automação · Integrações (Open Finance, DDA, NFS-e, ERPs, WhatsApp)│
└──────────────────────────────────────────────────────────────────────┘
```

| Módulo | Dores que resolve |
|---|---|
| M1. Torre de Controle | D2, D3, D10 |
| M2. Central de Documentos (Inbox inteligente) | D1, D14 |
| M3. Contas a Pagar + Fluxo de Aprovação | D3, D5 |
| M4. Contas a Receber + Cobrança | D3 |
| M5. Conciliação Bancária Inteligente | D4 |
| M6. Conciliação de Cartões | D12 |
| M7. Fluxo de Caixa e Projeções | D3, D8 |
| M8. Portal e App do Cliente | D1, D5, D8 |
| M9. Fechamento Mensal Guiado | D8, D9 |
| M10. Relatórios e Dashboard do Cliente | D8 |
| M11. Rotinas, Checklists e SLA | D6, D9, D13 |
| M12. Gestão de Equipe | D9, D13 |
| M13. Horas e Rentabilidade por Cliente | D6, D7 |
| M14. Onboarding de Cliente | D11 |
| M15. Cofre de Acessos e Segurança | D14 |
| M16. Base de Conhecimento do Cliente | D13 |

---

## 7. Funcionalidades detalhadas

Formato de cada funcionalidade: **Problema → Como funciona → Regras/detalhes → Prioridade**.
Prioridade: **MVP** (primeira versão), **V2**, **V3**.

---

### M1. Torre de Controle (Home multi-cliente) — MVP

**Problema:** o consultor não tem um lugar único que diga "o que preciso fazer hoje, em todos os clientes".

**Como funciona:**
- **Faixa de KPIs no topo:** a vencer hoje (R\$ e quantidade), vencidos, aguardando aprovação do cliente, documentos pendentes, contas não conciliadas, fechamentos do mês em andamento.
- **Fila do dia (componente central):** lista única de tarefas de todos os clientes, ordenada por **urgência**:
  1. Pagamentos que vencem hoje e já estão aprovados → "pagar agora"
  2. Pagamentos que vencem hoje sem aprovação → "cobrar aprovação"
  3. Documentos solicitados e vencidos
  4. Conciliações atrasadas (> X dias sem conciliar)
  5. Tarefas de rotina do dia (checklists)
- Cada item mostra: avatar/cor do cliente, tipo, valor, prazo, responsável e **ação direta** (botão "Aprovar lote", "Cobrar", "Conciliar").
- **Mapa de saúde da carteira:** cards ou tabela com cada cliente e um semáforo (🟢 em dia, 🟡 atenção, 🔴 crítico), calculado a partir de conciliação atrasada, pendências e caixa projetado negativo.
- **Alertas inteligentes:** "Cliente X terá saldo negativo em 6 dias", "Fornecedor Y com valor 40% acima da média", "Boleto duplicado detectado".
- **Seletor global de cliente** (atalho `Ctrl+K`): busca qualquer cliente, fornecedor, lançamento ou tela.

**Regras:**
- Visão filtrável por analista ("minha carteira" vs. "toda a operação").
- A urgência é calculada (vencimento, valor, SLA do cliente) e pode ser ordenada manualmente.

---

### M2. Central de Documentos (Inbox inteligente) — MVP

**Problema:** documentos chegam por WhatsApp, e-mail e foto, sem padrão, e se perdem.

**Como funciona:**
- **Canais de entrada, todos caindo numa caixa única:**
  - Upload pelo app/portal do cliente (foto ou PDF)
  - **E-mail dedicado por cliente** (ex.: `padaria-sol@docs.seubpo.com.br`), útil para fornecedores mandarem NF e boleto direto
  - WhatsApp (V2, via API oficial do WhatsApp Business)
  - **DDA**: boletos registrados no CNPJ do cliente aparecem automaticamente (via banco/Open Finance)
- **Leitura automática (OCR/IA):** extrai linha digitável, valor, vencimento, beneficiário, CNPJ e número da NF. Sugere fornecedor e categoria com base no histórico.
- **Triagem:** o consultor vê o documento à esquerda e o formulário pré-preenchido à direita e confirma com um clique. O resultado vira conta a pagar, conta a receber ou anexo.
- **Detecção de duplicidade:** mesmo código de barras ou mesmo valor, fornecedor e vencimento → alerta.
- **Vínculo automático:** comprovante de pagamento é anexado ao lançamento correspondente.

**Regras:**
- Todo documento tem status: *Recebido → Em triagem → Lançado → Arquivado*.
- Documentos são armazenados por cliente, competência e tipo, prontos para envio à contabilidade.

---

### M3. Contas a Pagar + Fluxo de Aprovação — MVP

**Problema:** aprovação informal pelo WhatsApp, sem rastro, e pagamentos esquecidos.

**Como funciona:**
- Lista de contas a pagar por cliente ou consolidada, com filtros (vencimento, status, fornecedor, categoria).
- **Status claros:** *Rascunho → Aguardando aprovação → Aprovado → Agendado → Pago → Conciliado*.
- **Lotes de pagamento:** o consultor seleciona os pagamentos da semana e envia **um único lote para aprovação**. O cliente recebe notificação (push, e-mail ou WhatsApp) com link.
- **Aprovação no app do cliente:** lista com fornecedor, valor, vencimento e anexo. O cliente pode aprovar tudo, aprovar individualmente, rejeitar com motivo ou pedir para adiar.
- **Alçadas configuráveis por cliente:**
  - "Abaixo de R\$ 500 e fornecedor recorrente → aprovação automática"
  - "Acima de R\$ 10.000 → precisa de 2 sócios"
- **Lembretes automáticos** se o lote não foi aprovado até X horas antes do vencimento.
- **Execução do pagamento:**
  - MVP: o sistema gera o lote (linha digitável, Pix copia-e-cola, arquivo CNAB de remessa) para o consultor ou o cliente pagar no banco.
  - V2/V3: pagamento via API bancária / Open Finance (iniciação de pagamento Pix), com o cliente autorizando no banco.
- **Recorrências:** aluguel, folha, impostos e assinaturas são gerados automaticamente todo mês.

**Regras:**
- Trilha de auditoria completa: quem lançou, quem aprovou, quando, IP/dispositivo.
- Pagamento sem aprovação só é permitido se a regra do cliente permitir (e fica registrado).

---

### M4. Contas a Receber + Cobrança — MVP (básico) / V2 (régua completa)

**Como funciona:**
- Lançamento de recebíveis (manual, importação ou integração com emissor de NF).
- Emissão de boleto e Pix com baixa automática (V2, via banco parceiro/API).
- **Régua de cobrança configurável:** lembrete D-3, aviso no dia, cobrança D+1, D+7, D+15 (e-mail e WhatsApp), com modelos de mensagem.
- Painel de inadimplência por cliente: aging (0–30, 31–60, 61–90, 90+).
- Emissão de NFS-e integrada (V2/V3, via provedor de emissão).

---

### M5. Conciliação Bancária Inteligente — MVP

**Problema:** é a tarefa que mais consome horas.

**Como funciona:**
- **Entrada de extratos:** Open Finance (automático, diário) ou importação OFX/CSV (fallback).
- **Tela em duas colunas:** extrato bancário à esquerda e lançamentos do sistema à direita, com as sugestões de casamento destacadas.
- **Motor de sugestão:**
  1. Match exato (valor + data + documento)
  2. Match aproximado (valor igual, data ± 3 dias, nome do favorecido parecido)
  3. Match 1:N e N:1 (um depósito que paga vários boletos, um pagamento dividido)
- **Regras de categorização:** "Toda saída com 'TARIFA' no histórico → Despesas bancárias". As regras são criadas com um clique a partir de uma conciliação manual ("sempre fazer isso").
- **Conciliar em massa:** aceitar todas as sugestões de alta confiança de uma vez.
- **Lançamento rápido:** se não há lançamento correspondente, cria-se um direto da linha do extrato.
- **Indicador por conta:** "conciliado até 12/10", "47 pendências".

**Regras:**
- Conciliação marca o lançamento como *Conciliado* e trava a edição (destravar exige permissão e fica registrado).
- Meta configurável: conciliação diária (D+1) como SLA padrão.

---

### M6. Conciliação de Cartões e Adquirentes — V2

- Importação de vendas das adquirentes (Stone, Cielo, Rede, GetNet, PagSeguro) via API ou arquivo.
- Agenda de recebíveis: o que vai cair, quando e em qual conta.
- Conferência de taxas contratadas vs. cobradas e alerta de divergência ("Cliente pagou 0,4% a mais de taxa este mês = R\$ 380").
- Controle de antecipações.
- **Valor:** o BPO mostra dinheiro recuperado, um argumento fortíssimo de retenção.

---

### M7. Fluxo de Caixa e Projeções — MVP

- **Realizado** (a partir do conciliado) e **projetado** (a pagar + a receber + recorrências).
- Visões diária, semanal e mensal, com gráfico de saldo projetado e linha de "saldo mínimo de segurança".
- **Alerta de caixa negativo** no M1 e opcionalmente para o cliente.
- **Simulador simples (V2):** "E se eu atrasar o pagamento X?", "E se o cliente Y não pagar?".
- Consolidação de múltiplas contas bancárias do mesmo cliente.

---

### M8. Portal e App do Cliente — MVP (web responsivo) / V2 (app nativo / PWA)

**Problema:** se for difícil, o cliente volta para o WhatsApp.

**Como funciona (mobile-first):**
- **Home do cliente:** saldo hoje, contas a pagar da semana e uma frase-resumo ("Seu caixa está saudável. Você tem R\$ 42 mil previstos para os próximos 30 dias.").
- **Aprovar pagamentos:** cards deslizáveis ou checklist, com "Aprovar todos" em destaque.
- **Enviar documento:** botão grande com a câmera. O cliente pode escrever uma observação opcional ("é do fornecedor de carne").
- **Pendências:** "Seu consultor precisa de: extrato do cartão Itaú de setembro" com botão para enviar.
- **Relatórios:** relatório do mês em formato visual (não planilha).
- **Mensagens:** chat contextual por assunto (ligado a um lançamento ou documento), substituindo o WhatsApp para temas de trabalho.
- **Login sem fricção:** link mágico por e-mail/WhatsApp ou código, sem senha complexa.

---

### M9. Fechamento Mensal Guiado — MVP

**Problema:** o fechamento é longo, depende de memória e varia por analista.

**Como funciona:**
- **Checklist de fechamento por cliente** (a partir de modelo padrão do escritório, customizável):
  - [ ] Todas as contas conciliadas até o último dia ✔ *(verificação automática)*
  - [ ] Nenhum lançamento sem categoria ✔ *(automática)*
  - [ ] Todos os pagamentos com comprovante ✔ *(automática)*
  - [ ] Extratos de cartão recebidos
  - [ ] Revisão de lançamentos atípicos
  - [ ] Relatório gerado e revisado
  - [ ] Pacote enviado à contabilidade
  - [ ] Reunião de resultados agendada
- Itens automáticos ficam verdes sozinhos; itens manuais são marcados pelo analista.
- **Painel de fechamento da carteira:** colunas estilo kanban (*Não iniciado → Em andamento → Aguardando cliente → Revisão → Concluído*) com todos os clientes.
- **Pacote para a contabilidade:** gera um ZIP/link com extratos, comprovantes, NFs e relatório de lançamentos, organizados por pasta, e envia ao contador cadastrado.
- **Travamento da competência** após concluído.

---

### M10. Relatórios e Dashboard do Cliente — MVP (essenciais) / V2 (personalização)

- **Relatórios essenciais:** DRE gerencial, fluxo de caixa, contas a pagar/receber em aberto, despesas por categoria, comparativo mês a mês, top fornecedores e clientes.
- **Relatório mensal "apresentável":** layout com a marca do BPO (white-label), gráficos, comentários do consultor ("Destaque do mês: custo com fornecedores caiu 12%") e exportação em PDF ou link compartilhável.
- **Indicadores:** margem, ponto de equilíbrio, prazo médio de pagamento/recebimento, ciclo de caixa.
- **Comentário assistido por IA (V2):** o sistema rascunha a análise do mês e o consultor edita.

---

### M11. Rotinas, Checklists e SLA — MVP

**Problema:** padronização, escopo e prazos dependem das pessoas.

**Como funciona:**
- **Modelos de rotina** (biblioteca do escritório): "Rotina diária padrão", "Rotina restaurante", "Fechamento mensal".
- Cada cliente recebe rotinas e o sistema **gera tarefas recorrentes** automaticamente (diária, semanal, mensal, em dia útil X).
- **SLA por cliente (definido no contrato):** ex. "conciliação em D+1", "pagamentos enviados para aprovação com 2 dias de antecedência", "relatório até dia 10".
- **Monitor de SLA:** % de cumprimento por cliente e por analista, com alerta antes de estourar.
- **Horário de corte:** solicitações urgentes depois do horário X são marcadas como "fora do SLA" (educa o cliente e protege a equipe).

---

### M12. Gestão de Equipe — V2

- Carteira por analista (atribuição de clientes) e substituto nas férias.
- Painel do gestor: carga de trabalho, tarefas atrasadas, SLA por pessoa.
- Permissões por perfil (Admin, Gestor, Analista, Cliente, Contador convidado).
- Revisão em dois níveis: o analista prepara e o sênior revisa (ex.: fechamento).

---

### M13. Horas e Rentabilidade por Cliente — V2 (diferencial forte)

**Problema:** o consultor não sabe quais clientes dão prejuízo.

**Como funciona:**
- **Apontamento de tempo leve:**
  - Automático: o tempo gasto em telas do cliente é estimado (opcional, com transparência para a equipe).
  - Manual: timer por tarefa.
- **Volume operacional:** lançamentos/mês, documentos, contas bancárias, conciliações por cliente.
- **Rentabilidade:** honorário − (horas × custo-hora do analista) = margem por cliente.
- **Matriz de clientes:** gráfico *esforço × receita* que destaca quem está subprecificado.
- **Sugestão de reajuste:** "Cliente X aumentou 60% o volume de lançamentos desde a contratação; sugerimos revisão de honorário".
- **Controle de escopo:** cada contrato lista os serviços incluídos. Uma demanda fora do escopo é registrada como "extra" (cobrável) e entra no relatório para o cliente.

---

### M14. Onboarding de Cliente — MVP (simplificado) / V2 (completo)

- **Wizard de entrada:** dados da empresa (busca automática por CNPJ), sócios e aprovadores, contas bancárias, contador, contrato e escopo, rotinas e SLA.
- **Checklist de implantação** com pedido automático de documentos ao cliente (contrato social, últimos extratos, lista de fornecedores, acessos).
- **Importação:** plano de contas (a partir de modelo por segmento), fornecedores, clientes e saldos iniciais (planilha modelo).
- **Plano de contas modelo por segmento** (comércio, serviços, restaurante, clínica), editável.

---

### M15. Cofre de Acessos e Segurança — MVP

- Cofre criptografado para credenciais de bancos, prefeitura (NFS-e), ERPs e portais, com acesso por permissão e registro de quem visualizou.
- **2FA obrigatório** para a equipe do BPO.
- Logs de auditoria em todas as ações sensíveis.
- Conformidade com a **LGPD**: termo de tratamento de dados, consentimento do cliente, retenção e exclusão.
- Preferir Open Finance (consentimento oficial) a guardar senha de banco sempre que possível.

---

### M16. Base de Conhecimento do Cliente — V2

- "Ficha viva" do cliente: particularidades ("paga fornecedor X sempre em dinheiro", "sócio só aprova à noite", "aluguel tem reajuste em março").
- Anotações fixadas que aparecem ao entrar no cliente.
- Reduz a dependência de uma pessoa específica (D13).

---

### Recursos transversais

| Recurso | Descrição | Prioridade |
|---|---|---|
| Busca global `Ctrl+K` | Cliente, fornecedor, valor, lançamento, tela | MVP |
| Notificações centralizadas | Sino com tudo que exige atenção + resumo diário por e-mail às 8h | MVP |
| Ações em massa | Aprovar, categorizar, conciliar e enviar vários itens de uma vez | MVP |
| Atalhos de teclado | Fluxo rápido para o analista "power user" | V2 |
| Modo escuro | Conforto em uso prolongado | MVP |
| White-label | Logo e cores do BPO no portal do cliente e nos relatórios | V2 |
| Assistente IA | "Quanto o cliente X gastou com fornecedores este ano?", rascunho de relatório, categorização | V2/V3 |

---

## 8. Fluxos principais de ponta a ponta

### Fluxo A: Do boleto ao pagamento conciliado

```
Cliente tira foto do boleto (app)  ─┐
Fornecedor manda por e-mail        ─┼─► Inbox (M2) ─► OCR extrai dados
DDA identifica boleto              ─┘                        │
                                                             ▼
                                   Consultor confirma (1 clique) ─► Conta a pagar (M3)
                                                             │
                              Entra no lote semanal ◄────────┘
                                         │
                      Cliente aprova no celular (M8) ── notificação
                                         │
                           Pagamento executado/agendado
                                         │
             Extrato chega via Open Finance (M5) ─► Match automático ─► Conciliado ✔
                                         │
                     Comprovante anexado ─► vai no pacote do fechamento (M9)
```

### Fluxo B: Dia típico da analista Júlia

1. **8h00:** abre a Torre de Controle: 14 itens na fila, 2 clientes em 🔴.
2. Concilia em massa o dia anterior dos 15 clientes (sugestões de alta confiança). Restam 9 itens manuais.
3. Tria a Inbox: 11 documentos novos, 9 lançados com 1 clique e 2 com dúvida (manda pergunta contextual ao cliente).
4. Monta os lotes de pagamento de quinta-feira e envia para aprovação.
5. **14h00:** lembrete automático para os clientes que não aprovaram.
6. **16h00:** executa os lotes aprovados e marca os comprovantes.
7. Fim do dia: SLA do dia 100%, nada esquecido.

### Fluxo C: Fechamento do mês

1. Dia 1: o sistema abre o checklist de fechamento de todos os clientes (kanban).
2. Itens automáticos validam conciliação, categorias e comprovantes.
3. Pendências do cliente viram solicitações automáticas no app dele.
4. O analista gera o relatório, escreve o comentário e o sênior revisa.
5. Pacote enviado à contabilidade e relatório publicado para o cliente.
6. Competência travada. Reunião de resultados agendada.

### Fluxo D: Onboarding de cliente novo

CNPJ → dados preenchidos automaticamente → aprovadores e contas → escolha de modelo (segmento, rotina, SLA) → convite ao cliente → cliente envia documentos e conecta bancos via Open Finance → importação de cadastros → primeira conciliação → cliente "rodando".

---

## 9. Modelo de dados conceitual

```
Escritório (BPO)
 ├── Usuários (equipe) ── Perfis/Permissões
 ├── Modelos (rotinas, checklists, planos de contas, mensagens)
 └── Clientes (empresas atendidas)
      ├── Contrato (honorário, escopo, SLA)
      ├── Pessoas do cliente (aprovadores, alçadas)
      ├── Contas bancárias ── Extratos ── Transações bancárias
      ├── Plano de contas / Categorias / Centros de custo
      ├── Fornecedores / Clientes do cliente
      ├── Lançamentos (a pagar / a receber)
      │     ├── Documentos anexos
      │     ├── Aprovações (lote, aprovador, data, IP)
      │     └── Conciliação (vínculo ↔ transação bancária)
      ├── Regras de automação (categorização, aprovação automática)
      ├── Tarefas (geradas por rotinas ou avulsas) ── Apontamento de horas
      ├── Fechamentos (competência, checklist, status)
      ├── Solicitações ao cliente (documentos/informações)
      ├── Mensagens (contextuais)
      ├── Credenciais (cofre)
      └── Notas / Base de conhecimento
```

Princípio técnico: **multi-tenant em dois níveis** (Escritório → Cliente). Todos os dados do cliente são isolados, mas as consultas consolidadas (Torre de Controle) atravessam a carteira do escritório.

---

## 10. Integrações

| Integração | Uso | Prioridade | Observação |
|---|---|---|---|
| **Open Finance (via agregador)** | Extratos e saldos automáticos | MVP | Agregadores como Pluggy, Belvo ou similares reduzem a complexidade |
| **Importação OFX/CSV** | Fallback de extratos | MVP | Essencial para bancos sem cobertura |
| **Consulta CNPJ** | Preencher cadastros (cliente, fornecedor) | MVP | APIs públicas ou pagas |
| **OCR / IA de documentos** | Ler boletos e NFs | MVP | Linha digitável pode ser validada por algoritmo |
| **E-mail de entrada** | Receber documentos por cliente | MVP | Endereço único por cliente |
| **DDA** | Boletos emitidos contra o CNPJ | V2 | Via banco/API bancária |
| **APIs bancárias / Pix** | Emitir cobranças, iniciar pagamentos | V2 | Bancos digitais PJ costumam ter API |
| **CNAB (remessa/retorno)** | Pagamentos em lote nos bancos tradicionais | V2 | |
| **WhatsApp Business API** | Notificações, aprovação, recebimento de docs | V2 | Usar API oficial; cuidado com fraudes de boleto |
| **Adquirentes** | Conciliação de cartões | V2 | Stone, Cielo, Rede, GetNet… |
| **Emissão de NFS-e** | Faturamento do cliente | V3 | Via provedor de emissão |
| **ERPs (Omie, Conta Azul, Bling…)** | Modo "camada de controle" sobre ERP existente | V3 | Sincronizar lançamentos |
| **Sistemas contábeis** | Exportar lançamentos para o contador | V2 | Layouts de importação dos sistemas contábeis mais usados |
| **Google Calendar** | Reuniões de fechamento | V3 | |

---

## 11. Diretrizes de design e UX

### 11.1 Personalidade visual
- **Confiável, calma e moderna.** Finanças geram ansiedade; o visual deve transmitir controle.
- Inspirações de qualidade: Linear (densidade e velocidade), Stripe Dashboard (clareza de dados), Notion (simplicidade), Nubank/Inter (linguagem do cliente final).

### 11.2 Sistema visual proposto (para a etapa do HTML)
- **Cor primária:** azul-petróleo ou índigo profundo (confiança). Acento esmeralda para valores positivos.
- **Semântica de cores consistente:** verde = ok/recebido, âmbar = atenção/vence em breve, vermelho = vencido/crítico, azul = informativo, roxo = aguardando cliente.
- **Cor por cliente:** cada cliente recebe uma cor ou avatar para reconhecimento rápido na fila consolidada.
- **Tipografia:** Inter ou similar; números em fonte tabular (alinhamento de valores).
- **Modo claro e escuro** desde o início.
- **Layout:** sidebar recolhível à esquerda (módulos), topo com seletor de cliente + busca `Ctrl+K` + notificações, conteúdo em cards com bastante respiro.

### 11.3 Princípios de UX
1. **Zero estado de "e agora?":** toda tela vazia diz o que fazer em seguida.
2. **Ação na linha:** aprovar, conciliar e cobrar sem abrir outra tela (hover actions, menus de contexto).
3. **Painel lateral (drawer) em vez de nova página** para detalhes de lançamento ou documento, mantendo o contexto.
4. **Feedback imediato e desfazer:** "12 lançamentos conciliados · Desfazer".
5. **Densidade ajustável:** confortável vs. compacta (analistas experientes preferem compacta).
6. **Cliente final ≠ consultor:** o app do cliente usa linguagem simples ("Você tem 3 contas para aprovar"), botões grandes e nenhum jargão contábil.
7. **Valores sempre formatados** (R\$ 1.234,56), datas relativas ("vence amanhã") com a data exata no hover.
8. **Acessibilidade:** contraste AA, cor nunca como único indicador (ícone + texto).

---

## 12. Mapa de telas para o protótipo HTML

Sequência sugerida para construir na próxima etapa (das mais impactantes para as complementares):

| # | Tela | Público | Por que priorizar |
|---|---|---|---|
| 1 | **Torre de Controle (Home)** | Consultor | Coração do produto e principal diferencial |
| 2 | **Inbox de Documentos (triagem com OCR)** | Consultor | Resolve a dor nº 1 e é muito visual |
| 3 | **Contas a Pagar + Lote de aprovação** | Consultor | Operação central |
| 4 | **Conciliação Bancária** | Consultor | Tela de maior uso em horas |
| 5 | **App do Cliente (mobile): home, aprovar, enviar doc** | Cliente | Mostra a experiência "sem WhatsApp" |
| 6 | **Visão do Cliente (dashboard + fluxo de caixa)** | Consultor | Contexto de um cliente |
| 7 | **Fechamento Mensal (kanban + checklist)** | Consultor | Padronização |
| 8 | **Relatório mensal do cliente** | Cliente | Entrega de valor |
| 9 | **Rentabilidade da carteira** | Gestor | Diferencial de negócio |
| 10 | **Onboarding de cliente (wizard)** | Consultor | Completa a jornada |
| 11 | **Configurações: rotinas, SLA, regras** | Gestor | Suporte |

Navegação principal (sidebar):
```
🏠 Torre de Controle
📥 Documentos            (badge: 11)
💸 A Pagar
💰 A Receber
🔁 Conciliação
📈 Fluxo de Caixa
✅ Fechamentos
📊 Relatórios
👥 Clientes
⏱ Rentabilidade         (V2)
⚙️ Configurações
```

---

## 13. Roadmap: MVP, V2 e V3

### MVP: "Nunca mais esquecer nada e parar de usar o WhatsApp para trabalho"
- M1 Torre de Controle
- M2 Inbox de Documentos (upload + e-mail + OCR)
- M3 Contas a Pagar com aprovação em lote e alçadas
- M4 Contas a Receber (básico)
- M5 Conciliação bancária (OFX + Open Finance, sugestões, regras)
- M7 Fluxo de caixa realizado e projetado
- M8 Portal do cliente web responsivo
- M9 Fechamento mensal com checklist
- M10 Relatórios essenciais + relatório mensal em PDF/link
- M11 Rotinas e tarefas recorrentes + SLA básico
- M14 Onboarding simplificado
- M15 Cofre, 2FA e auditoria

### V2: "Escalar a operação e provar valor"
- M6 Conciliação de cartões
- M12 Gestão de equipe completa
- M13 Horas e rentabilidade por cliente + controle de escopo
- M16 Base de conhecimento
- WhatsApp Business API, DDA, CNAB, régua de cobrança completa
- App PWA do cliente, white-label, assistente de IA para relatórios

### V3: "Plataforma"
- Pagamento via Open Finance / APIs bancárias
- Integração com ERPs (modo camada de controle)
- Emissão de NFS-e
- Benchmarks entre clientes do mesmo segmento (anonimizados)
- Marketplace de modelos (rotinas, planos de contas por segmento)

---

## 14. Métricas de sucesso

| Métrica | Meta de referência |
|---|---|
| Tempo médio de conciliação por cliente/mês | −50% vs. processo manual |
| % de lançamentos conciliados automaticamente | > 70% após 3 meses de uso |
| % de documentos recebidos fora do WhatsApp | > 80% |
| Tempo entre envio do lote e aprovação do cliente | < 24h |
| Pagamentos em atraso por responsabilidade do BPO | ~0 |
| Dias para concluir o fechamento mensal | até dia 5–10 útil |
| Clientes ativos por analista | +30–50% de capacidade |
| Churn de clientes do BPO | queda (valor visível via relatórios) |

---

## 15. Riscos e cuidados

| Risco | Mitigação |
|---|---|
| Cliente final não adota o portal/app | UX extremamente simples, login sem senha, notificações no WhatsApp com link direto |
| Cobertura do Open Finance incompleta | Fallback OFX/CSV sempre disponível |
| Responsabilidade sobre pagamentos | Aprovação explícita registrada; o BPO não paga sem trilha |
| Fraude de boleto | Validação de beneficiário/CNPJ vs. cadastro do fornecedor, alerta de mudança de dados bancários |
| Segurança e LGPD | Criptografia, 2FA, logs, contratos de tratamento de dados |
| Escopo do produto grande demais | MVP focado em coordenação (Torre + Inbox + Aprovação + Conciliação) |
| Concorrência com ERPs grandes | Posicionamento como ferramenta **do consultor** (multi-cliente), não como ERP do cliente |

---

## 16. Fontes consultadas

- [BPO Suite: O que um BPO Financeiro faz todos os dias?](https://www.bposuite.com.br/blog/o-que-um-bpo-financeiro-faz-todos-os-dias/)
- [BPO Suite: Operação de BPO Financeiro: processos, equipe e rotina](https://www.bposuite.com.br/blog/operacao-de-bpo-financeiro/)
- [Conta Azul: BPO Financeiro, como oferecer e quanto cobrar](https://contaazul.com/blog/parceiros/bpo-financeiro-como-comecar-qual-importancia-para-sua-empresa/)
- [Conta Azul Pro BPO](https://www.contaazul.com/bpo-financeiro/)
- [CFC/CRCTO: Consultoria e BPO Financeira (material)](https://www3.cfc.org.br/spw/PortalDocumentos/CRCTO/_ArquivoPortalTransparencia_e336275c-f02c-4335-9187-75f5e9ed7a3c.pdf)
- [CFC: O impacto do Open Finance na Contabilidade](https://cfc.org.br/noticias/o-impacto-do-open-finance-na-contabilidade-uma-revolucao-no-acompanhamento-e-consolidacao-de-informacoes-bancarias/)
- [ABES: BPO financeiro (governança e aprovação de pagamentos)](https://abes.org.br/?p=103166)
- [Jestor: Financial BPO with Omie, centralizar múltiplos clientes](https://blog.jestor.com/financial-bpo-with-omie-centralize-multiple-client-management/)
- [Contabilidade.com: BPO financeiro, como funciona](https://contabilidade.com/blog/bpo-financeiro/)
- [Qive: Fechamento financeiro](https://qive.com.br/blog/fechamento-financeiro) · [Qive: Oportunidades de Open Finance](https://qive.com.br/blog/oportunidades-open-finance)
- [Ledware: BPO financeiro para contadores](https://www.ledware.com.br/2026/06/19/bpo-financeiro-contadores-multiplicar-faturamento/)
- [Planilha de Fluxo: BPO financeiro (faixa de preço)](https://www.planilhadefluxo.com.br/para/bpo-financeiro)
- [Capital Aberto: Precificação e o paradoxo da eficiência](https://capitalaberto.com.br/opiniao/colunistas/bruno-strunz/2026/10/precificacao-e-o-paradoxo-da-eficiencia)
- [Playbpo: Desafios e oportunidades do BPO financeiro](https://playbpo.com.br/bpo-financeiro-quais-os-principais-desafios-e-oportunidades/)
- [Startupi: Entrevista com o CEO da Nibo](https://startupi.com.br/entrevista-com-o-ceo-da-nibo-sistema-simples-mas-nao-simplificado-para-gestao-financeira-e-de-clientes/)

> A maior parte das fontes é de fornecedores de software ou de serviços de BPO. Elas foram usadas como **visão de mercado** e cruzadas entre si. Faixas de preço e métricas-meta são referências, não dados estatísticos.
