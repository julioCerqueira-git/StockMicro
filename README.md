# StockMicro 📦

Sistema de controle de estoque para microempreendedores, desenvolvido com metodologia SDD (Spec-Driven Development).

## Funcionalidades

- ✅ Cadastro, edição e exclusão de produtos
- ✅ Registro de entradas e saídas (vendas)
- ✅ Alertas visuais de estoque baixo e crítico
- ✅ Dashboard com resumo e ações rápidas
- ✅ Histórico completo de movimentações
- ✅ Top 5 produtos mais vendidos
- ✅ Exportação de alertas via WhatsApp
- ✅ Funciona 100% offline (localStorage)
- ✅ Mobile-first / PWA-ready

## Metodologia SDD — Spec Kit

| Etapa        | Arquivo                    |
|--------------|----------------------------|
| Constituição | `docs/constitution.md`     |
| Specify      | `docs/schema.md`           |
| Plan         | `docs/plan.md`             |
| Tasks        | `docs/tasks.md`            |
| Implement    | `src/`                     |

## Stack

- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- localStorage (offline-first)

## Como rodar localmente

```bash
npm install
npm run dev
```

Desenvolvido como atividade prática de SDD — Spec Kit.
