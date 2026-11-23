# Guia de Validação Rápida: FrogDex

**Funcionalidade**: 001-cadastro-listagem-sapos
**Objetivo**: provar de ponta a ponta que listagem e cadastro funcionam, incluindo os tratamentos de
erro exigidos pela spec.

## Pré-requisitos

- Node.js compatível com Vite 8 (ambiente validado: 24.19.0) e npm instalados.
- Portas 5173 (Vite) e 3001 (JSON Server) livres.
- Nenhuma autenticação necessária.

## Preparação

```bash
npm install
```

O `db.json` na raiz deve conter a coleção `sapos` com 3 registros iniciais (formato em
[data-model.md](./data-model.md)).

O JSON Server 0.17.4 já faz parte das dependências. Antes de testar, use uma cópia da base para
não perder observações existentes. Em PowerShell, crie uma cópia e inicie a API isolada:

```powershell
Copy-Item db.json "$env:TEMP\frogdex-validacao.json"
npx json-server --watch "$env:TEMP\frogdex-validacao.json" --port 3001
```

Nesse modo, esse comando substitui `npm run api`; não inicie os dois na mesma porta. Os passos
que mencionam alterar a base devem ser feitos somente nessa cópia. Ao encerrar, o `db.json`
original deve continuar intacto. Guarde os resultados antes de descartar a cópia de teste.

## Execução

Dois terminais, na raiz do projeto:

```bash
# terminal 1 — mock de dados
npm run api      # json-server --watch db.json --port 3001

# terminal 2 — aplicação
npm run dev      # Vite em http://localhost:5173
```

Conferência rápida da API: `http://localhost:3001/sapos` deve retornar o array JSON.

## Cenários de validação

### 1. Listar sapos (FR-001, FR-002, CA01, SC-001)

1. Abrir `http://localhost:5173`.
2. Observar a lista carregada com os 3 registros iniciais.

**Esperado**: cada card mostra nome popular, espécie, região encontrada, período, habitat e
observações; campos opcionais vazios aparecem como "não informado"; nenhum recarregamento manual é
necessário.

### 2. Cadastrar sapo (FR-003 a FR-009, FR-012, CA02, CA04, SC-004)

1. Preencher apenas nome popular, espécie e região encontrada.
2. Enviar o formulário.

**Esperado**: botão indica envio em andamento; o novo registro aparece no topo da lista em até 2 s
sem recarregar a página; o formulário volta ao estado inicial; o registro continua presente após
recarregar a página (FR-012).

3. Reiniciar a API com o mesmo arquivo e recarregar a aplicação.

**Esperado**: o registro continua presente, com identificador gerado pelo servidor e opcionais
exibidos como "não informado".

### 3. Bloqueio de campos obrigatórios (FR-005 a FR-007, CA03, SC-003)

1. Tentar enviar o formulário vazio.
2. Repetir preenchendo os três campos apenas com espaços.
3. Preencher nome e espécie, deixando a região vazia.

**Esperado**: nenhuma requisição é enviada; mensagens por campo em português identificam o que falta;
o envio é liberado apenas quando os três campos têm conteúdo real.

### 4. Falha ao carregar a listagem (FR-010, CE01, CA05)

1. Parar o terminal do JSON Server.
2. Recarregar a aplicação.

**Esperado**: mensagem "Não foi possível carregar os sapos." com ação "Tentar novamente"; a tela não
fica em carregamento infinito nem exibe catálogo vazio.

3. Religar o JSON Server e acionar "Tentar novamente".

**Esperado**: a lista carrega sem recarregar a página.

4. Repetir com resposta HTTP 500 no GET, usando interceptação nas ferramentas de teste do navegador.
5. Confirmar que o botão de recuperação pode receber foco por teclado e ser acionado com Enter.

**Esperado**: respostas não 2xx recebem o mesmo tratamento de falha; o foco é visível.

### 5. Falha ao cadastrar (FR-011, CE02, CE03, CA05)

1. Parar o JSON Server.
2. Preencher um cadastro válido e enviar.

**Esperado**: mensagem "Não foi possível realizar o cadastro."; todos os campos permanecem
preenchidos; o formulário continua editável.

3. Religar o JSON Server e enviar novamente.

**Esperado**: o cadastro conclui e o registro aparece no topo da lista.

4. Repetir com resposta HTTP 503 no POST, por interceptação no navegador.

**Esperado**: mensagem de falha e valores preservados, inclusive período, habitat e observações.

### 6. Catálogo vazio (história P1, cenário 2)

1. Editar a cópia de teste para `{ "sapos": [] }` e aguardar a recarga do JSON Server.
2. Recarregar a aplicação.

**Esperado**: mensagem de catálogo vazio com convite para cadastrar o primeiro sapo, visualmente
distinta da mensagem de erro.

3. Cadastrar o primeiro sapo.

**Esperado**: o cartão aparece e a mensagem de catálogo vazio desaparece.

### 7. Campos opcionais, limites, caracteres especiais e duplicidades

1. Cadastrar todos os campos, incluindo acentos e espaços nas extremidades (ex.: " Sapo São João ").
2. Verificar o texto normalizado na lista e os três períodos permitidos, além da opção vazia.
3. Testar os limites exatos: nome 80, espécie 120, região 120, habitat 200 e observações 500.
4. Tentar enviar cada campo com um caractere além de seu limite.
5. Em inspeção controlada do navegador, inserir uma opção de período desconhecida no seletor e enviar.
6. Repetir um cadastro com o mesmo nome, espécie e região.
7. Verificar o catálogo com textos longos sem espaços em larguras de 1366 e 320 px.

**Esperado**: limites exatos são aceitos; excessos e período desconhecido são bloqueados, com
mensagem associada ao campo e sem POST. Acentos são preservados, espaços externos removidos,
opcionais persistidos e duplicidades intencionais permitidas. Os textos não ultrapassam os cartões.

### 8. Envio simultâneo e concorrência (FR-014)

1. Atrasar o POST por interceptação ou limitação de rede e tentar enviar duas vezes em sequência.
2. Conferir o botão desabilitado e a indicação "Cadastrando..." durante a espera.
3. Em nova abertura, atrasar o GET e cadastrar antes que a consulta termine.
4. Liberar o GET, inclusive com uma resposta anterior ao cadastro.
5. Repetir com falha inicial no GET, POST bem-sucedido e posterior nova tentativa de consulta.

**Esperado**: um envio em andamento gera somente um POST. O registro retornado fica visível sem
exigir outro GET, e a conclusão da consulta não apaga nem duplica o cadastro. Após falha inicial,
a mensagem de consulta permanece recuperável sem ocultar o registro recém-criado.

### 9. Desempenho e navegação (SC-001, SC-004 e metas do plano)

1. Preencher a cópia de teste com 100 registros válidos, com identificadores distintos.
2. Medir da abertura/recarregamento até a presença dos 100 cartões renderizados.
3. Conferir a ordem e a navegação até o último cartão.
4. Cadastrar uma nova observação e medir da resposta do POST até o cartão visível no topo.

**Esperado**: listagem em até 2 s e inserção em até 2 s após o POST, sem recarregar a página.
Registrar navegador, máquina, condições de rede e se houve aquecimento prévio do servidor/cache.

### 10. Usabilidade com a equipe (SC-002 e SC-006)

1. Convidar cinco pessoas do time e apresentar somente o objetivo: cadastrar uma observação de sapo.
2. Não explicar os campos nem orientar durante a tentativa; não usar automação como participante.
3. Cronometrar do início da interação até o cadastro concluído e anotar ajuda, erros e sucesso inicial.
4. Registrar data e responsável pela observação, usando identificadores P1 a P5 para participantes.

**Esperado**: ao menos quatro de cinco pessoas concluem na primeira tentativa sem orientação
(SC-006); registrar também o atendimento ao tempo de até 1 minuto para um cadastro sem ajuda
(SC-002). Não concluir esses critérios com base apenas na velocidade de um roteiro automatizado.

| Participante | Tempo | Sucesso na primeira tentativa | Sem orientação | Observações |
|---|---|---|---|---|
| P1 | Pendente | Pendente | Pendente | — |
| P2 | Pendente | Pendente | Pendente | — |
| P3 | Pendente | Pendente | Pendente | — |
| P4 | Pendente | Pendente | Pendente | — |
| P5 | Pendente | Pendente | Pendente | — |

## Verificação de qualidade (Princípio IV)

```bash
npm run lint
npm run build
```

**Esperado**: sem erros e sem avisos novos; build conclui com sucesso.

## Registro de evidências

Para cada cenário, registrar data, responsável, ambiente, resultado obtido e captura de tela. Os
cenários 1 a 9 cobrem a validação técnica; SC-002 e SC-006 dependem do cenário humano 10.
CA01 a CA05 são referências históricas dos artefatos de design e ficam cobertos pelos cenários
1, 2, 3, 4 e 5; os requisitos normativos estão identificados como FR-### na especificação.

O relatório da integração e as capturas estão em [evidencias/relatorio.md](./evidencias/relatorio.md).
A execução assistida em navegador não substitui os cinco participantes do cenário 10.

## Solução de problemas

| Sintoma | Causa provável | Ação |
|---|---|---|
| Lista sempre em erro | JSON Server não iniciado ou porta diferente | confirmar `npm run api` e a porta 3001 |
| `404` em `/api/sapos` | reescrita do proxy ausente no `vite.config.js` | revisar a regra de proxy |
| Cadastro não persiste após reiniciar | JSON Server iniciado sem `--watch` | usar o script `npm run api` |
| Erro de CORS | requisição direta à porta 3001 | usar caminhos `/api/...` |
