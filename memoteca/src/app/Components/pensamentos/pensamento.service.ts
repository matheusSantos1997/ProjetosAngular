import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PensamentoService {

  endpoint: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  listarPensamentos(pagina: number): Observable<Pensamento[]> {
    const itemPerPaginas = 3;

    let params = new HttpParams()
                     .set('PageNumber', pagina.toString())
                     .set('PageSize', itemPerPaginas.toString())

      const apiUrl = `${this.endpoint}pensamentos/PegarTodosPensamentos?PageNumber=${pagina}&PageSize=${itemPerPaginas}`;
      return this.http.get<Pensamento[]>(apiUrl, { params: params})
  }

  listarPensamentosPorConteudo(conteudo: string, pagina: number): Observable<Pensamento[]> {
    const itemPerPaginas = 3;

    let params = new HttpParams()
                     .set('PageNumber', pagina.toString())
                     .set('PageSize', itemPerPaginas.toString())

    const apiUrl = `${this.endpoint}pensamentos/PegarTodosPensamentosByAutoria/${conteudo}?PageNumber=${pagina}&PageSize=${itemPerPaginas}`;
    return this.http.get<Pensamento[]>(apiUrl, {params: params});
  }

  listarPensamentoFavorito(pagina: number): Observable<Pensamento[]> {
    const itemPerPaginas = 3;

    let params = new HttpParams()
                     .set('PageNumber', pagina.toString())
                     .set('PageSize', itemPerPaginas.toString())

    const apiUrl = `${this.endpoint}pensamentos/PegarTodosPensamentosFavoritos?PageNumber=${pagina}&PageSize=${itemPerPaginas}`;
    return this.http.get<Pensamento[]>(apiUrl, {params: params});
  }

  listarPensamentoPorId(idPensamento: number): Observable<Pensamento> {
      const apiUrl = `${this.endpoint}pensamentos/PegarPensamentoPorId/${idPensamento}`;
      return this.http.get<Pensamento>(apiUrl);
  }

  criarPensamento(pensamento: Pensamento): Observable<Pensamento>{
      const apiUrl = `${this.endpoint}pensamentos/NovoPensamento`;
      return this.http.post<Pensamento>(apiUrl, pensamento);
  }

  editarPensamento(pensamento: Pensamento): Observable<Pensamento> {
     const apiUrl = `${this.endpoint}pensamentos/AtualizarPensamento/${pensamento.id}`;
     return this.http.put<Pensamento>(apiUrl, pensamento);
  }

  mudarFavorito(pensamento: Pensamento){
     pensamento.favorito = !pensamento.favorito;
     return this.editarPensamento(pensamento);
  }

  excluirPensamento(idPensamento: number): Observable<Pensamento> {
     const apiUrl = `${this.endpoint}pensamentos/ExcluirPensamento/${idPensamento}`;
     return this.http.delete<Pensamento>(apiUrl);
  }


}
