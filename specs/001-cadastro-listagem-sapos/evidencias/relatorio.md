# Relatório de integração e validação — FrogDex

**Data:** 2026-11-23, execução final às 13:34:38 UTC (10:34:38 UTC−03:00).
**Responsável técnico:** agente de integração, a pedido do mantenedor.
**Branch:** `dev`, base `6891d7e`, acrescida das alterações de conformidade desta entrega.
**Situação:** validação técnica aprovada; aceitação humana SC-002/SC-006 pendente.

## Ambiente e método

- Windows, Node.js 24.19.0, Edge 158.0.4370.33 em modo sem interface gráfica.
- Aplicação real React/Vite, com o plugin e a regra de reescrita de `vite.config.js`.
- JSON Server 0.17.4 real, com cópia de `db.json` em diretório temporário fora do repositório.
- Portas isoladas 15173 (Vite) e 15301 (API), para não interferir nos serviços do desenvolvedor.
- Verificação assistida por um roteiro temporário com Playwright Core instalado fora do projeto.
  Não foram adicionados testes permanentes, scripts npm ou dependências ao projeto.
- Falhas de rede verificadas parando a API; respostas HTTP 500/503 e consultas atrasadas
  verificadas por interceptação no navegador. Nenhuma intervenção manual foi contada como usuário.
- Capturas de tela revisadas para disposição visual, mensagens e quebra de textos longos.
- Serviços de teste encerrados ao fim da execução; nenhum cadastro de teste foi gravado na base original.

O arquivo [resultados.json](./resultados.json) registra os resultados e tempos efetivos. As
durações dos cenários incluem as ações e as capturas; não representam tempo de uso humano.
O roteiro manual reproduzível está em [quickstart.md](../quickstart.md).

Também passaram 38 verificações pontuais da função pura de validação, cobrindo os três períodos,
vazio/ausente, valores desconhecidos, limites exatos e excedentes, `trim` e preservação da entrada.
O resultado está em [validacao.json](./validacao.json).

## Cenários técnicos

| Cenário | Verificação realizada | Resultado | Evidência |
|---|---|---|---|
| 1 | Três cartões, ordem inversa de criação, campos, opcionais vazios e largura máxima de 1120 px | Aprovado | [Listagem](./01-listagem.png) |
| 2 | Cadastro mínimo, identificador numérico, limpeza, gravação no arquivo, recarga e reinício real da API | Aprovado | [Cadastro e persistência](./02-cadastro-persistencia.png) |
| 3 | Obrigatórios vazios/espaços, região ausente, excessos nos cinco textos e período desconhecido, sem POST | Aprovado | [Obrigatórios](./03-obrigatorios.png), [limite](./03-limite-observacoes.png), [período](./03-validacao.png) |
| 4 | API parada no GET, HTTP 500, botão com foco visível, recuperação com Enter sem recarregar | Aprovado | [Erro de listagem](./04-erro-listagem.png) |
| 5 | API parada no POST, HTTP 503, valores preservados e envio após recuperação | Aprovado | [Erro de cadastro](./05-erro-cadastro.png) |
| 6 | Lista vazia e transição para lista preenchida no primeiro cadastro | Aprovado | [Catálogo vazio](./06-catalogo-vazio.png) |
| 7 | Opcionais, acentuação, espaços externos, textos extensos, limites aceitos e duplicidades intencionais | Aprovado | [Tela de 320 px](./07-opcionais-tela-estreita.png) |
| 8a | Dois eventos de envio consecutivos resultam em um POST, sem `id` no corpo e com botão desabilitado | Aprovado | [Envio em andamento](./08-envio-em-andamento.png) |
| 8b | POST durante GET atrasado não é apagado nem duplicado pela resposta anterior | Aprovado | [Consulta em andamento](./08-consulta-em-andamento.png) |
| 8c | Cadastro após falha no GET continua visível; nova tentativa recupera a lista sem duplicação | Aprovado | Registro em `resultados.json` |
| 9 | Renderização de 100 registros, navegação ao último e inserção do 101º após o POST | Aprovado | [Fim da lista](./09-cem-registros.png) |
| 10 | Cinco pessoas reais usando o formulário sem orientação | **Pendente** | Exige participação da equipe |

### Desempenho

- **100 cartões renderizados:** 176 ms, da recarga ao total esperado no DOM (meta: até 2 s).
- **Novo cartão após resposta do POST:** 14 ms (meta: até 2 s).
- Servidor local, sem limitação de rede no cenário de desempenho, após os cenários anteriores
  terem aquecido o servidor e o navegador. São medidas desta execução, não garantia universal.
- Nenhum erro JavaScript de página observado durante os cenários.

### Proteção dos dados

A execução comparou os bytes de `db.json` antes e depois, sem diferenças. A cópia isolada foi
reiniciada para comprovar persistência. Hash SHA-256 da base original preservada:

```text
9F8DB625916E65D93B57F5DFC7B53AFE204B07D655AACD8FCCEC230538A9356C
```

## Rastreabilidade de requisitos

| Requisito da especificação | Evidência | Situação |
|---|---|---|
| FR-001 — Listar todos os registros | Cenários 1 e 9 | Aprovado |
| FR-002 — Exibir os seis campos | Cenários 1 e 7 | Aprovado |
| FR-003 — Oferecer formulário de cadastro | Cenário 2 | Aprovado |
| FR-004 — Permitir todos os campos previstos | Cenários 2 e 7; revisão das opções do seletor | Aprovado |
| FR-005 — Obrigatórios e opcionais | Cenários 2, 3 e 6 | Aprovado |
| FR-006 — Bloquear vazios e espaços | Cenário 3, sem requisição POST | Aprovado |
| FR-007 — Mensagem junto ao campo | Cenário 3, `aria-invalid` e mensagem associada | Aprovado |
| FR-008 — Inserir sem recarregar | Cenários 2, 8 e 9 | Aprovado |
| FR-009 — Limpar após sucesso | Cenários 2 e 5 | Aprovado |
| FR-010 — Erro de listagem e nova tentativa | Cenário 4 | Aprovado |
| FR-011 — Erro de cadastro preservando dados | Cenário 5 | Aprovado |
| FR-012 — Persistir entre sessões | Cenário 2, arquivo e reinício da API | Aprovado |
| FR-013 — Interface em português acentuado | Capturas e cenários 3, 4, 5 e 7 | Aprovado |
| FR-014 — Indicar carregamento/envio e impedir simultaneidade | Cenário 8 | Aprovado |
| SC-001 — Completude da listagem | Cenários 1 e 9 | Aprovado |
| SC-002 — Usuário cadastra em até 1 minuto sem ajuda | Cenário humano 10 | **Pendente** |
| SC-003 — Bloqueio de obrigatórios | Cenário 3 | Aprovado |
| SC-004 — Registro visível em até 2 s após cadastro | Cenários 2 e 9 | Aprovado |
| SC-005 — Distinguir falhas e catálogo vazio | Cenários 4, 5 e 6 | Aprovado |
| SC-006 — Quatro de cinco pessoas cadastram sem orientação | Cenário humano 10 | **Pendente** |

## Revisão da constituição — T022

| Área | Resultado |
|---|---|
| Idioma | Identificadores próprios e textos em português. Atualizadores de estado renomeados para `definir...`; propriedades DOM `name` e `value` acessadas com aliases em português. Nomes de APIs externas, ferramentas e arquivos do starter preservados conforme exceções. |
| Estrutura | Somente diretórios de infraestrutura autorizados em inglês; utilitários em `utilitarios`. Página orquestra os fluxos; componentes recebem propriedades explícitas. |
| Tamanho | `App`: 8 linhas; `CartaoSapo`: 48; `FormularioSapo`: 193; `ListaSapos`: 16; `MensagemStatus`: 25; `PaginaInicial`: 93. |
| Estilo | Aspas simples, indentação de dois espaços e estilos em CSS junto aos componentes/página. |
| Simplicidade | Sem novas dependências de aplicação, estado global ou funcionalidades fora do escopo. Apenas `fetch` para HTTP. |
| Limpeza | Assets e ícones não usados do starter removidos; `App.css` importado, estilos locais conectados e favicon ainda referenciado preservado. Sem marcadores TODO/FIXME no código-fonte revisado. |
| Contratos | Página conserva proteção de envio, descarte de consulta antiga e preservação de novos cadastros; formulário mantém contrato booleano de sucesso e falha. |
| Qualidade | `npm run lint` e `npm run build` aprovados na revisão final. Aceitação completa ainda depende de SC-002/SC-006. |

A T022 registra a revisão técnica, não uma dispensa dos critérios humanos. T012 e T017 foram
concluídas com execução no navegador e evidências; **T023 continua aberta** até concluir o cenário 10.

## Ação restante da equipe

Executar o cenário 10 do quickstart com cinco pessoas, registrar tempos e resultados reais,
e anexar as evidências ao relatório. Somente então avaliar SC-002/SC-006 e marcar T023 como concluída.
Não foram inventados nomes, participantes ou resultados para fechar o checklist.

## Histórico e entrega

- Merge da API: `f5f728a`, preservando `4dffb4d`.
- Merge do shell: `7329d33`, preservando `861a4cf`.
- Ajustes anteriores: `6891d7e`, já existente antes desta rodada.
- As frentes 4 e 5 já pertenciam ao histórico da `main` e continuam incorporadas.
- Nesta rodada: revisão de conformidade, atualização dos documentos e evidências; sem commit ou push.
- `PLANO-INTEGRACAO.md` continua local e não deve ser incluído no versionamento.
