---
description: "Lista de tarefas para implementação da funcionalidade"
---

# Tarefas: FrogDex — Cadastro e Listagem de Sapos

**Entrada**: Documentos de design em `specs/001-cadastro-listagem-sapos/`

**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório), research.md, data-model.md, contracts/

**Testes**: não há testes automatizados nesta versão; a verificação é feita por `npm run lint`,
`npm run build` e pelos cenários de `quickstart.md`.

**Organização**: tarefas agrupadas por história de usuário (US1 listagem, US2 cadastro) e
distribuídas entre 7 integrantes.

## Formato: `[ID] [P?] [História] Descrição`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência pendente)
- **[História]**: US1 ou US2; fases de setup, fundação e polimento não têm rótulo
- Caminhos de arquivo são relativos à raiz do repositório

## Fase 1: Setup (infraestrutura compartilhada)

**Propósito**: preparar execução local e base de dados mock

- [ ] T001 [P] Adicionar `json-server@0.17.4` às devDependencies e os scripts `api` (`json-server --watch db.json --port 3001`) e `dev` em `package.json`
- [ ] T002 [P] Criar `db.json` na raiz com a coleção `sapos` e 3 registros iniciais, cobrindo `data-model.md` (`Sapo.nomePopular`, `Sapo.especie`, `Sapo.regiaoEncontrada`, `Sapo.periodo`, `Sapo.habitat`, `Sapo.observacoes`)
- [ ] T003 [P] Configurar proxy `/api` para `http://localhost:3001` com reescrita em `vite.config.js`, conforme `contracts/api-sapos.md`
- [X] T004 [P] Substituir os estilos do starter em `src/index.css` e `src/App.css` por base limpa: reset, tipografia, variáveis de cor e largura máxima de conteúdo

---

## Fase 2: Fundação (pré-requisitos bloqueantes)

**Propósito**: contratos internos compartilhados por US1 e US2

**⚠️ Nenhuma história começa antes desta fase.**

- [ ] T005 [P] Implementar `listarSapos` e `cadastrarSapo` com `fetch` em `src/api/sapos.js`, lançando erro em falha de rede ou resposta não 2xx e usando o `Sapo.id` retornado pelo servidor, conforme `contracts/api-sapos.md`
- [ ] T006 [P] Implementar `validarSapo` e as mensagens por campo em `src/utilitarios/validacao.js`, aplicando `trim` e as regras de `data-model.md` (`Sapo.nomePopular`, `Sapo.especie`, `Sapo.regiaoEncontrada`, limites de `Sapo.habitat` e `Sapo.observacoes`)
- [ ] T007 [P] Criar `src/components/MensagemStatus.jsx` e `src/components/MensagemStatus.css` com as variantes `carregando`, `vazia` e `erro`, incluindo botão "Tentar novamente" quando houver ação de recuperação
- [ ] T008 Criar `src/App.jsx` como shell e `src/pages/PaginaInicial.jsx` + `src/pages/PaginaInicial.css` com cabeçalho "FrogDex" e área principal vazia (depende de T004)

**Checkpoint**: fundação pronta; US1 e US2 podem começar.

---

## Fase 3: História de Usuário 1 - Consultar o catálogo (Prioridade: P1) 🎯 MVP

**Meta**: exibir todos os sapos registrados com estados de carregamento, catálogo vazio e falha.

**Teste independente**: com `db.json` preenchido, abrir a aplicação e conferir a lista; parar o JSON Server e conferir a mensagem de falha com nova tentativa; esvaziar `db.json` e conferir a mensagem de catálogo vazio.

- [X] T009 [P] [US1] Criar `src/components/CartaoSapo.jsx` e `src/components/CartaoSapo.css` exibindo nome popular, espécie, região, período, habitat e observações, com "não informado" para opcionais vazios, conforme `data-model.md` (`Sapo.periodo`, `Sapo.habitat`, `Sapo.observacoes`)
- [X] T010 [US1] Criar `src/components/ListaSapos.jsx` e `src/components/ListaSapos.css` recebendo a lista e renderizando `CartaoSapo` por item (depende de T009)
- [ ] T011 [US1] Implementar o carregamento em `src/pages/PaginaInicial.jsx` com `listarSapos`, estados `carregando | pronta | vazia | erro`, nova tentativa e renderização de `ListaSapos` ou `MensagemStatus` (depende de T005, T007, T008, T010)
- [ ] T012 [US1] Validar US1 no navegador seguindo os cenários 1, 4 e 6 de `quickstart.md` e registrar data, responsável e resultado obtido

**Checkpoint**: US1 funcional e demonstrável isoladamente (MVP).

---

## Fase 4: História de Usuário 2 - Cadastrar sapo (Prioridade: P2)

**Meta**: formulário validado que persiste o sapo e o insere na listagem sem recarregar.

**Teste independente**: cadastrar com os três obrigatórios e conferir o registro no topo; tentar enviar vazio e com espaços; derrubar o JSON Server e conferir a mensagem de erro com os dados preservados.

- [ ] T013 [P] [US2] Criar `src/components/FormularioSapo.jsx` e `src/components/FormularioSapo.css` com campos controlados e rótulos: nome popular, espécie, região encontrada, período (`noturno | diurno | crepuscular`), habitat e observações, conforme `data-model.md` (`Sapo.nomePopular`, `Sapo.especie`, `Sapo.regiaoEncontrada`, `Sapo.periodo`, `Sapo.habitat`, `Sapo.observacoes`)
- [ ] T014 [US2] Integrar `validarSapo` ao formulário em `src/components/FormularioSapo.jsx`, exibindo mensagem por campo e bloqueando o envio inválido (depende de T006, T013)
- [ ] T015 [US2] Implementar o envio em `src/pages/PaginaInicial.jsx`: desabilitar durante `enviando`, chamar `cadastrarSapo`, inserir o registro retornado no topo da lista e limpar o formulário (depende de T005, T013, T014)
- [ ] T016 [US2] Tratar falha de cadastro em `src/pages/PaginaInicial.jsx`: exibir "Não foi possível realizar o cadastro.", preservar os dados digitados e permitir nova tentativa (depende de T015)
- [ ] T017 [US2] Validar US2 no navegador seguindo os cenários 2, 3 e 5 de `quickstart.md` e registrar data, responsável e resultado obtido

**Checkpoint**: US1 e US2 funcionam juntas, cada uma verificável isoladamente.

---

## Fase 5: Polimento e preocupações transversais

- [ ] T018 [P] Remover sobras do template Vite não utilizadas: `src/assets/`, ícones de `public/` referenciados apenas pelo starter e classes órfãs em `src/App.css`
- [ ] T019 [P] Documentar em `README.md` os comandos `npm install`, `npm run api`, `npm run dev`, `npm run lint` e `npm run build`, preservando o conteúdo existente
- [ ] T020 Executar `npm run lint` e corrigir todos os erros e avisos encontrados
- [ ] T021 Executar `npm run build` e corrigir eventuais erros de build
- [ ] T022 Revisar conformidade com a constituição v1.0.1: nomes em pt-BR, apenas pastas de infraestrutura em inglês, componentes abaixo de 200 linhas, textos acentuados, sem código morto
- [ ] T023 Executar todos os cenários de `quickstart.md` (1 a 7) e registrar os resultados

---

## Dependências e ordem de execução

### Dependências entre fases

- **Setup (Fase 1)**: sem dependências
- **Fundação (Fase 2)**: depende do Setup e bloqueia todas as histórias
- **US1 (Fase 3)**: após a Fundação; não depende de US2
- **US2 (Fase 4)**: após a Fundação; integra com US1 na página, mas é verificável isoladamente
- **Polimento (Fase 5)**: após US1 e US2

### Dependências entre tarefas

- T004 → T008 → T011
- T005, T007, T010 → T011
- T009 → T010
- T006, T013 → T014 → T015 → T016
- T005, T013, T014 → T015
- T018, T019, T020, T021, T022, T023 → após T011 e T016

### Distribuição da equipe (7 integrantes)

| Integrante | Frente | Tarefas | Entrega principal |
|---|---|---|---|
| 1 | Infraestrutura | T001, T003, T008, T021 | Scripts npm, proxy, shell da aplicação, build |
| 2 | Dados mock e limpeza | T002, T018 | `db.json` com seed e remoção de sobras do template |
| 3 | Camada de API e lint | T005, T020 | Cliente HTTP `src/api/sapos.js` e lint limpo |
| 4 | Validação e formulário | T006, T013, T014 | Regras de validação e formulário com mensagens |
| 5 | Página e estados | T007, T011, T015, T016 | Estados da lista, envio, erro e limpeza do formulário |
| 6 | Listagem visual | T004, T009, T010 | Estilos base, cartão e lista de sapos |
| 7 | QA e integração | T012, T017, T022, T023 | Evidências de US1/US2, conformidade e validação final |

**Regra de ouro**: cada integrante só edita os arquivos das próprias tarefas. `PaginaInicial.jsx` e `FormularioSapo.jsx` têm dono único (integrantes 5 e 4) para evitar conflito de merge.

---

## Exemplos de execução paralela

```bash
# Fase 1 — quatro tarefas independentes
Task: "T001 Configurar json-server e scripts npm em package.json"
Task: "T002 Criar db.json com 3 registros"
Task: "T003 Configurar proxy /api em vite.config.js"
Task: "T004 Definir estilos base em src/index.css e src/App.css"

# Fase 2 — contratos internos em paralelo
Task: "T005 Implementar src/api/sapos.js"
Task: "T006 Implementar src/utilitarios/validacao.js"
Task: "T007 Criar MensagemStatus.jsx e .css"

# US1 e US2 em paralelo após a fundação
Task: "T009 Criar CartaoSapo.jsx e .css"
Task: "T013 Criar FormularioSapo.jsx e .css"
```

---

## Estratégia de implementação

### MVP primeiro (somente US1)

1. Fase 1: Setup
2. Fase 2: Fundação (bloqueia tudo)
3. Fase 3: US1
4. **Parar e validar**: T012 confirma o MVP
5. Demonstrar a listagem funcionando

### Entrega incremental

1. Setup + Fundação → base pronta
2. US1 → validar → demonstrar
3. US2 → validar → demonstrar
4. Polimento → lint, build e quickstart completos

Cada história entrega valor sem quebrar a anterior; o histórico de commits deve seguir um commit por tarefa ou por grupo lógico, em português.

---

## Observações

- `[P]` indica arquivos distintos e ausência de dependência pendente
- Nenhuma tarefa de teste automatizado: a spec não solicita TDD e a constituição exige lint, build e validação funcional
- Cada tarefa é executável por um integrante sem contexto além de `spec.md`, `plan.md`, `data-model.md`, `contracts/api-sapos.md` e `quickstart.md`
- Evidências de T012, T017 e T023 devem ser anexadas à entrega do grupo
