import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

public getEventos(): Observable<Evento[]> {
      const apiUrl = `${environment.apiLocal}/eventos`;
      return this.http.get<Evento[]>(apiUrl);
  }

public getEventosByTema(tema: string): Observable<Evento[]> {
      const apiUrl = `${environment.apiLocal}/eventos/tema/${tema}`;
      return this.http.get<Evento[]>(apiUrl);
  }

public getEventoById(id: number): Observable<Evento> {
      const apiUrl = `${environment.apiLocal}/eventos/${id}`;
      return this.http.get<Evento>(apiUrl);
  }
}
