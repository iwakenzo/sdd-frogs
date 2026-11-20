# Contrato da API: Sapos

**Funcionalidade**: 001-cadastro-listagem-sapos
**Consumidor**: aplicação React (`src/api/sapos.js`)
**Provedor**: JSON Server local (`json-server --watch db.json --port 3001`)

## Base e roteamento

| Ambiente | URL usada pelo cliente | Destino real |
|---|---|---|
| Desenvolvimento (Vite) | `/api/sapos` | `http://localhost:3001/sapos` via proxy com reescrita |

O proxy é definido em `vite.config.js`. O cliente nunca referencia `localhost` diretamente.

## Cabeçalhos

- Requisições com corpo: `Content-Type: application/json`.
- Respostas do JSON Server: `Content-Type: application/json`.
- Sem autenticação, sem cookies e sem cabeçalhos customizados.

## Operação: listar sapos

```http
GET /api/sapos
```

**Resposta de sucesso** — `200 OK`

```json
[
  {
    "id": 1,
    "nomePopular": "Sapo-cururu",
    "especie": "Rhinella diptycha",
    "regiaoEncontrada": "Jardim do campus",
    "periodo": "noturno",
    "habitat": "Área úmida com vegetação baixa",
    "observacoes": "Encontrado próximo ao lago após a chuva."
  }
]
```

**Lista vazia** — `200 OK` com `[]`.

**Falhas**: erro de rede (servidor parado) ou resposta não 2xx. Nesse caso o cliente lança erro e a
interface exibe "Não foi possível carregar os sapos." com ação de nova tentativa (RF-010, CE01).

## Operação: cadastrar sapo

```http
POST /api/sapos
Content-Type: application/json

{
  "nomePopular": "Perereca-verde",
  "especie": "Aplastodiscus arildae",
  "regiaoEncontrada": "Trilha do rio",
  "periodo": "crepuscular",
  "habitat": "Mata ciliar",
  "observacoes": ""
}
```

**Resposta de sucesso** — `201 Created` com o registro completo, incluindo o `id` gerado:

```json
{
  "id": 4,
  "nomePopular": "Perereca-verde",
  "especie": "Aplastodiscus arildae",
  "regiaoEncontrada": "Trilha do rio",
  "periodo": "crepuscular",
  "habitat": "Mata ciliar",
  "observacoes": ""
}
```

**Regras do corpo**:
- `nomePopular`, `especie` e `regiaoEncontrada` são obrigatórios e não podem conter apenas espaços.
- `periodo` aceita `noturno`, `diurno`, `crepuscular` ou ausência.
- `id` não é enviado; se enviado, é ignorado pelo servidor.
- A resposta é a fonte de verdade do registro exibido na lista (RF-008).

**Falhas**: erro de rede, `4xx` ou `5xx`. O cliente lança erro, a interface exibe "Não foi possível
realizar o cadastro." e mantém os dados digitados para nova tentativa (RF-011, CE02, CE03).

## Mapeamento de erros para a interface

| Situação técnica | Detecção | Mensagem | Recuperação |
|---|---|---|---|
| Servidor indisponível no `GET` | `fetch` rejeitado | "Não foi possível carregar os sapos." | botão "Tentar novamente" |
| Resposta não 2xx no `GET` | `response.ok === false` | "Não foi possível carregar os sapos." | botão "Tentar novamente" |
| Servidor indisponível no `POST` | `fetch` rejeitado | "Não foi possível realizar o cadastro." | formulário preenchido permanece |
| Resposta não 2xx no `POST` | `response.ok === false` | "Não foi possível realizar o cadastro." | formulário preenchido permanece |
| Corpo inválido (defesa) | campos obrigatórios ausentes | mensagens por campo, sem requisição | usuário corrige |

## Fora do escopo do contrato

- `PUT`, `PATCH` e `DELETE`.
- Paginação, filtros, ordenação por query string.
- Autenticação, rate limit e versionamento de API.
