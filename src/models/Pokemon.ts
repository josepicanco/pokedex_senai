// =============================================================
// models/Pokemon.ts
// Aqui ficam os "moldes" dos dados. No TypeScript, uma interface
// descreve qual o formato de um objeto: quais campos ele tem e de
// que tipo cada um e. E parecido com definir os parametros que um
// elemento do Revit precisa ter antes de preencher.
// =============================================================

// ---- RF03: molde da resposta CRUA que vem da PokeAPI ----
// A API devolve um JSON gigante. Aqui mapeamos SO os campos que
// vamos realmente usar. Os outros campos do JSON sao ignorados.
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[]; // <- o [] significa "um array de objetos com esse formato"
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

// ---- RF02: molde do nosso objeto SIMPLIFICADO ----
// Depois de buscar na API, transformamos o JSON cru nesse formato
// limpo, que e o que o resto do programa enxerga.
export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[]; // array de strings, ex: ["electric"]
  altura: number;
  peso: number;
  hp: number;
  ataque: number;
  defesa: number;
}
