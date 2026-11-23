# Plano de Implementação: FrogDex — Cadastro e Listagem de Sapos

**Branch**: `001-cadastro-listagem-sapos` | **Data**: 2026-11-20 | **Spec**: [spec.md](./spec.md)

**Integração**: `dev` | **Revisão**: 2026-11-23 | **Evidências**: [relatório](./evidencias/relatorio.md)

**Entrada**: Especificação da funcionalidade em `specs/001-cadastro-listagem-sapos/spec.md`

## Resumo

Aplicação web local em React + Vite que lista e cadastra sapos em um mock JSON Server. A página inicial carrega os registros existentes, exibe estados de carregando, vazio e erro, e oferece um formulário validado; ao salvar com sucesso, o registro retornado pela API é inserido no topo da lista sem recarregar a página. A comunicação usa `fetch` nativo através do proxy do Vite, sem autenticação e sem backend real.

## Contexto Técnico

**Linguagem/Versão**: JavaScript (ESM), React 19.3, Node 24.19 (tooling)

**Dependências principais**: react, react-dom, vite 8; json-server 0.17.4 (nova, de desenvolvimento)

**Armazenamento**: `db.json` na raiz, servido pelo JSON Server em `http://localhost:3001`

**Testes**: sem suíte automatizada versionada nesta versão; verificação por `npm run lint`,
`npm run build` e cenários do `quickstart.md`. A integração usou verificação pontual no Edge com
instrumentação externa ao projeto, sem adicionar dependências à aplicação. O cenário de
usabilidade exige cinco pessoas reais e permanece pendente.

**Plataforma alvo**: navegador moderno em desktop; execução local

**Tipo de projeto**: aplicação web única (front-end + API mockada)

**Metas de desempenho**: lista com 100 registros visível em até 2 s; novo registro visível em até 2 s após o POST

**Restrições**: execução via npm; portas 5173 (Vite) e 3001 (JSON Server); sem autenticação;
persistência local em arquivo, sem banco de dados de produção

**Escala/Âmbito**: centenas de registros; um usuário local; sem paginação, busca ou edição

## Verificação da Constituição

*Revisão técnica da constituição concluída. Aceitação final pendente de SC-002 e SC-006;
não declarar a entrega concluída antes da validação humana.*

- **I. Idioma do Código**: código, identificadores, campos JSON e mensagens em pt-BR. As pastas
  `src/components`, `src/pages` e `src/api` são exceção expressa no Princípio I da constituição
  v1.0.1, que preserva os nomes padrão do template Vite e exige nomes de arquivos e
  identificadores em português dentro delas.
- **II. Componentização**: a página orquestra estado e chamadas; componentes de apresentação
  recebem props; validação em função pura; nenhum arquivo acima de 200 linhas.
- **III. Simplicidade**: `fetch` nativo, sem axios, sem biblioteca de formulário, sem estado global,
  sem abstrações especulativas. Única dependência nova: json-server (RF06/NFR-004).
- **IV. Qualidade Verificável**: lint e build limpos, cenários técnicos 1 a 9 verificados no
  navegador com evidências. SC-002 e SC-006 dependem do cenário 10, ainda não executado com a equipe.

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
├── tasks.md          # criado por /speckit.tasks
└── evidencias/       # relatório, resultados e capturas da integração
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
| FR-001–FR-002, CA01 | `data-model.md`, contrato GET, `quickstart.md` cenários 1 e 9 |
| FR-003–FR-007, CA02–CA03 | `data-model.md`, `quickstart.md` cenários 2, 3 e 7 |
| FR-008–FR-009, CA04 | `research.md` decisão 4, `quickstart.md` cenários 2 e 8 |
| FR-010, CE01 | Contrato de erros, `quickstart.md` cenário 4 |
| FR-011, CE02–CE03 | `quickstart.md` cenário 5 |
| FR-012, NFR-004 | `data-model.md`, `quickstart.md` cenário 2 (arquivo e reinício) |
| FR-013–FR-014 | `quickstart.md` cenários 3 a 8 (mensagens, acentos e envio simultâneo) |
| SC-001 | `quickstart.md` cenários 1 e 9: completude e 100 registros |
| SC-002 | `quickstart.md` cenário 10: tempo humano de até 1 minuto — pendente |
| SC-003 | `quickstart.md` cenário 3: bloqueio de obrigatórios |
| SC-004 | `quickstart.md` cenários 2 e 9: inserção após POST em até 2 s |
| SC-005 | `quickstart.md` cenários 4, 5 e 6: erro de consulta, erro de cadastro e vazio |
| SC-006 | `quickstart.md` cenário 10: quatro de cinco pessoas sem orientação — pendente |

Os identificadores FR-### seguem a especificação; RF/RN usados em artefatos anteriores são
referências históricas. CA01–CA05 também são rótulos históricos do design, não novos requisitos.
Resultados objetivos e limitações estão registrados em `evidencias/relatorio.md`.
