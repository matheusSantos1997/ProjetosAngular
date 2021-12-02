import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mes } from '../models/Mes';

@Injectable({
  providedIn: 'root'
})
export class MesService {

    constructor(private http: HttpClient) { }

    pegarTodos(): Observable<Mes[]> {
        return this.http.get<Mes[]>(`${environment.URL_API}/meses`);
    }

}
