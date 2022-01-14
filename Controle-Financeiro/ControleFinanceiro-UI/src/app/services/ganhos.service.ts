import { Ganho } from './../models/Ganho';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
   })
};

@Injectable({
  providedIn: 'root'
})

export class GanhosService {

  constructor(private http: HttpClient) { }

  pegarGanhosPeloUsuarioId(usuarioId: string): Observable<Ganho[]> {
       const apiUrl = `${environment.URL_API}/ganhos/PegarGanhosPeloUsuarioId/${usuarioId}`;
       return this.http.get<Ganho[]>(apiUrl);
  }

  pegarGanhoPeloId(ganhoId: number): Observable<Ganho>{
       const apiUrl = `${environment.URL_API}/ganhos/${ganhoId}`;
       return this.http.get<Ganho>(apiUrl);
  }

  novoGanho(ganho: Ganho): Observable<any> {
       return this.http.post<Ganho>(`${environment.URL_API}/ganhos`, ganho, httpOptions);
  }

  atualizarGanho(ganhoId: number, ganho: Ganho): Observable<any> {
       const apiUrl = `${environment.URL_API}/ganhos/${ganhoId}`;
       return this.http.put<Ganho>(apiUrl, ganho, httpOptions);
  }

  excluirGanho(ganhoId: number): Observable<any> {
       const apiUrl = `${environment.URL_API}/ganhos/${ganhoId}`;
       return this.http.delete<number>(apiUrl, httpOptions);
  }

}
