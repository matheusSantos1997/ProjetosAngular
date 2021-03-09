import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  URL: string = 'http://localhost:5000/api/product'; // chamando a api

constructor(private http: HttpClient) { }

     getProducts(): Observable<Product[]> {
            return this.http.get<Product[]>(`${this.URL}`);
     }

     getProductsIds(): Observable<any> {
           return this.http.get<number>(`${this.URL}/ProductId`);
     }

     getProductName(id: number): Observable<string> {
           return this.http.get(`${this.URL}/getByName/Name/${id}`,
           {responseType: 'text'});
     }
     
     // chamando a rota inserir produto da api
     insertProduct(p: Product): Observable<Product> {
         return this.http.post<Product>(`${this.URL}`, p);
     }
     
     // chamando a rota deletar produto da api
     deleteProduct(p: Product) {
          return this.http.delete(`${this.URL}/${p.id}`);
     }
     
     // chamando a rota editar produt da api
     editProduct(p: Product): Observable<Product> {
         return this.http.put<Product>(`${this.URL}/${p.id}`, p);
     }

}
