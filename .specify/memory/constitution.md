<!--
Sync Impact Report
- Versão: 1.0.0 → 1.0.1
- Tipo de incremento: PATCH (esclarecimento de exceção já existente, sem novo princípio)
- Princípios modificados:
  - I. Idioma do Código em Português: exceção explícita para as pastas de infraestrutura
    (`src/api`, `src/components`, `src/pages`) e para pastas e arquivos gerados pelo template
    Vite; proibição de pastas novas com nome em inglês
  - II. Componentização React: caminho do diretório de componentes corrigido de
    `src/componentes/` para `src/components/`, alinhado à exceção do Princípio I
- Seções adicionadas: nenhuma
- Seções removidas: nenhuma
- Governança: inalterada
- TODOs: nenhum
- Ajustes dependentes: `spec.md` (NFR-002 e NFR-005), `checklists/requirements.md`, `plan.md`
  e `research.md` da funcionalidade 001 deixam de registrar violação e passam a citar a
  exceção constitucional; `src/utils/` renomeado para `src/utilitarios/` nos artefatos
-->

# Constituição do SDD Frogs

## Princípios Fundamentais

### I. Idioma do Código em Português (NÃO NEGOCIÁVEL)

Todo artefato de código produzido no projeto MUST ser escrito em português do Brasil:
nomes de variáveis, funções, componentes, hooks, arquivos e pastas, comentários,
documentação interna, nomes de testes, textos de interface, mensagens de erro e mensagens
de commit.

- Identificadores MUST NOT misturar idiomas (correto: `listarUsuarios`, `botaoContador`;
  incorreto: `getUsuarios`, `buttonContador`).
- Exceções permitidas: palavras-chave da linguagem, APIs e convenções obrigatórias de
  bibliotecas (`useState`, `useEffect`, `className`, `onClick`, `children`), nomes de
  pacotes de terceiros e arquivos cujo nome é exigido por ferramentas externas.
- Pastas de infraestrutura MUST manter o nome definido pelo projeto ou pela ferramenta:
  `src/api`, `src/components` e `src/pages` (estrutura exigida do projeto) e `src/assets`,
  `public/`, `index.html`, `vite.config.js` e `src/main.jsx` (gerados pelo template Vite).
- Dentro dessas pastas, arquivos, componentes, hooks, funções e variáveis criados pelo time MUST
  ter nome em português (ex.: `src/components/CartaoSapo.jsx`); nenhuma pasta nova criada pelo
  time MUST ter nome em inglês (ex.: `src/utilitarios/`, não `src/utils/`).
- Textos exibidos ao usuário MUST usar acentuação correta e linguagem clara.

**Racional**: o time e a avaliação leem em português; a consistência de idioma reduz
custo cognitivo e evita identificadores híbridos difíceis de manter.

### II. Componentização React com Responsabilidade Única

Cada componente MUST ter uma única responsabilidade e viver em `src/components/`.

- Estado MUST residir no menor nível possível; estado derivável MUST ser calculado, não armazenado.
- Arquivos de componente SHOULD permanecer abaixo de 200 linhas; acima disso, a
  responsabilidade MUST ser dividida.
- Props MUST ser explícitas e nomeadas em português; componentes MUST NOT depender de
  estado global implícito.

**Racional**: componentes pequenos e previsíveis são testáveis isoladamente e reduzem
regressões em telas compartilhadas.

### III. Simplicidade e YAGNI

A solução implementada MUST ser a menor que atende ao requisito aprovado na spec.

- Nenhuma dependência nova sem justificativa registrada na spec ou no plan.
- Abstrações especulativas, camadas intermediárias e otimizações prematuras são proibidas.
- Estado global ou biblioteca de estado MUST NOT ser introduzido sem necessidade comprovada
  por requisito.
- Código morto, comentários obsoletos e arquivos não utilizados MUST ser removidos na
  mesma mudança que os torna obsoletos.
- Duplicação SHOULD ser tolerada até a terceira ocorrência; só então MUST ser abstraída.

**Racional**: o projeto é um front-end didático; complexidade não justificada encarece
revisão e manutenção.

### IV. Qualidade Verificável

Nenhuma tarefa MUST ser considerada concluída sem verificação objetiva.

- `npm run lint` MUST passar sem erros nem avisos novos.
- `npm run build` MUST concluir com sucesso.
- Cada funcionalidade MUST ser validada no navegador, cobrindo o fluxo principal e ao
  menos um caso de erro ou entrada inválida.
- Todos os critérios de aceitação da spec MUST ser verificados item a item antes da
  conclusão.
- Commits MUST ser pequenos, em português e no imperativo, seguindo Conventional Commits
  com descrição em pt-BR (ex.: `feat: adiciona contador de sapos`).

**Racional**: critérios verificáveis evitam "pronto" subjetivo e tornam a revisão repetível.

## Restrições Técnicas

- Stack fixa: React 19, Vite 8, JavaScript moderno (ESM), CSS puro e Oxlint.
- Introdução de TypeScript, framework de UI ou biblioteca de estado exige emenda a esta
  constituição.
- Estilos MUST ficar em arquivos `.css` junto ao componente correspondente; classes em
  português no padrão `kebab-case`.
- O estilo vigente MUST ser preservado: aspas simples, sem ponto e vírgula ao final das
  linhas e indentação de 2 espaços.
- Nenhuma credencial, token ou dado sensível MUST ser versionado.

## Fluxo de Desenvolvimento

- Toda mudança MUST seguir o fluxo Spec Kit: `/speckit.specify` → `/speckit.plan` →
  `/speckit.tasks` → `/speckit.implement`.
- Implementação MUST NOT começar sem spec aprovada.
- Toda revisão MUST verificar conformidade com os quatro princípios e registrar qualquer
  violação justificada.
- Recomendações (não bloqueantes): HTML semântico, `alt` em imagens, rótulos em campos de
  formulário, navegação por teclado e contraste adequado.
- Definição de pronto: lint e build limpos, critérios de aceitação verificados, textos de
  interface em português e nenhum placeholder pendente.

## Governança

- Esta constituição prevalece sobre quaisquer outras práticas, guias ou preferências
  individuais do projeto.
- Emendas MUST ser propostas por escrito, com justificativa, impacto nos templates
  dependentes e aprovação do time.
- Versionamento semântico: MAJOR para remoção ou redefinição incompatível de princípio;
  MINOR para novo princípio, nova seção ou orientação materialmente ampliada; PATCH para
  clarificações e correções sem mudança de sentido.
- Toda revisão de código MUST verificar conformidade; complexidade adicional MUST ser
  justificada no plan.
- A conformidade MUST ser reavaliada a cada nova funcionalidade, antes da implementação.

**Version**: 1.0.1 | **Ratified**: 2026-11-20 | **Last Amended**: 2026-11-20
