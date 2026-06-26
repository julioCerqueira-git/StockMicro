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
- ✅ Armazenamento local (localStorage)
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
- localStorage

## 🚀 Atualizações Futuras

Em versões futuras do StockMicro, estão planejadas as seguintes melhorias para garantir maior **segurança** e **confiabilidade** dos dados:

- 🔐 **Autenticação de usuários** — login com controle de acesso por perfil (admin, colaborador).
- 🗄️ **Banco de dados** — substituição do `localStorage` por um banco de dados real (ex.: PostgreSQL ou Firebase), eliminando o risco de perda de dados ao limpar o cache do navegador e permitindo o acesso de múltiplos dispositivos.
- ☁️ **Sincronização em nuvem** — dados disponíveis em qualquer dispositivo, com backup automático.

> Atualmente os dados são armazenados no `localStorage` do navegador, o que é suficiente para uso individual. A migração para banco de dados garantirá persistência, segurança e escalabilidade para múltiplos usuários.

## Como rodar localmente

```bash
npm install
npm run dev
```

Desenvolvido como atividade prática de SDD — Spec Kit.
