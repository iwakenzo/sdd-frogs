# Especificação da Funcionalidade: FrogDex — Cadastro e Listagem de Sapos

**Branch da funcionalidade**: `001-cadastro-listagem-sapos`
**Criado em**: 2026-11-20


**Entrada**: Descrição do usuário: "Aplicação web para cadastrar e listar sapos, permitindo
registrar informações básicas sobre os animais e a região onde foram encontrados."

## Cenários de Usuário e Testes *(obrigatório)*

### História de Usuário 1 - Consultar o catálogo de sapos (Prioridade: P1)

O visitante abre o FrogDex e consulta todos os sapos registrados, com nome popular, espécie,
região encontrada, período de atividade, habitat e observações, sem precisar de conta.

**Por que esta prioridade**: é a proposta central do produto e entrega valor imediato com os
registros já existentes; também é o que comprova o resultado do cadastro.

**Teste independente**: com a fonte de dados disponível, abrir a aplicação e confirmar que os
registros aparecem completos e que os estados de carregamento, catálogo vazio e falha são
distintos e compreensíveis.

**Cenários de aceitação**:

1. **Dado** que existem sapos registrados, **quando** abro a aplicação, **então** vejo a lista
   com nome popular, espécie, região, período, habitat e observações de cada sapo.
2. **Dado** que não há registros, **quando** abro a aplicação, **então** vejo uma mensagem de
   catálogo vazio com convite para cadastrar o primeiro sapo.
3. **Dado** que a consulta falha, **quando** abro a aplicação, **então** vejo a mensagem
   "Não foi possível carregar os sapos" e uma ação para tentar novamente.
4. **Dado** que a consulta está em andamento, **quando** aguardo, **então** vejo indicação de
   carregamento, e não uma tela vazia ambígua.

---

### História de Usuário 2 - Cadastrar um sapo (Prioridade: P2)

O visitante preenche nome popular, espécie, região encontrada, período (noturno, diurno ou
crepuscular), habitat e observações; ao salvar, o novo sapo passa a fazer parte da listagem.

**Por que esta prioridade**: é o único caminho de entrada de dados e amplia o catálogo. Depende
da listagem existir para comprovar o resultado, por isso vem depois de P1.

**Teste independente**: cadastrar um sapo apenas com os três campos obrigatórios e confirmar que
ele aparece na listagem; repetir com campos vazios e confirmar o bloqueio.

**Cenários de aceitação**:

1. **Dado** o formulário vazio, **quando** informo nome, espécie e região e envio, **então** o
   sapo é salvo e aparece na listagem sem recarregar a página.
2. **Dado** todos os campos preenchidos, **quando** envio, **então** período, habitat e
   observações são preservados no registro exibido.
3. **Dado** que deixei nome, espécie ou região em branco ou só com espaços, **quando** tento
   enviar, **então** o envio é bloqueado e cada campo pendente é indicado em português.
4. **Dado** que o salvamento falha, **quando** envio um cadastro válido, **então** vejo
   "Não foi possível realizar o cadastro" e o formulário permanece preenchido para nova
   tentativa.
5. **Dado** um cadastro concluído, **quando** o formulário é reaproveitado, **então** os campos
   voltam ao estado inicial e um clique duplo não gera dois registros.

### Casos Limite

- Catálogo vazio e falha de carregamento MUST ser situações visualmente distintas.
- Falha de carregamento MUST permitir nova tentativa sem recarregar a página.
- Campos contendo apenas espaços MUST ser tratados como vazios na validação.
- Textos longos em habitat e observações MUST NOT quebrar o layout da listagem.
- Acentuação e caracteres especiais (ex.: "João", "São Paulo") MUST ser preservados no cadastro
  e na exibição.
- Registros duplicados (mesmo nome, espécie e região) são permitidos, pois representam
  observações distintas.
- Falha no envio MUST NOT descartar o que o usuário digitou.
- Centenas de registros MUST continuar navegáveis; paginação não faz parte desta versão.

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **FR-001**: O sistema MUST exibir, na tela inicial, a listagem de todos os sapos registrados.
- **FR-002**: A listagem MUST apresentar, para cada sapo, nome popular, espécie, região
  encontrada, período de atividade, habitat e observações.
- **FR-003**: O sistema MUST oferecer um formulário para cadastrar novo sapo.
- **FR-004**: O formulário MUST permitir informar nome popular, espécie, região encontrada,
  período (noturno, diurno ou crepuscular), habitat e observações.
- **FR-005**: O sistema MUST tratar nome popular, espécie e região encontrada como obrigatórios,
  aceitando período, habitat e observações em branco.
- **FR-006**: O sistema MUST impedir o envio quando um campo obrigatório estiver vazio ou contiver
  apenas espaços.
- **FR-007**: O sistema MUST indicar junto ao campo qual requisito obrigatório está pendente.
- **FR-008**: Após cadastro bem-sucedido, o sistema MUST exibir o novo sapo na listagem sem
  recarregar a página.
- **FR-009**: O sistema MUST limpar o formulário após cadastro bem-sucedido.
- **FR-010**: Quando o carregamento falhar, o sistema MUST informar que não foi possível carregar
  os sapos e oferecer nova tentativa.
- **FR-011**: Quando o cadastro falhar, o sistema MUST informar que não foi possível realizar o
  cadastro, preservando os dados digitados.
- **FR-012**: O sistema MUST manter os registros entre recarregamentos e sessões.
- **FR-013**: O sistema MUST apresentar textos de interface, validações e mensagens de erro em
  português do Brasil, com acentuação correta.
- **FR-014**: O sistema MUST indicar os estados de carregamento e de envio em andamento,
  impedindo envios duplicados.

### Restrições Técnicas Fornecidas *(não substituem os requisitos funcionais)*

- **NFR-001**: Interface web executada em navegador moderno, construída com React e Vite.
- **NFR-002**: Código organizado nas pastas `src/api`, `src/components` e `src/pages`
  (nomes padrão do template Vite, exceção expressa no Princípio I da constituição; arquivos e
  identificadores dentro delas permanecem em português).
- **NFR-003**: Comunicação com a fonte de dados por requisições HTTP.
- **NFR-004**: Persistência dos registros por meio do JSON Server.
- **NFR-005**: Nomes de campos e identificadores exigidos pelo serviço de dados são aceitos como
  exceção prevista no Princípio I da constituição.

### Entidades-Chave

- **Sapo**: representa uma observação registrada no catálogo. Atributos: nome popular
  (obrigatório), espécie (obrigatório), região encontrada (obrigatório), período de atividade
  (noturno, diurno ou crepuscular), habitat, observações e identificador único atribuído pela
  fonte de dados.
- **Região encontrada**: local descritivo informado pelo usuário; não há cadastro separado de
  regiões nesta versão.

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **SC-001**: Com a fonte de dados disponível, 100% dos registros salvos aparecem na listagem ao
  abrir a aplicação.
- **SC-002**: Um usuário conclui um cadastro válido em até 1 minuto, sem consultar ajuda.
- **SC-003**: 100% das tentativas de envio com obrigatórios vazios ou só com espaços são
  bloqueadas, com indicação do campo pendente.
- **SC-004**: Após cadastro bem-sucedido, o novo registro fica visível em até 2 segundos, sem
  recarregar a página.
- **SC-005**: 100% das falhas de comunicação exibem mensagem em português que distingue falha de
  carregamento, falha de cadastro e catálogo vazio.
- **SC-006**: Em validação com 5 pessoas do time, ao menos 4 concluem o cadastro na primeira
  tentativa sem orientação.

## Premissas

- Escopo desta versão: apenas listar e cadastrar. Editar, excluir, buscar, filtrar e paginar estão
  fora.
- Não há autenticação nem perfis; qualquer visitante pode consultar e cadastrar.
- Cada cadastro é uma observação, não um indivíduo único; duplicidades são permitidas.
- A listagem exibe os registros mais recentes primeiro, para tornar visível o cadastro recém-feito.
- O serviço de dados roda localmente, já contém alguns registros e responde por HTTP na mesma
  máquina da aplicação.
- Não há requisito de uso offline; indisponibilidades são tratadas com mensagem e nova tentativa.
- Navegador moderno em desktop é o alvo; layout responsivo é desejável, mas não bloqueante.
- Textos e mensagens em português do Brasil, conforme a constituição do projeto.
