# Plano de Implementação — StockMicro
> Metodologia SDD · Spec Kit · Etapa 3: Plan
> Baseado em: schema.md + Requisitos Não Funcionais

---

## 1. Requisitos Não Funcionais (RNF)

| ID     | Requisito              | Critério de Aceitação                        |
|--------|------------------------|----------------------------------------------|
| RNF-01 | Offline-first          | Funciona sem internet após 1ª abertura        |
| RNF-02 | Mobile-first           | Usável em tela de 360px                       |
| RNF-03 | Performance            | Carrega em < 2s em conexão 3G                 |
| RNF-04 | Usabilidade (3 toques) | Registrar venda em ≤ 3 interações             |
| RNF-05 | Persistência de dados  | Dados sobrevivem ao fechamento do navegador   |
| RNF-06 | Feedback visual        | Resposta visual em < 300ms após ação          |
| RNF-07 | Acessibilidade mínima  | Áreas de toque ≥ 44×44px                      |
| RNF-08 | Deploy gratuito        | Publicado na Vercel (free tier)               |

---

## 2. Arquitetura de Pastas

```
src/
├── main.jsx                      # Ponto de entrada React
├── App.jsx                       # Roteamento principal + Providers
├── index.css                     # Tailwind base
│
├── context/
│   └── StockContext.jsx          # Estado global (Context + Reducer + localStorage)
│
├── pages/
│   ├── Dashboard.jsx             # P-01 — Tela inicial
│   ├── Products.jsx              # P-02 — Lista de produtos + busca
│   ├── ProductForm.jsx           # P-05/P-06 — Cadastro e edição
│   ├── Movement.jsx              # P-03 — Registrar entrada/saída
│   └── History.jsx               # P-04 — Histórico com filtros
│
├── components/
│   ├── NavBar.jsx                # C-06 — Barra de navegação inferior
│   ├── ProductCard.jsx           # C-01 — Card do produto
│   ├── StockBadge.jsx            # C-02 — Badge de status
│   ├── AlertBanner.jsx           # C-04 — Banner de alertas
│   ├── MovementItem.jsx          # C-08 — Item do histórico
│   ├── EmptyState.jsx            # C-09 — Tela de estado vazio
│   └── WhatsAppExport.jsx        # C-10 — Exportar alertas via WhatsApp
│
└── utils/
    ├── uuid.js                   # Gerador de ID único
    ├── storage.js                # Helpers de leitura/escrita no localStorage
    └── formatters.js             # Formatação de datas e cálculo de status
```

---

## 3. Estado Global — Shape e Actions

### Shape do Estado
```js
{
  products: Product[],      // Lista de produtos
  movements: Movement[],    // Histórico de movimentações
  settings: AppSettings     // Configurações do app
}
```

### Actions do Reducer

| Action            | Payload                          | Descrição                              |
|-------------------|----------------------------------|----------------------------------------|
| `ADD_PRODUCT`     | `{ name, unit, quantity, ... }`  | Cria novo produto com ID gerado        |
| `EDIT_PRODUCT`    | `{ id, ...campos }`              | Atualiza produto existente             |
| `DELETE_PRODUCT`  | `{ id }`                         | Remove produto e suas movimentações    |
| `ADD_MOVEMENT`    | `{ productId, type, quantity }`  | Registra entrada/saída + atualiza qtd  |
| `UPDATE_SETTINGS` | `{ ...campos }`                  | Atualiza configurações                 |

---

## 4. Estratégia Offline (RNF-01 e RNF-05)

```
Inicialização do app
  └── loadProducts() / loadMovements() / loadSettings()
        └── Se vazio → carrega dados de exemplo (onboarding)

Toda mutação de estado
  └── useEffect([state.products]) → saveProducts()
  └── useEffect([state.movements]) → saveMovements()
  └── useEffect([state.settings]) → saveSettings()

Resultado: 100% funcional sem internet
```

---

## 5. Decisões de Design (UX)

| Decisão                    | Justificativa                                       |
|----------------------------|-----------------------------------------------------|
| NavBar fixa na parte inferior | Acessível com polegar em celulares grandes       |
| Cards grandes com toque total | Fácil de tocar (RNF-07: ≥ 44×44px)              |
| Verde / Amarelo / Vermelho    | Padrão universal de status                       |
| Confirmação dupla no delete   | Evita exclusões acidentais                       |
| Pré-seleção de tipo na URL    | `/move?type=out` abre direto em "Venda"          |
| Feedback de sucesso (1.5s)    | Confirma ação sem bloquear o fluxo (RNF-06)     |
| Emoji nos selects de produto  | Torna status visível sem precisar abrir o item   |
| Dados de exemplo no 1º acesso | Onboarding sem instruções (zero fricção)         |

---

## 6. Sequência de Build (ordem de implementação)

```
[1] Fundação
    uuid.js → storage.js → formatters.js → StockContext.jsx

[2] Componentes Base
    StockBadge → EmptyState → NavBar → ProductCard
    AlertBanner → MovementItem → WhatsAppExport

[3] Páginas
    Dashboard → Products → ProductForm → Movement → History

[4] App Shell
    App.jsx (rotas) → main.jsx → index.css

[5] Configuração
    tailwind.config.js → vercel.json → .gitignore

[6] Deploy
    npm run build → GitHub → Vercel
```

---

## 7. Respostas aos RNF — Como cada um é atendido

| RNF    | Como é atendido no código                                        |
|--------|------------------------------------------------------------------|
| RNF-01 | localStorage como única fonte de dados; sem fetch externo        |
| RNF-02 | Tailwind mobile-first; max-w-md centralizado; NavBar inferior    |
| RNF-03 | Vite build otimizado; JS < 260kb gzip < 82kb                     |
| RNF-04 | Dashboard → toque em "Venda" → seleciona produto → confirma      |
| RNF-05 | useEffect persiste no localStorage a cada mudança de estado      |
| RNF-06 | Tela de sucesso animada por 1.5s; active: states em botões       |
| RNF-07 | Botões com py-3/py-4 (≥ 48px de altura); ícones com área extra  |
| RNF-08 | vercel.json configurado; `npm run build` gera /dist pronto       |
