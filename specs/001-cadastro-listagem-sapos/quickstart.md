# Guia de Validação Rápida: FrogDex

**Funcionalidade**: 001-cadastro-listagem-sapos
**Objetivo**: provar de ponta a ponta que listagem e cadastro funcionam, incluindo os tratamentos de
erro exigidos pela spec.

## Pré-requisitos

- Node.js 20 ou superior e npm instalados.
- Portas 5173 (Vite) e 3001 (JSON Server) livres.
- Nenhuma autenticação necessária.

## Preparação

```bash
npm install
npm install -D json-server@0.17.4
```

O `db.json` na raiz deve conter a coleção `sapos` com 3 registros iniciais (formato em
[data-model.md](./data-model.md)).

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

### 1. Listar sapos (RF-001, RF-002, CA01, SC-001)

1. Abrir `http://localhost:5173`.
2. Observar a lista carregada com os 3 registros iniciais.

**Esperado**: cada card mostra nome popular, espécie, região encontrada, período, habitat e
observações; campos opcionais vazios aparecem como "não informado"; nenhum recarregamento manual é
necessário.

### 2. Cadastrar sapo (RF-003 a RF-008, CA02, CA04, SC-004)

1. Preencher apenas nome popular, espécie e região encontrada.
2. Enviar o formulário.

**Esperado**: botão indica envio em andamento; o novo registro aparece no topo da lista em até 2 s
sem recarregar a página; o formulário volta ao estado inicial; o registro continua presente após
recarregar a página (RF-012).

### 3. Bloqueio de campos obrigatórios (RF-005 a RF-007, CA03, SC-003)

1. Tentar enviar o formulário vazio.
2. Repetir preenchendo os três campos apenas com espaços.
3. Preencher nome e espécie, deixando a região vazia.

**Esperado**: nenhuma requisição é enviada; mensagens por campo em português identificam o que falta;
o envio é liberado apenas quando os três campos têm conteúdo real.

### 4. Falha ao carregar a listagem (RF-010, CE01, CA05)

1. Parar o terminal do JSON Server.
2. Recarregar a aplicação.

**Esperado**: mensagem "Não foi possível carregar os sapos." com ação "Tentar novamente"; a tela não
fica em carregamento infinito nem exibe catálogo vazio.

3. Religar o JSON Server e acionar "Tentar novamente".

**Esperado**: a lista carrega sem recarregar a página.

### 5. Falha ao cadastrar (RF-011, CE02, CE03, CA05)

1. Parar o JSON Server.
2. Preencher um cadastro válido e enviar.

**Esperado**: mensagem "Não foi possível realizar o cadastro."; todos os campos permanecem
preenchidos; o formulário continua editável.

3. Religar o JSON Server e enviar novamente.

**Esperado**: o cadastro conclui e o registro aparece no topo da lista.

### 6. Catálogo vazio (história P1, cenário 2)

1. Editar o `db.json` para `{ "sapos": [] }` e aguardar a recarga do JSON Server.
2. Recarregar a aplicação.

**Esperado**: mensagem de catálogo vazio com convite para cadastrar o primeiro sapo, visualmente
distinta da mensagem de erro.

## Verificação de qualidade (Princípio IV)

```bash
npm run lint
npm run build
```

**Esperado**: sem erros e sem avisos novos; build conclui com sucesso.

## Registro de evidências

Para cada cenário, registrar: data, responsável, resultado obtido e captura de tela. Cenários 1 a 6
correspondem aos critérios SC-001 a SC-006; CA01 a CA05 ficam cobertos pelos cenários 1, 2, 3, 4 e 5.

## Solução de problemas

| Sintoma | Causa provável | Ação |
|---|---|---|
| Lista sempre em erro | JSON Server não iniciado ou porta diferente | confirmar `npm run api` e a porta 3001 |
| `404` em `/api/sapos` | reescrita do proxy ausente no `vite.config.js` | revisar a regra de proxy |
| Cadastro não persiste após reiniciar | JSON Server iniciado sem `--watch` | usar o script `npm run api` |
| Erro de CORS | requisição direta à porta 3001 | usar caminhos `/api/...` |
