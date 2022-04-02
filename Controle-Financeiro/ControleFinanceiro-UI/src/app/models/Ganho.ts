import { Categoria } from './Categoria';
import { Mes } from './Mes';
export class Ganho {
     ganhoId: number;
     descricao: string;
     categoriaId: number;
     categoria: Categoria;
     valor: number;
     dia: number;
     mesId: number;
     mes: Mes;
     ano: number;
     usuarioId: string;
}
