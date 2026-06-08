// =============================================================
// controllers/TerminalController.ts
// Camada de interface. Recebe os services prontos pelo construtor
// (isso se chama "injecao de dependencia": em vez de o controller
// criar os services, ele os recebe de fora). Cada metodo executa
// uma acao e imprime mensagens claras no terminal.
// =============================================================

import { PokeApiService } from "../services/PokeApiService";
import { CatalogoPokemon } from "../services/CatalagoPokemon";
import { APIError } from "../models/CustomErrors";
import { formatarLinhaPokemon } from "../utils/textFormatters";

export class TerminalController {
  // os services chegam prontos pelo construtor
  constructor(
    private readonly api: PokeApiService,
    private readonly box: CatalogoPokemon
  ) {}

  // Busca na API e, se achar, adiciona ao catalogo local.
  async buscarEAdicionar(nomeOuId: string): Promise<void> {
    try {
      const pokemon = await this.api.buscarPokemon(nomeOuId);
      console.log(`[OK] Pokemon encontrado: ${pokemon.nome}`);
      console.log(formatarLinhaPokemon(pokemon));

      const adicionou = await this.box.adicionar(pokemon);
      if (adicionou) {
        console.log(`[OK] ${pokemon.nome} adicionado ao catalogo.`);
      } else {
        console.log(`[AVISO] ${pokemon.nome} ja esta no catalogo.`);
      }
    } catch (erro) {
      if (erro instanceof APIError) {
        console.log(`[ERRO] ${erro.message}`);
      } else {
        console.log("[ERRO] Ocorreu um erro inesperado.");
      }
    }
  }

  // Lista todo o catalogo. Usa forEach (metodo de array).
  async listarCatalogo(): Promise<void> {
    const catalogo = await this.box.listar();

    if (catalogo.length === 0) {
      console.log("[AVISO] Catalogo vazio.");
      return;
    }

    console.log("\nCatalogo atual:");
    catalogo.forEach((pokemon) => {
      console.log(formatarLinhaPokemon(pokemon));
    });
    console.log("");
  }

  // Remove pelo id.
  async removerPokemon(id: number): Promise<void> {
    const removeu = await this.box.remover(id);
    if (removeu) {
      console.log("[OK] Pokemon removido do catalogo.");
    } else {
      console.log("[AVISO] Nenhum Pokemon encontrado com esse ID.");
    }
  }
}
