// =============================================================
// services/BoxService.ts
// Camada de persistencia local. Le e grava os pokemon em um
// arquivo pc_box.json usando node:fs/promises. Aplica as regras
// de negocio: nao duplicar, remover por id, listar.
// =============================================================

import { readFile, writeFile } from "node:fs/promises";
import { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";

export class CatalogoPokemon {
  private readonly caminhoArquivo: string;

  constructor(caminhoArquivo: string = "pc_box.json") {
    this.caminhoArquivo = caminhoArquivo;
  }

  // Le o arquivo e devolve o array de pokemon.
  // Se o arquivo nao existir ou estiver vazio, devolve [].
  private async lerCatalogo(): Promise<PokemonResumo[]> {
    try {
      const conteudo = await readFile(this.caminhoArquivo, "utf-8");
      if (conteudo.trim() === "") return [];
      return JSON.parse(conteudo) as PokemonResumo[];
    } catch {
      // arquivo nao existe ainda -> catalogo vazio
      return [];
    }
  }

  // Grava o array de volta no arquivo (formatado com identacao).
  private async salvarCatalogo(catalogo: PokemonResumo[]): Promise<void> {
    try {
      const texto = JSON.stringify(catalogo, null, 2);
      await writeFile(this.caminhoArquivo, texto, "utf-8");
    } catch {
      throw new LocalBoxError("Nao foi possivel gravar o catalogo local.");
    }
  }

  // RF08: adiciona, bloqueando duplicidade pelo id.
  // Usa .some() para checar se ja existe. Devolve true se adicionou.
  async adicionar(pokemon: PokemonResumo): Promise<boolean> {
    const catalogo = await this.lerCatalogo();
    const jaExiste = catalogo.some((p) => p.id === pokemon.id);

    if (jaExiste) {
      return false; // o controller mostra o aviso de duplicidade
    }

    catalogo.push(pokemon);
    await this.salvarCatalogo(catalogo);
    return true;
  }

  // RF09: devolve a lista atual (o controller cuida da exibicao).
  async listar(): Promise<PokemonResumo[]> {
    return await this.lerCatalogo();
  }

  // RF10: remove por id usando .filter(). Devolve true se removeu.
  async remover(id: number): Promise<boolean> {
    const catalogo = await this.lerCatalogo();
    const existe = catalogo.some((p) => p.id === id);

    if (!existe) {
      return false;
    }

    const atualizado = catalogo.filter((p) => p.id !== id);
    await this.salvarCatalogo(atualizado);
    return true;
  }
}
