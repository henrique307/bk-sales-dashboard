# Dashboard de Vendas — BK Company

Aplicação fullstack para cadastro de produtos e custos, recepção idempotente de pedidos por webhook e visualização de faturamento, custos e lucro por período.

> Screenshot/GIF: adicione aqui o link da demonstração gravada.

## Rodar sem Docker

Pré-requisito: Node.js 20+.

```bash
cp .env.example .env
npm run install:all
npm run dev
```

Frontend: http://localhost:5173 · API: http://localhost:3333

## Rodar com Docker (opcional)

```bash
cp .env.example .env
docker compose up --build
```

Frontend: http://localhost:5173 · API: http://localhost:3333

## Testes e build

```bash
npm test
npm run build
```

## Testar o webhook

Com a aplicação em execução, rode na raiz:

```bash
curl -X POST http://localhost:3333/api/webhooks/generic-ecommerce/orders \
  -H "Content-Type: application/json" \
  --data @docs/webhook-sample.json
```

Repetir o comando retorna `200` e o mesmo pedido, sem duplicação. A primeira chamada retorna `201`.

## Endpoints

| Método     | Rota                             | Descrição                     |
| ---------- | -------------------------------- | ----------------------------- |
| GET        | `/api/health`                    | Healthcheck                   |
| POST / GET | `/api/products`                  | Criar / listar produtos       |
| PUT        | `/api/product-costs/:productId`  | Criar ou atualizar custo      |
| GET        | `/api/product-costs`             | Produtos com custo associado  |
| POST       | `/api/webhooks/:platform/orders` | Receber pedido externo        |
| GET        | `/api/orders`                    | Pedidos, com período opcional |
| GET        | `/api/dashboard`                 | Resumo, com período opcional  |

`startDate` e `endDate` usam `YYYY-MM-DD` e são inclusivos em UTC.

## Arquitetura

```text
backend/src/
  modules/         produtos, custos, pedidos, dashboard e webhooks
  shared/          erros, HTTP, dinheiro e repositório genérico
  container.ts     composição e injeção de dependências
frontend/src/
  features/        api/, hooks/ e components/ por funcionalidade
  shared/          cliente HTTP, UI e formatadores
```

O fluxo de backend é `rota → service → interface de repositório`. Services não conhecem Express nem implementações em memória. Somente `container.ts` instancia implementações concretas.

### Adicionar uma plataforma de webhook

1. Crie um mapper em `backend/src/modules/webhooks/mappers/` que implemente `OrderWebhookMapper`.
2. Valide o payload externo com Zod e retorne `NewOrder`.
3. Adicione uma instância a `registeredMappers` em `mapper-registry.ts`.

Nenhum service, entidade ou rota precisa mudar (Open/Closed).

### Trocar a persistência

Implemente `ProductRepository`, `ProductCostRepository` e `OrderRepository` usando o banco escolhido e altere somente as instâncias em `container.ts` (Dependency Inversion).

## Decisões e trade-offs

- Dinheiro é inteiro em centavos no domínio e convertido apenas nas bordas.
- O webhook associa `itemId` ao `sku`; produto ausente é aceito e tem custo zero.
- O custo da dashboard é calculado na consulta com o custo **atual**, não com snapshot histórico. É simples, mas alterar um custo recalcula o lucro de pedidos antigos.
- `externalId` é idempotente por plataforma.
- Dados são voláteis por requisito; reiniciar o backend os apaga.
- `SEED_DATA=true` carrega quatro produtos, custos e cinco pedidos.

## Vídeo demonstrativo

Link: [Vídeo apresentação](https://youtu.be/BiJp9N339NM)

### Três pontos para destacar em 3 minutos

1. **Dependency Inversion:** services dependem de interfaces e a composição concreta fica isolada.
2. **Open/Closed no webhook:** formato externo está contido no mapper; uma plataforma nova não altera o domínio.
3. **Separação por feature e bordas:** validação Zod no HTTP, centavos no domínio e Query hooks separados da UI.

## Transparência

IA generativa foi utilizada como ferramenta de apoio na estruturação, revisão e implementação. As decisões, validações e responsabilidade técnica permanecem com o autor.
