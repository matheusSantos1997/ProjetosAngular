export class Pensamento {
    id?: number;
    conteudo: string;
    autoria: string;
    modelo: string;
    favorito: boolean;

    constructor(conteudo: string, autoria: string, modelo: string, favorito: boolean) {
      this.conteudo = conteudo;
      this.autoria = autoria;
      this.modelo = modelo;
      this.favorito = favorito;
    }
}
