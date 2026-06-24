# Tasks — Roadmap de Implementação
> Metodologia SDD · Spec Kit · Etapa 4: Tasks

---

## Sprint 1 — Fundação

| ID   | Tarefa                                          | Status |
|------|-------------------------------------------------|--------|
| T-01 | Inicializar projeto com Vite + React            | ✅ Done |
| T-02 | Instalar dependências (Tailwind, Lucide, Router)| ✅ Done |
| T-03 | Configurar Tailwind CSS + postcss               | ✅ Done |
| T-04 | Criar `utils/uuid.js` — gerador de ID          | ✅ Done |
| T-05 | Criar `utils/storage.js` — helpers localStorage| ✅ Done |
| T-06 | Criar `utils/formatters.js` — datas e status   | ✅ Done |
| T-07 | Criar `StockContext.jsx` com Reducer (dados de exemplo omitidos para início limpo) | ✅ Done |

---

## Sprint 2 — Componentes Base

| ID   | Tarefa                                              | Status |
|------|-----------------------------------------------------|--------|
| T-08 | `StockBadge.jsx` — badge visual normal/low/critical | ✅ Done |
| T-09 | `EmptyState.jsx` — estado vazio reutilizável        | ✅ Done |
| T-10 | `NavBar.jsx` — navegação inferior com 4 abas        | ✅ Done |
| T-11 | `ProductCard.jsx` — card com nome, qtd, badge       | ✅ Done |
| T-12 | `AlertBanner.jsx` — banner de alertas crítico/baixo | ✅ Done |
| T-13 | `MovementItem.jsx` — item do histórico              | ✅ Done |
| T-14 | `WhatsAppExport.jsx` — gerador de mensagem          | ✅ Done |

---

## Sprint 3 — Páginas

| ID   | Tarefa                                              | Status |
|------|-----------------------------------------------------|--------|
| T-15 | `Dashboard.jsx` — resumo + alertas + ações rápidas  | ✅ Done |
| T-16 | `Dashboard.jsx` — top 5 mais movimentados           | ✅ Done |
| T-17 | `Products.jsx` — listagem com busca                 | ✅ Done |
| T-18 | `ProductForm.jsx` — cadastro de produto             | ✅ Done |
| T-19 | `ProductForm.jsx` — edição de produto               | ✅ Done |
| T-20 | `ProductForm.jsx` — exclusão com confirmação dupla  | ✅ Done |
| T-21 | `Movement.jsx` — seleção de tipo (entrada/saída)    | ✅ Done |
| T-22 | `Movement.jsx` — validação: qtd não negativa (RN-01)| ✅ Done |
| T-23 | `Movement.jsx` — feedback visual de sucesso         | ✅ Done |
| T-24 | `History.jsx` — lista com filtro entrada/saída      | ✅ Done |

---

## Sprint 4 — App Shell e Config

| ID   | Tarefa                                              | Status |
|------|-----------------------------------------------------|--------|
| T-25 | `App.jsx` — roteamento com React Router             | ✅ Done |
| T-26 | `main.jsx` — ponto de entrada                       | ✅ Done |
| T-27 | `index.css` — Tailwind base + reset                 | ✅ Done |
| T-28 | `tailwind.config.js` — configuração de conteúdo     | ✅ Done |
| T-29 | `vercel.json` — rewrite para SPA                    | ✅ Done |
| T-30 | `.gitignore` — excluir node_modules e dist          | ✅ Done |
| T-31 | `README.md` — documentação do projeto               | ✅ Done |

---

## Mapeamento Requisitos Funcionais → Tasks

| Requisito Funcional (RF)                       | Tasks implementadas         |
|------------------------------------------------|-----------------------------|
| Cadastrar produtos                             | T-18                        |
| Editar produtos                                | T-19                        |
| Excluir produtos                               | T-20                        |
| Definir estoque mínimo por produto             | T-18, T-19                  |
| Registrar entrada de produtos                  | T-21, T-22, T-23            |
| Registrar saída de produtos (vendas)           | T-21, T-22, T-23            |
| Atualizar quantidade automaticamente           | T-07 (Reducer ADD_MOVEMENT) |
| Registrar movimentações com poucos toques      | T-15 (QuickActions)         |
| Exibir produtos recentes para novos registros  | T-16 (top movimentados)     |
| Notificar produto no estoque mínimo            | T-12, T-15                  |
| Alertar sobre inatividade                      | T-07 (lastOpenedAt)         |
| Identificar produtos com maior saída           | T-16 (outCounts)            |
| Lista de produtos com estoque baixo            | T-12 (AlertBanner)          |
| Sugerir ações com base no histórico            | T-14 (WhatsAppExport)       |
| Exibir lista com quantidades atuais            | T-17 (Products)             |
| Indicar visualmente status do estoque          | T-08, T-11                  |
| Gerar mensagens para WhatsApp                  | T-14                        |
| Registrar ações manualmente via app            | T-21 (Movement)             |
