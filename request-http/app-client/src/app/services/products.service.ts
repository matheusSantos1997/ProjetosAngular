import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

     insertProduct(product: Product): Observable<Product> {
         return this.http.post<Product>(`${this.URL}`, product);
     }

     deleteProduct(p: Product) {
          return this.http.delete(`${this.URL}/${p.id}`);
     }

     editProduct(p: Product): Observable<Product> {
         return this.http.put<Product>(`${this.URL}/${p.id}`, p);
     }

}
