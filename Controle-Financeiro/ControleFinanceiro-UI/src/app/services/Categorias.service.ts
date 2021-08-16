import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/Categoria';

// congigurando o cabeçalho da requisiçao http para enviar dados para a api
const httpOptions = {
   headers: new HttpHeaders ({
      'Content-Type': 'application/json'
   })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

 // url: string = 'https://localhost:5001/api/categorias';

  // // url: string = 'api/Categorias';

constructor(private http: HttpClient) { }

pegarTodos(): Observable<Categoria[]>{
   return this.http.get<Categoria[]>(`${environment.URL_API}api/categorias`);
}

pegarCategoriaPeloId(categoriaId: number): Observable<Categoria>{
   const apiUrl = `${environment.URL_API}api/categorias/${categoriaId}`;

   return this.http.get<Categoria>(apiUrl);
}

novaCategoria(categoria: Categoria): Observable<any>{
    return this.http.post<Categoria>(`${environment.URL_API}api/categorias`, categoria, httpOptions);
}

atualizarCategoria(categoriaId: number, categoria: Categoria): Observable<any>{
    const apiUrl = `${environment.URL_API}api/categorias/${categoriaId}`;

    return this.http.put<Categoria>(apiUrl, categoria, httpOptions);
}

excluirCategoria(categoriaId: number): Observable<any> {
    const apiUrl = `${environment.URL_API}api/categorias/${categoriaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
}

// filtrar categorias
filtrarCategorias(nomeCategoria: string): Observable<Categoria[]>{
   const apiUrl = `${environment.URL_API}api/categorias/FiltrarCategorias/${nomeCategoria}`;
   return this.http.get<Categoria[]>(apiUrl);
}

}
