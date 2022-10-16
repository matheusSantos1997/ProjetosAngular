import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imagem } from '../Models/Imagem';
import { take } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  })
};

@Injectable({
  providedIn: 'root'
})

export class ImagemService {

  constructor(private http: HttpClient) { }

  getImagens(): Observable<Imagem[]> {
     const apiUrl = `${environment.urlApi}Imagens/GetAllImagens`;
     return this.http.get<Imagem[]>(apiUrl).pipe(take(1));
  }

  getAllImagensByUsuarioId(usuarioId: number): Observable<Imagem[]> {
    const apiUrl = `${environment.urlApi}Imagens/GetAllImagensByUsuarioId/${usuarioId}`;
    return this.http.get<Imagem[]>(apiUrl).pipe(take(1));
  }

  getImagemById(id: number): Observable<Imagem> {
     const apiUrl = `${environment.urlApi}Imagens/GetImageById/${id}`;
     return this.http.get<Imagem>(apiUrl).pipe(take(1));
  }

  postUpload(file: FormData): Observable<Imagem> {
      const apiUrl = `${environment.urlApi}Imagens/UploadImagem`;
      return this.http.post<Imagem>(apiUrl, file, httpOptions);
  }

  putUpload(id: number, file: FormData): Observable<Imagem> {
    const apiUrl = `${environment.urlApi}Imagens/UpdateImagem/${id}`;
    return this.http.put<Imagem>(apiUrl, file, httpOptions);
  }

  deleteUpload(id: number): Observable<Imagem> {
     const apiUrl = `${environment.urlApi}Imagens/DeleteImagem/${id}`;
     return this.http.delete<Imagem>(apiUrl, httpOptions);
  }
}
