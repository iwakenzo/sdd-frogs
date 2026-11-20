# Modelo de Dados: FrogDex

**Funcionalidade**: 001-cadastro-listagem-sapos
**Fonte**: [spec.md](./spec.md) — RF-002, RF-004, RF-005, RF-012

## Entidade: Sapo

Representa uma observação de sapo registrada no catálogo. Não há unicidade: o mesmo nome, espécie e
região podem aparecer em registros distintos.

| Campo | Tipo | Obrigatório | Regra de validação | Origem |
|---|---|---|---|---|
| `id` | número | gerado | atribuído pelo JSON Server; nunca enviado no `POST` | JSON Server |
| `nomePopular` | texto | sim | 1 a 80 caracteres após `trim` | RF-004, RF-005, RN-01 |
| `especie` | texto | sim | 1 a 120 caracteres após `trim` | RF-004, RF-005, RN-01 |
| `regiaoEncontrada` | texto | sim | 1 a 120 caracteres após `trim` | RF-004, RF-005, RN-01 |
| `periodo` | texto enumerado | não | `noturno`, `diurno` ou `crepuscular`; vazio significa não informado | RF-003, RF-004 |
| `habitat` | texto | não | até 200 caracteres após `trim` | RF-003, RF-004 |
| `observacoes` | texto | não | até 500 caracteres após `trim` | RF-003, RF-004 |

### Representação persistida

```json
{
  "sapos": [
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
}
```

### Regras de validação e mensagens

| Situação | Mensagem exibida |
|---|---|
| `nomePopular` vazio ou só com espaços | "Informe o nome popular do sapo." |
| `especie` vazia ou só com espaços | "Informe a espécie." |
| `regiaoEncontrada` vazia ou só com espaços | "Informe a região encontrada." |
| Texto acima do limite do campo | "Este campo deve ter no máximo N caracteres." |

Campos opcionais em branco são enviados como string vazia ou omitidos; a exibição trata ambos como
"não informado".

## Estados

### Lista de sapos

| Estado | Gatilho | O que o usuário vê |
|---|---|---|
| `carregando` | consulta inicial ou nova tentativa | indicador de carregamento |
| `pronta` | resposta 200 com ao menos um registro | cards dos sapos |
| `vazia` | resposta 200 com lista vazia | "Nenhum sapo cadastrado ainda." + convite para cadastrar |
| `erro` | falha de rede ou resposta não 2xx | "Não foi possível carregar os sapos." + ação "Tentar novamente" |

Transições: `carregando → pronta | vazia | erro`; `erro → carregando` (nova tentativa);
`pronta → pronta` (registro inserido após cadastro).

### Formulário

| Estado | Gatilho | Efeito |
|---|---|---|
| `ocioso` | abertura ou limpeza | campos editáveis, sem mensagens |
| `inválido` | envio com campo obrigatório pendente | envio bloqueado, mensagens por campo |
| `enviando` | envio válido | botão desabilitado, indicador de envio |
| `sucesso` | resposta 2xx do `POST` | campos limpos, registro no topo da lista |
| `erro` | falha de rede ou resposta não 2xx | "Não foi possível realizar o cadastro.", dados preservados |

Transições: `ocioso → inválido` (retorna a `ocioso` ao corrigir), `ocioso → enviando → sucesso |
erro`, `erro → enviando` (nova tentativa), `sucesso → ocioso`.

## Relacionamentos

Não há entidades relacionadas nesta versão. `regiaoEncontrada` é texto livre; não existe catálogo de
regiões nem vínculo entre registros.

## Persistência e ciclo de vida

- Fonte única: coleção `sapos` do `db.json`, exposta pelo JSON Server na porta 3001.
- Os dados sobrevivem a recarregamentos da página e a reinícios do Vite, pois ficam no arquivo.
- Reiniciar o JSON Server com `--watch` preserva o arquivo; apagar o `db.json` perde os registros.
- Nenhuma migração ou versionamento de esquema é necessário nesta versão.
