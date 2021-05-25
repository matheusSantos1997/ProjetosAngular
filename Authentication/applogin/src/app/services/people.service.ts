import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Person } from '../models/Person';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PeopleService {

    private readonly url: string = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }
    
    getPeople(): Observable<Person[]> {
        return this.http.get<Person[]>(`${this.url}/people`)
          .pipe(
            tap(p=>console.log(p)),
            catchError((e) => {
              console.log(e);
              return throwError(e);
            })
          )
      }
}
