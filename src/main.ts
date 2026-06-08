// =============================================================
// main.ts
// Ponto de entrada. Aqui criamos os services, INJETAMOS eles no
// controller e rodamos o fluxo de demonstracao (RF13).
// =============================================================

import { PokeApiService } from "./services/PokeApiService";
import { CatalogoPokemon } from "./services/CatalagoPokemon";
import { TerminalController } from "./controllers/TerminalController";

async function main(): Promise<void> {
  // 1. cria os services
  const api = new PokeApiService();
  const box = new CatalogoPokemon("pc_box.json");

  // 2. injeta os services no controller
  const app = new TerminalController(api, box);

  console.log("==== Pokedex TypeScript Lite ====\n");

  // 3. fluxo de demonstracao
  await app.buscarEAdicionar("pikachu");
  await app.buscarEAdicionar("charmander");

  // tentar adicionar pikachu de novo -> deve avisar duplicidade
  await app.buscarEAdicionar("pikachu");

  // buscar um pokemon que nao existe -> deve dar erro tratado
  await app.buscarEAdicionar("pokemon-inexistente");

  // listar o catalogo
  await app.listarCatalogo();

  // remover o pikachu (id 25)
  await app.removerPokemon(25);

  // listar de novo para confirmar a remocao
  await app.listarCatalogo();
}

// inicia o programa
main();
