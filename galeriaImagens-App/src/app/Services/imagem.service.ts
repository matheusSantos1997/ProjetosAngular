import { PaginatedResult } from './../Models/Pagination/PaginatedResult';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imagem } from '../Models/Imagem';
import { map, take } from 'rxjs/operators';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
//   })
// };

@Injectable({
  providedIn: 'root'
})

export class ImagemService {

  constructor(private http: HttpClient) { }

  getImagens(): Observable<Imagem[]> {
     const apiUrl = `${environment.urlApi}Imagens/GetAllImagens`;
     return this.http.get<Imagem[]>(apiUrl).pipe(take(1));
  }

 /* getAllImagensByUsuarioId(usuarioId: number): Observable<Imagem[]> {
      const apiUrl = `${environment.urlApi}Imagens/GetAllImagensByUsuarioId/${usuarioId}`;
      return this.http.get<Imagem[]>(apiUrl).pipe(take(1));
  } */

  getAllImagensByUsuarioId(usuarioId: number, page?: number, itemsPerPage?: number): Observable<PaginatedResult<Imagem[]>> {
    const paginatedResult: PaginatedResult<Imagem[]> = new PaginatedResult<Imagem[]>();

    let params = new HttpParams;

    if(page !== null && itemsPerPage !== null) {
        params = params.append('pageNumber', page.toString());
        params = params.append('pageSize', itemsPerPage.toString())
    }

    const apiUrl = `${environment.urlApi}Imagens/GetAllImagensByUsuarioId/${usuarioId}`;

    return this.http
               .get<Imagem[]>(apiUrl, {observe: 'response', params })
               .pipe(
                  take(1),
                  map((response) => {
                    paginatedResult.result = response.body
                    if(response.headers.has('Pagination')) {
                      paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }

                    return paginatedResult;
                  }));
}

  getImagemById(id: number): Observable<Imagem> {
     const apiUrl = `${environment.urlApi}Imagens/GetImageById/${id}`;
     return this.http.get<Imagem>(apiUrl).pipe(take(1));
  }

  postUpload(file: FormData): Observable<Imagem> {
      const apiUrl = `${environment.urlApi}Imagens/UploadImagem`;
      return this.http.post<Imagem>(apiUrl, file);
  }

  putUpload(id: number, file: FormData): Observable<Imagem> {
    const apiUrl = `${environment.urlApi}Imagens/UpdateImagem/${id}`;
    return this.http.put<Imagem>(apiUrl, file);
  }

  deleteUpload(id: number): Observable<Imagem> {
     const apiUrl = `${environment.urlApi}Imagens/DeleteImagem/${id}`;
     return this.http.delete<Imagem>(apiUrl);
  }
}
