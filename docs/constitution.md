# Constituição Técnica — StockMicro
> Metodologia SDD · Spec Kit · Etapa 1: Constituição

## 1. Stack Tecnológico
- Frontend: React 18 (Vite) + JavaScript (JSX)
- Estilização: Tailwind CSS + Lucide React
- Armazenamento: localStorage (offline-first)
- Estado global: React Context API + useReducer
- Deploy: Vercel (free tier)
- Controle de versão: GitHub

## 2. Regras Arquiteturais
- R1: Offline First — funciona sem internet
- R2: Mobile First — layout para 360px+
- R3: Zero Fricção — ação crítica em ≤ 3 toques
- R4: Dados Locais — 100% localStorage, sem servidor externo
- R5: Feedback Visual — resposta em < 300ms
- R6: Componentes Reutilizáveis

## 3. Restrições
- Sem banco de dados externo
- Sem autenticação/login
- WhatsApp é integração opcional
- Deve funcionar em celulares Android básicos
- Gratuito para o usuário final
