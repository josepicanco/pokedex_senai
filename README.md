# pokedex_senai

## Sobre o projeto

O pokedex_senai é uma aplicação simples em Node.js com TypeScript que consulta dados de Pokémon na PokeAPI e organiza alguns resultados em um catálogo local durante a execução do programa.

## Objetivo

Praticar os principais conceitos do Módulo 01:

- Node.js;
- JavaScript no back-end;
- TypeScript;
- interfaces;
- funções tipadas;
- arrays;
- objetos;
- JSON;
- métodos de array;
- classes;
- async/await;
- fetch;
- tratamento de erros;
- GitHub;
- GitFlow;
- Kanban.

## Tecnologias utilizadas

- Node.js
- TypeScript
- TSX
- node-fetch
- PokeAPI
- Git
- GitHub

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- Git

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/josepicanco/pokedex_senai.git
```

Acesse a pasta do projeto:

```bash
cd pokedex_senai
```

Instale as dependências:

```bash
npm install
```

## Como executar

Execute o projeto em ambiente de desenvolvimento (compila e roda com recarga automática):

```bash
npm run dev
```

Ou gere o build e execute a versão compilada:

```bash
npm run build
npm run start
```

## Estrutura do projeto

```
pokedex_senai/
│
├── src/
│   ├── main.ts                       # ponto de entrada: cria os services e roda o fluxo
│   ├── controllers/
│   │   └── TerminalController.ts     # camada de interface (mensagens no terminal)
│   ├── services/
│   │   ├── PokeApiService.ts         # consulta a PokeAPI (fetch + async/await)
│   │   └── CatalagoPokemon.ts        # persistência local no pc_box.json
│   ├── models/
│   │   ├── Pokemon.ts                # interfaces dos dados
│   │   └── CustomErrors.ts           # erros customizados
│   └── utils/
│       └── textFormatters.ts         # funções puras de formatação
│
├── pc_box.json                       # catálogo local (persistência)
├── package.json
├── tsconfig.json
└── README.md
```

## Funcionalidades

- Buscar Pokémon por nome ou ID
- Tratar erro de Pokémon inexistente
- Transformar resposta da API em objeto simplificado
- Adicionar Pokémon ao catálogo local
- Impedir Pokémon duplicado
- Listar catálogo
- Remover Pokémon por ID
- Exibir mensagens no terminal

## Exemplos de execução

### Busca válida

Entrada testada:

```
pikachu
```

Saída obtida:

```
[OK] Pokemon encontrado: pikachu
#25 - Pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Atq: 55 | Def: 40
[OK] pikachu adicionado ao catalogo.
```

### Busca inválida

Entrada testada:

```
pokemon-inexistente
```

Saída obtida:

```
[ERRO] Pokemon nao encontrado: pokemon-inexistente
```

### Duplicidade

Entrada testada:

```
adicionar pikachu duas vezes
```

Saída obtida:

```
[AVISO] pikachu ja esta no catalogo.
```

### Remoção

Entrada testada:

```
remover ID 25
```

Saída obtida:

```
[OK] Pokemon removido do catalogo.
```

## Conceitos aplicados

### TypeScript

O TypeScript é usado em todos os arquivos do `src/`. As funções têm parâmetros e retornos
tipados — por exemplo, `buscarPokemon(nomeOuId: string): Promise<PokemonResumo>`. Os dados
são descritos por interfaces (em `models/Pokemon.ts`) e o `tsconfig.json` está com o modo
`strict` ligado, que obriga a tratar tipos e valores nulos de forma explícita.

### Interface PokemonResumo

É o molde do objeto simplificado que o programa usa internamente, com `id`, `nome`, `tipos`,
`altura`, `peso`, `hp`, `ataque` e `defesa`. Ela separa o formato limpo usado pela aplicação
do JSON cru e gigante que a PokeAPI devolve (esse JSON cru é descrito por outra interface,
`PokemonApiResponse`).

### Fetch e async/await

No método `PokeApiService.buscarPokemon`, o `fetch` (via `node-fetch`) consulta a PokeAPI.
Como a busca depende da internet e demora, a função é `async` e usa `await` para esperar a
resposta chegar antes de seguir adiante, evitando travar o restante do programa.

### Tratamento de erros

Um bloco `try/catch` no service protege a busca. Quando a API responde `404` (Pokémon não
existe), `resposta.ok` é `false` e o programa lança um `APIError`. O `TerminalController`
captura esse erro e exibe a mensagem `[ERRO] ...` sem quebrar a execução. Erros inesperados
(como falta de internet) também são convertidos em `APIError`.

### Métodos de array

- `.map()` — transforma a lista de tipos da API em uma lista de nomes (`PokeApiService`).
- `.find()` — localiza cada estatística (hp, attack, defense) dentro de `stats` (`PokeApiService`).
- `.some()` — verifica se um Pokémon já existe no catálogo antes de adicionar e antes de remover (`CatalogoPokemon`).
- `.filter()` — remove um Pokémon do catálogo pelo `id` (`CatalogoPokemon`).
- `.forEach()` — percorre e imprime o catálogo no terminal (`TerminalController`).

### Classe CatalogoPokemon

A classe `CatalogoPokemon` cuida da persistência local. Tem um atributo privado
`caminhoArquivo` (o caminho do `pc_box.json`) e os métodos públicos `adicionar` (bloqueia
duplicados), `listar` e `remover` (por id). Internamente usa os métodos privados
`lerCatalogo` e `salvarCatalogo`, que leem e gravam o arquivo JSON com `node:fs/promises`.

> O projeto também usa outras classes: `PokeApiService` (consulta à API) e
> `TerminalController` (interface no terminal, recebendo os services por injeção de dependência).

## Organização do Kanban

Link do Kanban: https://github.com/users/josepicanco/projects/2

## Branches utilizadas

- main
- develop
- feat/pokedex
- docs/readme

## Melhorias futuras

- Criar menu interativo no terminal
- Criar filtros por tipo de Pokémon
- Criar uma API própria com Express
