# FrogDex

Catálogo de observações de sapos desenvolvido com React e Vite. A aplicação permite consultar
registros existentes e cadastrar novas observações, com validação dos campos e atualização
da listagem sem recarregar a página.

O projeto é executado localmente e utiliza uma API simulada com JSON Server. Não há
necessidade de conta ou autenticação.

## Projeto e integrantes

**Tema:** catálogo de observações de sapos (FrogDex).

**Problema que resolve:** organizar registros de sapos observados, reunindo nome popular, espécie,
região encontrada, período de atividade, habitat e observações em um único catálogo consultável,
com cadastro rápido e sem necessidade de conta.

**Integrantes:**

| Integrante | GitHub |
|---|---|
| André | andrelcsantos |
| Breno | BrenoAbilio |
| Matheus | Strilicherk |
| Marina | marinaokamoto |
| Mayara | MayaraLonguinho |
| Gabriel Adryan | AdryanSacchi |
| Gustavo Kenzo | iwakenzo |

## Framework utilizado

**Framework:** SpecKit, instalado com integração para o OpenCode.

**Por que o grupo escolheu:** A gente escolheu o SpecKit porque ele organiza o trabalho em
etapas: primeiro a especificação, depois o plano, as tarefas e a implementação. Isso ajudou o grupo
a saber o que fazer em cada momento e a deixar tudo registrado no repositório. A instalação no
OpenCode também foi simples.

**Fluxo adotado:** constituição, especificação, esclarecimento, planejamento, tarefas e
implementação, usando os comandos do SpecKit no OpenCode. A validação está registrada em
`specs/001-cadastro-listagem-sapos/evidencias/`.

## Funcionalidades

- **Consulta do catálogo:** exibe nome popular, espécie, região encontrada, período de atividade,
  habitat e observações, com os registros mais recentes no início.
- **Cadastro de observações:** permite registrar sapos com três campos obrigatórios e informações
  complementares opcionais.
- **Validação por campo:** bloqueia obrigatórios vazios ou preenchidos apenas com espaços e
  verifica os limites de tamanho e as opções de período.
- **Atualização imediata:** após um cadastro bem-sucedido, insere o registro retornado pela API
  no início da lista e limpa o formulário.
- **Estados de comunicação:** apresenta mensagens distintas para carregamento, catálogo vazio
  e falha de consulta, com opção de tentar novamente.
- **Recuperação de falhas:** preserva os dados do formulário quando o cadastro falha e permite
  reenviar; durante o envio, desabilita o botão para impedir cadastros simultâneos.
- **Persistência local:** mantém os registros no arquivo `db.json` entre recarregamentos da
  página e reinícios dos serviços.

### Dados do cadastro

| Campo | Obrigatório | Regra |
|---|---|---|
| Nome popular | Sim | De 1 a 80 caracteres |
| Espécie | Sim | De 1 a 120 caracteres |
| Região encontrada | Sim | De 1 a 120 caracteres |
| Período de atividade | Não | Noturno, diurno ou crepuscular |
| Habitat | Não | Até 200 caracteres |
| Observações | Não | Até 500 caracteres |

Os limites são verificados após remover espaços no início e no fim dos valores. Campos opcionais
vazios aparecem na listagem como “não informado”. Cada registro recebe um identificador gerado
pelo JSON Server. Observações com o mesmo nome, espécie e região são permitidas.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | Componentes e estado da interface |
| Vite 8 | Servidor de desenvolvimento e geração da aplicação |
| JavaScript com módulos ESM | Lógica da aplicação e comunicação HTTP com `fetch` |
| CSS | Estilos e organização visual |
| JSON Server 0.17.4 | API simulada e persistência em arquivo |
| Oxlint | Análise estática do código |

## Pré-requisitos

- Node.js compatível com o Vite 8; versão utilizada no projeto: **24.19.0**.
- npm instalado com o Node.js.
- Portas **5173** (aplicação) e **3001** (API) disponíveis.
- Navegador moderno em ambiente de computador.

## Instalação

Na raiz do projeto:

```bash
npm install
```

O JSON Server já está incluído nas dependências de desenvolvimento; não é necessário
instalá-lo separadamente.

## Como rodar

Abra dois terminais na raiz do projeto e mantenha os dois processos em execução:

```bash
# Terminal 1 — API simulada
npm run api
```

```bash
# Terminal 2 — aplicação
npm run dev
```

Acesse a aplicação em **http://localhost:5173**. Confira também o endereço informado no terminal
do Vite, pois ele pode escolher outra porta se a padrão estiver ocupada.

A API pode ser consultada diretamente em **http://localhost:3001/sapos**. A interface usa o caminho
relativo `/api/sapos`, encaminhado pelo servidor do Vite para a API na porta 3001.

Para encerrar os serviços, pressione `Ctrl+C` em cada terminal.

## Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm install` | Instala as dependências |
| `npm run api` | Inicia o JSON Server com acompanhamento de alterações no `db.json`, na porta 3001 |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite |
| `npm run lint` | Executa a análise estática com Oxlint |
| `npm run build` | Gera os arquivos estáticos da aplicação em `dist/` |
| `npm run preview` | Disponibiliza uma prévia local dos arquivos gerados |

O comando de geração não inicia a API nem cria um serviço de produção. O fluxo recomendado para
usar a aplicação localmente é `npm run api` junto com `npm run dev`, conforme descrito acima.

## Persistência e API

O `db.json` contém três registros iniciais. O JSON Server lê e grava a coleção `sapos` nesse
arquivo; os dados não ficam apenas na memória do navegador.

| Operação | Caminho usado pela interface | Resultado |
|---|---|---|
| `GET` | `/api/sapos` | Retorna os registros cadastrados |
| `POST` | `/api/sapos` | Salva uma observação e retorna o registro com o identificador |

**Atenção:** os cadastros alteram o `db.json`. Faça uma cópia de segurança antes de substituir
ou esvaziar esse arquivo em testes. A API é uma simulação local, sem autenticação ou banco de
dados de produção; não deve ser exposta como um serviço público.

## Verificação de qualidade

```bash
npm run lint
npm run build
```

Espera-se que a análise estática termine sem erros nem avisos novos e que a geração da aplicação
conclua com sucesso. Esta versão não possui uma suíte de testes automatizados; a verificação
funcional é feita no navegador, incluindo cadastro, listagem, entradas inválidas e falhas da API.

Os cenários estão no [guia de validação rápida](specs/001-cadastro-listagem-sapos/quickstart.md).

## Estrutura do projeto

```text
src/
├── api/           # Comunicação HTTP com a API de sapos
├── components/    # Formulário, cartões, lista e mensagens de estado
├── pages/         # Página inicial e integração dos fluxos
├── utilitarios/   # Regras de validação
├── App.jsx        # Composição principal da aplicação
└── main.jsx       # Inicialização do React
db.json            # Registros persistidos pela API simulada
specs/             # Especificação, contratos e roteiro de validação
vite.config.js     # Configuração do Vite e encaminhamento da API
```

## Onde estão os artefatos

Todos os artefatos gerados pelo SpecKit estão versionados em `specs/001-cadastro-listagem-sapos/`:

| Artefato | Caminho |
|---|---|
| Constituição | `.specify/memory/constitution.md` |
| Especificação | `specs/001-cadastro-listagem-sapos/spec.md` |
| Plano | `specs/001-cadastro-listagem-sapos/plan.md` |
| Tarefas | `specs/001-cadastro-listagem-sapos/tasks.md` |
| Pesquisa e decisões | `specs/001-cadastro-listagem-sapos/research.md` |
| Modelo de dados | `specs/001-cadastro-listagem-sapos/data-model.md` |
| Contrato da API | `specs/001-cadastro-listagem-sapos/contracts/api-sapos.md` |
| Guia de validação | `specs/001-cadastro-listagem-sapos/quickstart.md` |
| Evidências | `specs/001-cadastro-listagem-sapos/evidencias/` |

**Divisão das tarefas por integrante:**

| Frente | Tarefas | Responsável |
|---|---|---|
| Infraestrutura | T001, T002, T003 | Marina |
| Shell, limpeza e build | T008, T018, T021 | Breno |
| Camada de API e lint | T005, T020 | Gustavo |
| Validação e formulário | T006, T013, T014 | Mayara |
| Página e estados | T007, T011, T015, T016 | André |
| Listagem visual | T004, T009, T010 | Gabriel |
| QA, documentação e integração | T012, T017, T019, T022, T023 | Matheus |

### Documentação complementar

- [Especificação e requisitos](specs/001-cadastro-listagem-sapos/spec.md)
- [Plano de implementação](specs/001-cadastro-listagem-sapos/plan.md)
- [Modelo de dados](specs/001-cadastro-listagem-sapos/data-model.md)
- [Contrato da API](specs/001-cadastro-listagem-sapos/contracts/api-sapos.md)
- [Lista de tarefas](specs/001-cadastro-listagem-sapos/tasks.md)
- [Guia de validação rápida](specs/001-cadastro-listagem-sapos/quickstart.md)
- [Relatório de validação](specs/001-cadastro-listagem-sapos/evidencias/relatorio.md)

## Solução de problemas

| Situação | O que verificar |
|---|---|
| A listagem não carrega | Confirme que `npm run api` está ativo na porta 3001; depois, clique em “Tentar novamente” |
| O cadastro falha | Verifique o terminal da API e envie novamente; os dados preenchidos são preservados |
| A aplicação usa outra porta | Consulte o endereço informado pelo Vite no terminal |
| Os registros iniciais não aparecem | Confira a coleção `sapos` no `db.json`; o arquivo pode ter sido alterado por cadastros ou testes |

## Limitações desta versão

- Execução local, com API simulada e armazenamento em arquivo.
- Sem autenticação ou controle de acesso.
- Sem edição, exclusão, busca, filtros ou paginação na interface.
- Sem funcionamento desconectado: consulta e cadastro dependem da API em execução.
- Foco em navegadores modernos em computadores; publicação em produção não faz parte do escopo.

## Reflexão

**Que decisão o agente teria tomado sozinho e a spec evitou?**

O agente podia ter decidido que sapos com o mesmo nome, espécie e região eram duplicados e bloquear
o cadastro. A especificação deixou claro que cada cadastro é uma observação diferente, então isso
não deveria ser impedido.

**Que inconsistência a validação encontrou? Estava na spec ou no código?**

A validação mostrou que o campo de período não estava sendo conferido no código, embora a
especificação dissesse que só podia ser noturno, diurno ou crepuscular. O problema estava no código
e foi corrigido.

**Como o framework ajudou (ou atrapalhou) a coordenação do grupo?**

Ajudou porque tudo ficou documentado: a especificação, as tarefas e os combinados ficaram no
repositório, e cada um conseguia ver qual era a sua parte. Atrapalhou um pouco porque a ferramenta
não avisa quando duas pessoas mexem no mesmo arquivo, e isso só apareceu na revisão. Também não
substituiu a conversa do grupo para alinhar o dia a dia.

**O que fariam diferente com outro framework?**

Com o BMAD, os papéis seriam mais divididos, e com o GSD o trabalho seria feito em etapas menores.
Com o OpenSpec seria mais leve. Mas, independentemente da ferramenta, a gente dividiria os arquivos
antes de começar e faria a validação mais cedo.
