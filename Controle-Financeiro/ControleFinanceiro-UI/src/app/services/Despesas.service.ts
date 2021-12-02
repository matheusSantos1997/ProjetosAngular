import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Despesa } from '../models/Despesa';

const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`,
   })
};

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  constructor(private http: HttpClient) { }

  pegarDespesasPeloUsuarioId(usuarioId: string): Observable<Despesa[]> {
      const apiUrl = `${environment.URL_API}/despesas/PegarDespesasPeloUsuarioId/${usuarioId}`;
      return this.http.get<Despesa[]>(apiUrl);
  }

  pegarDespesaPeloId(despesaId: number): Observable<Despesa> {
       const apiUrl = `${environment.URL_API}/despesas/${despesaId}`;
       return this.http.get<Despesa>(apiUrl);
  }

  novaDespesa(despesa: Despesa): Observable<any> {
      return this.http.post<Despesa>(`${environment.URL_API}/despesas`, despesa, httpOptions);
  }

  atualizarDespesa(despesaId: number, despesa: Despesa): Observable<any> {
       const apiUrl = `${environment.URL_API}/despesas/${despesaId}`;
       return this.http.put<Despesa>(apiUrl, despesa, httpOptions);
  }

  excluirDespesa(despesaId: number): Observable<any> {
      const apiUrl = `${environment.URL_API}/despesas/${despesaId}`;
      return this.http.delete<number>(apiUrl, httpOptions);
  }

  filtrarDespesas(nomeCategoria: string): Observable<Despesa[]> {
      const apiUrl = `${environment.URL_API}/despesas/FiltrarDespesas/${nomeCategoria}`;

      return this.http.get<Despesa[]>(apiUrl);
  }

}
