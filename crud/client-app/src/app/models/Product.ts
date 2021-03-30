import { Department } from "./Department";

export interface Product {
    name: string;
    departments: Department[] | string[]; // array de strings
    stock: number;
    price: number;
    _id?: string;
}
