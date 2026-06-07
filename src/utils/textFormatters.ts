// =============================================================
// utils/textFormatters.ts
// Funcoes "puras": recebem um valor, devolvem outro, e NAO mexem
// em nada de fora. Cada parametro e cada retorno tem tipo explicito.
// =============================================================

import { PokemonResumo } from "../models/Pokemon";

// Deixa a primeira letra maiuscula. Ex: "pikachu" -> "Pikachu"
export function capitalizar(texto: string): string {
  if (texto.length === 0) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Monta a linha de exibicao de UM pokemon no terminal.
// Ex: #25 - Pikachu | Tipos: electric | Altura: 4 | Peso: 60
export function formatarLinhaPokemon(pokemon: PokemonResumo): string {
  const tipos = pokemon.tipos.join(", ");
  return `#${pokemon.id} - ${capitalizar(pokemon.nome)} | Tipos: ${tipos} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso} | HP: ${pokemon.hp} | Atq: ${pokemon.ataque} | Def: ${pokemon.defesa}`;
}
