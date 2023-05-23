import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Item, LivrosResultado } from '../Models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<LivrosResultado> {
     const params = new HttpParams().append('q', valorDigitado);
     return this.http.get<LivrosResultado>(this.API, { params })
     /* .pipe(
       // tap((response) => console.log('Fluxo tap', response)),
      //  map((response) => response.items ?? []), // modifica o retorno de uma api em json
       // tap((response) => console.log('fluxo após o map', response))
     ); */
  }
}
