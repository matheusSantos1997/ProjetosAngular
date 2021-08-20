import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcao } from '../models/Funcao';

const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type' : 'application/json'
   })
};

@Injectable({
  providedIn: 'root'
})
export class FuncoesService {

constructor(private http: HttpClient) { }

// retorna todas as funçoes
pegarTodos(): Observable<Funcao[]>{
    return this.http.get<Funcao[]>(`${environment.URL_API}api/funcoes`)
}

pegarFuncaoPeloId(funcaoId: string): Observable<Funcao>{
    const apiUrl = `${environment.URL_API}api/funcoes/${funcaoId}`;
    return this.http.get<Funcao>(apiUrl);
}

novaFuncao(funcao: Funcao): Observable<any> {
    return this.http.post<Funcao>(`${environment.URL_API}api/funcoes`, funcao, httpOptions);
}

atualizarFuncao(funcaoId: string, funcao: Funcao): Observable<any>{
    const apiUrl = `${environment.URL_API}api/funcoes/${funcaoId}`;
    return this.http.put<Funcao>(apiUrl, funcao, httpOptions);
}

excluirFuncao(funcaoId: string): Observable<any> {
    const apiUrl = `${environment.URL_API}api/funcoes/${funcaoId}`;
    return this.http.delete(apiUrl, httpOptions);
}

filtrarFuncoes(nomeFuncao: string): Observable<Funcao[]>{
    const apiUrl = `${environment.URL_API}api/funcoes/FiltrarFuncoes/${nomeFuncao}`;
    return this.http.get<Funcao[]>(apiUrl);
}

}
