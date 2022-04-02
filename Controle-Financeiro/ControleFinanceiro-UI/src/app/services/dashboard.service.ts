import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  pegarDadosCardsDashboard(usuarioId: string): Observable<any> {
      const apiUrl = `${environment.URL_API}/dashboard/PegarDadosCardsDashboard/${usuarioId}`;
      return this.http.get<any>(apiUrl);
  }

  pegarDadosAnuaisPeloUsuarioId(usuarioId: string, ano: number): Observable<any>
  {
      const apiUrl = `${environment.URL_API}/dashboard/PegarDadosAnuaisPeloUsuarioId/${usuarioId}/${ano}`;
      return this.http.get<any>(apiUrl);
  }
}
