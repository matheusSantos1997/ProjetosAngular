import { Usuario } from "./Usuario";

export class Imagem {
    id: number;
    nome: string;
    URLImagem: string;
    savedAt?: Date;
    usuarioId?: number;
    usuario: Usuario;
}
