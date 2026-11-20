# Pesquisa e Decisões Técnicas: FrogDex

**Funcionalidade**: 001-cadastro-listagem-sapos
**Data**: 2026-11-20
**Contexto**: aplicação local, React + Vite no front-end e JSON Server como mock de dados

## Decisão 1: versão do JSON Server

**Decisão**: fixar `json-server@0.17.4` como dependência de desenvolvimento.

**Justificativa**: a versão 0.17.4 é estável e tem a CLI conhecida
(`json-server --watch db.json --port 3001`), com recarga automática ao alterar o arquivo. O
registro npm aponta `1.0.0-beta.15` como `latest`, mas é uma versão beta com CLI diferente; adotá-la
introduziria risco desnecessário em um projeto didático.

**Alternativas consideradas**:
- `json-server@1.0.0-beta.15`: CLI alterada, comportamento ainda em beta.
- MSW: mais configuração e não persiste em arquivo.
- Backend real: fora do escopo (a spec pede mock).

## Decisão 2: cliente HTTP

**Decisão**: usar `fetch` nativo, encapsulado em `src/api/sapos.js`.

**Justificativa**: atende RF-012/NFR-003 sem adicionar dependência, conforme o Princípio III.
O encapsulamento mantém o tratamento de erro em um único ponto.

**Alternativas consideradas**: axios (dependência adicional sem ganho), RTK Query (excessivo para
duas operações).

## Decisão 3: acesso à API em desenvolvimento

**Decisão**: proxy do Vite com reescrita: `/api` → `http://localhost:3001`, configurado em
`vite.config.js`. O cliente chama caminhos relativos como `/api/sapos`.

**Justificativa**: evita URL fixa no código, dispensa variáveis de ambiente e elimina problemas de
CORS. O Vite já é dependência do projeto.

**Alternativas consideradas**: `VITE_API_URL` (mais configuração e mais um passo no setup), chamada
direta a `http://localhost:3001` (acopla o código ao ambiente).

## Decisão 4: atualização da listagem após cadastro

**Decisão**: usar o registro retornado pelo `POST` e inseri-lo no início da lista em memória.

**Justificativa**: atende RF-008 e SC-004 sem uma segunda requisição, funcionando mesmo se o
`GET` estiver lento. O `id` definitivo vem na resposta, evitando registros temporários.

**Alternativas consideradas**: refazer o `GET` após o `POST` (mais lento e sujeito a corrida),
inserção otimista antes da resposta (arriscada em caso de falha).

## Decisão 5: validação do formulário

**Decisão**: função pura `validarSapo` em `src/utilitarios/validacao.js`, com `trim` em todos os campos e
mensagens literais por campo; estado de erros mantido no formulário.

**Justificativa**: cobre RF-005 a RF-007 com poucas linhas e mensagens em pt-BR, sem dependência.

**Alternativas consideradas**: react-hook-form e zod (dependências desnecessárias), validação
apenas com atributos HTML `required` (não detecta campos só com espaços nem permite mensagem
por campo).

## Decisão 6: execução local

**Decisão**: dois comandos npm — `npm run api` e `npm run dev` —, documentados no quickstart.

**Justificativa**: atende "rodar com npm" sem adicionar dependência de orquestração, conforme o
Princípio III.

**Alternativas consideradas**: `concurrently` para um único `npm run dev:all` (uma dependência a
mais), script em shell (não portável no Windows).

## Decisão 7: nomenclatura dos dados

**Decisão**: campos do `db.json` em português — `nomePopular`, `especie`, `regiaoEncontrada`,
`periodo`, `habitat`, `observacoes` — mantendo `id` como exceção do JSON Server.

**Justificativa**: alinha o payload ao Princípio I e evita mapeamento entre camadas.

**Alternativas consideradas**: payload em inglês com tradução na camada de API (mais código e
inconsistência com a constituição).

## Decisão 8: estados de interface

**Decisão**: estados explícitos — lista em `carregando | pronta | vazia | erro`; formulário em
`ocioso | inválido | enviando | erro`.

**Justificativa**: cobre CE01–CE04 e RF-014, impedindo que catálogo vazio e falha de carregamento
sejam confundidos e bloqueando envios duplicados.

**Alternativas consideradas**: flags booleanas independentes (permitem estados inválidos, como
"carregando" e "erro" simultâneos).

## Decisão 9: escopo de dados

**Decisão**: seed com 3 sapos no `db.json`; sem busca, filtro, ordenação configurável, paginação,
edição ou exclusão. Registros novos aparecem no topo.

**Justificativa**: mantém o escopo da versão e permite testar tanto a listagem preenchida quanto o
estado vazio (trocando o seed por lista vazia).

**Alternativas consideradas**: iniciar com base vazia (dificulta demonstrar a listagem), incluir
paginação (fora do escopo declarado na spec).
