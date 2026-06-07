// =============================================================
// models/CustomErrors.ts
// Classes de erro proprias. "extends Error" significa que elas
// HERDAM tudo que um Error normal tem, mas com um nome proprio
// para sabermos de onde o erro veio (da API ou do catalogo local).
// =============================================================

// Erro relacionado a busca na PokeAPI (ex: Pokemon nao existe, 404)
export class APIError extends Error {
  constructor(mensagem: string) {
    super(mensagem); // chama o construtor da classe Error "pai"
    this.name = "APIError";
  }
}

// Erro relacionado a operacoes no catalogo local
export class LocalBoxError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "LocalBoxError";
  }
}
