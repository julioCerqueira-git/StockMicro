# Schema — StockMicro
> Metodologia SDD · Spec Kit · Etapa 2: Specify
> Gerado a partir dos Requisitos Funcionais (RF)

---

## 1. Entidades de Dados

### 1.1 Product (Produto)

```json
{
  "id": "uuid-v4",
  "name": "string (obrigatório, max 80 chars)",
  "unit": "string (ex: un, kg, cx, l)",
  "quantity": "number (inteiro >= 0)",
  "minStock": "number (inteiro >= 0)",
  "category": "string (opcional)",
  "createdAt": "ISO 8601 datetime",
  "updatedAt": "ISO 8601 datetime"
}
```

**Status derivado (calculado, não armazenado):**
| Valor      | Condição                              |
|------------|---------------------------------------|
| `normal`   | quantity > minStock                   |
| `low`      | quantity > 0 && quantity <= minStock  |
| `critical` | quantity === 0                        |

---

### 1.2 Movement (Movimentação)

```json
{
  "id": "uuid-v4",
  "productId": "uuid-v4 (FK → Product.id)",
  "productName": "string (snapshot do nome no momento)",
  "type": "enum: 'in' | 'out'",
  "quantity": "number (inteiro > 0)",
  "note": "string (opcional, max 120 chars)",
  "createdAt": "ISO 8601 datetime"
}
```

---

### 1.3 AppSettings (Configurações)

```json
{
  "alertInactivityDays": "number (default: 3)",
  "lastOpenedAt": "ISO 8601 datetime (atualizado apenas na criação/edição inicial)",
  "whatsappEnabled": "boolean (default: false)",
  "whatsappNumber": "string (opcional)"
}
```

---

## 2. Armazenamento localStorage

| Chave                   | Tipo         | Descrição                   |
|-------------------------|--------------|-----------------------------|
| `stockmicro:products`   | JSON Array   | Lista de todos os produtos  |
| `stockmicro:movements`  | JSON Array   | Histórico de movimentações  |
| `stockmicro:settings`   | JSON Object  | Configurações do app        |

---

## 3. Telas e Componentes

### 3.1 Telas (Pages)

| ID   | Nome          | Rota                 | Descrição                            |
|------|---------------|----------------------|--------------------------------------|
| P-01 | Dashboard     | `/`                  | Visão geral, alertas, ações rápidas  |
| P-02 | Produtos      | `/products`          | Lista e gestão de produtos           |
| P-03 | Movimentação  | `/move`              | Registrar entrada ou saída           |
| P-04 | Histórico     | `/history`           | Log de movimentações com filtro      |
| P-05 | Novo Produto  | `/products/new`      | Formulário de cadastro               |
| P-06 | Editar Produto| `/products/:id/edit` | Formulário de edição/exclusão        |

### 3.2 Componentes

| ID   | Componente        | Usado em   | Descrição                             |
|------|-------------------|------------|---------------------------------------|
| C-01 | `ProductCard`     | P-01, P-02 | Card com nome, quantidade e status    |
| C-02 | `StockBadge`      | C-01       | Indicador visual: normal/low/critical |
| C-03 | `MovementForm`    | P-03       | Formulário inline dentro de `Movement.jsx` |
| C-04 | `AlertBanner`     | P-01       | Alerta de estoque baixo/crítico       |
| C-05 | `QuickActions`    | P-01       | Botões inline dentro de `Dashboard.jsx` (≤ 3 toques) |
| C-06 | `NavBar`          | Global     | Navegação inferior mobile             |
| C-07 | `ProductForm`     | P-05, P-06 | Implementado como página em `ProductForm.jsx` |
| C-08 | `MovementItem`    | P-04       | Item individual do histórico          |
| C-09 | `EmptyState`      | P-02, P-04 | Estado vazio com call-to-action       |
| C-10 | `WhatsAppExport`  | P-01       | Gerador de mensagem para WhatsApp     |

---

## 4. Regras de Negócio (derivadas dos RF)

| ID    | Regra                                                                 |
|-------|-----------------------------------------------------------------------|
| RN-01 | Quantidade não pode ficar negativa após saída                         |
| RN-02 | Produto com `quantity <= minStock` dispara alerta visual              |
| RN-03 | Produto com `quantity === 0` aparece como "crítico" em destaque       |
| RN-04 | Top 5 produtos por saída são exibidos no Dashboard                    |
| RN-05 | App exibe alerta se não houver movimentação há X dias (configurável)  |
| RN-06 | Mensagem WhatsApp lista produtos com estoque baixo/crítico            |
| RN-07 | `updatedAt` é atualizado automaticamente em toda movimentação         |

---

## 5. Fluxo de Dados

```
User Action (toque/clique)
        ↓
React Component (UI Event)
        ↓
dispatch(action) → Context
        ↓
Reducer (processa estado)
        ↓
localStorage.setItem() via useEffect
        ↓
Re-render dos componentes afetados
```

---

## 6. Mapeamento RF → Schema

| Requisito Funcional (RF)                    | Entidade / Componente      |
|---------------------------------------------|----------------------------|
| Cadastrar / editar / excluir produtos        | Product + ProductForm       |
| Definir estoque mínimo por produto           | Product.minStock            |
| Registrar entrada de produtos                | Movement (type: 'in')       |
| Registrar saída de produtos (vendas)         | Movement (type: 'out')      |
| Atualizar quantidade automaticamente         | Reducer: ADD_MOVEMENT       |
| Registrar com poucos toques                  | QuickActions + MovementForm |
| Exibir produtos recentes                     | Dashboard (top movimentados)|
| Notificar estoque mínimo                     | AlertBanner + StockBadge    |
| Alertar inatividade                          | AppSettings + Dashboard     |
| Identificar produtos com maior saída         | Dashboard (outCounts)       |
| Lista de produtos com estoque baixo          | AlertBanner                 |
| Sugerir ações (reposição)                    | WhatsAppExport              |
| Exibir lista com quantidades atuais          | Products + ProductCard      |
| Indicar visualmente status do estoque        | StockBadge (3 cores)        |
| Gerar mensagem para WhatsApp                 | WhatsAppExport              |
| Registrar ações manualmente via interface    | Movement (todas as pages)   |
