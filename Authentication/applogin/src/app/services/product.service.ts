import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/Product';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private readonly url: string = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.url}/product`)
        .pipe(
          tap(p=>console.log(p)),
          catchError((e) => {
            console.log(e);
            return throwError(e);
          })
        );
      }
}
