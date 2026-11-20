# Plano de Implementação: FrogDex — Cadastro e Listagem de Sapos

**Branch**: `001-cadastro-listagem-sapos` | **Data**: 2026-11-20 | **Spec**: [spec.md](./spec.md)

**Entrada**: Especificação da funcionalidade em `specs/001-cadastro-listagem-sapos/spec.md`

## Resumo

Aplicação web local em React + Vite que lista e cadastra sapos em um mock JSON Server. A página inicial carrega os registros existentes, exibe estados de carregando, vazio e erro, e oferece um formulário validado; ao salvar com sucesso, o registro retornado pela API é inserido no topo da lista sem recarregar a página. A comunicação usa `fetch` nativo através do proxy do Vite, sem autenticação e sem backend real.

## Contexto Técnico

**Linguagem/Versão**: JavaScript (ESM), React 19.3, Node 24.19 (tooling)

**Dependências principais**: react, react-dom, vite 8; json-server 0.17.4 (nova, de desenvolvimento)

**Armazenamento**: `db.json` na raiz, servido pelo JSON Server em `http://localhost:3001`

**Testes**: sem framework automatizado nesta versão; verificação por `npm run lint`,
`npm run build` e cenários manuais do `quickstart.md` (a constituição não exige testes automatizados)

**Plataforma alvo**: navegador moderno em desktop; execução local

**Tipo de projeto**: aplicação web única (front-end + API mockada)

**Metas de desempenho**: lista com 100 registros visível em até 2 s; novo registro visível em até 2 s após o POST

**Restrições**: execução via npm; portas 5173 (Vite) e 3001 (JSON Server); sem autenticação; sem persistência real

**Escala/Âmbito**: centenas de registros; um usuário local; sem paginação, busca ou edição

## Verificação da Constituição

*GATE: aprovado, sem violações.*

- **I. Idioma do Código**: código, identificadores, campos JSON e mensagens em pt-BR. As pastas
  `src/components`, `src/pages` e `src/api` são exceção expressa no Princípio I da constituição
  v1.0.1, que preserva os nomes padrão do template Vite e exige nomes de arquivos e
  identificadores em português dentro delas.
- **II. Componentização**: a página orquestra estado e chamadas; componentes de apresentação
  recebem props; validação em função pura; nenhum arquivo acima de 200 linhas.
- **III. Simplicidade**: `fetch` nativo, sem axios, sem biblioteca de formulário, sem estado global,
  sem abstrações especulativas. Única dependência nova: json-server (RF06/NFR-004).
- **IV. Qualidade Verificável**: lint e build limpos; critérios CA01–CA05 cobertos pelo quickstart.

## Estrutura do Projeto

### Documentação (esta funcionalidade)

```text
specs/001-cadastro-listagem-sapos/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api-sapos.md
├── checklists/
│   └── requirements.md
└── tasks.md          # criado por /speckit.tasks
```

### Código-fonte (raiz do repositório)

```text
db.json                        # base mock com 3 sapos iniciais
src/
├── api/
│   └── sapos.js               # listarSapos, cadastrarSapo
├── components/
│   ├── CartaoSapo.jsx
│   ├── CartaoSapo.css
│   ├── FormularioSapo.jsx
│   ├── FormularioSapo.css
│   ├── ListaSapos.jsx
│   ├── ListaSapos.css
│   ├── MensagemStatus.jsx     # vazio, erro e carregando
│   └── MensagemStatus.css
├── pages/
│   ├── PaginaInicial.jsx      # estado da lista e do formulário
│   └── PaginaInicial.css
├── utilitarios/
│   └── validacao.js           # validarSapo, mensagens de erro
├── App.jsx                    # shell que renderiza a página
├── App.css
├── index.css
└── main.jsx
```

**Decisão de estrutura**: projeto único com front-end em `src/` e mock de dados na raiz. As pastas
`api`, `components` e `pages` atendem ao RNF-002; `utilitarios` existe apenas para a função de validação
pura, evitando duplicação entre formulário e verificação manual.

## Rastreabilidade requisito → artefato

| Origem | Cobertura |
|---|---|
| RF01–RF02, CA01 | `data-model.md`, `contracts/api-sapos.md` (GET), `quickstart.md` cenário 1 |
| RF03–RF07, CA02–CA03 | `data-model.md` (validação), `quickstart.md` cenários 2–3 |
| RF08–RF09, CA04 | `research.md` decisão 4, `quickstart.md` cenário 2 |
| RF10, CE01 | `contracts/api-sapos.md` (erros), `quickstart.md` cenário 4 |
| RF11, CE02–CE03 | `quickstart.md` cenário 5 |
| RF12, NFR-004 | `data-model.md` (persistência), `quickstart.md` setup |
| RF13–RF14 | `quickstart.md` (textos e estados) |
| SC-001–SC-006 | `quickstart.md` (cenários 1–6) |
