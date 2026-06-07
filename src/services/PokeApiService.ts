// =============================================================
// services/PokeApiService.ts
// Camada que conversa com a internet (PokeAPI). Usa node-fetch,
// async/await e try/catch. Devolve um PokemonResumo pronto,
// ou lanca um APIError se algo der errado.
// =============================================================

import fetch from "node-fetch";
import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon";
import { APIError } from "../models/CustomErrors";

export class PokeApiService {
  private readonly urlBase = "https://pokeapi.co/api/v2/pokemon/";

  // RF04: busca por nome ou ID. "async" + "Promise<...>" significa
  // que essa funcao demora (vai na internet) e devolve um valor
  // no futuro. O "await" espera a resposta chegar.
  async buscarPokemon(nomeOuId: string): Promise<PokemonResumo> {
    const termo = nomeOuId.trim().toLowerCase();
    const url = `${this.urlBase}${termo}`;

    try {
      const resposta = await fetch(url);

      // RF05: a API responde 404 quando o pokemon nao existe.
      // resposta.ok e false nesse caso.
      if (!resposta.ok) {
        throw new APIError(`Pokemon nao encontrado: ${nomeOuId}`);
      }

      // converte o corpo da resposta (JSON) em objeto.
      // O "as PokemonApiResponse" diz ao TS qual o formato esperado.
      const dados = (await resposta.json()) as PokemonApiResponse;

      // RF06: transforma o JSON cru no nosso objeto simplificado
      return this.mapearParaResumo(dados);
    } catch (erro) {
      // Se ja for um APIError nosso, repassa.
      if (erro instanceof APIError) {
        throw erro;
      }
      // Qualquer outro erro (ex: sem internet) vira APIError tambem.
      throw new APIError(`Falha ao buscar o Pokemon: ${nomeOuId}`);
    }
  }

  // RF06: funcao privada que faz o mapeamento. Usa .map() (metodo
  // de array) para transformar a lista de tipos em lista de nomes.
  private mapearParaResumo(dados: PokemonApiResponse): PokemonResumo {
    const tipos = dados.types.map((item) => item.type.name);

    // .find() (metodo de array) para achar cada stat pelo nome
    const hp =
      dados.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0;
    const ataque =
      dados.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0;
    const defesa =
      dados.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0;

    return {
      id: dados.id,
      nome: dados.name,
      tipos: tipos,
      altura: dados.height,
      peso: dados.weight,
      hp: hp,
      ataque: ataque,
      defesa: defesa,
    };
  }
}
