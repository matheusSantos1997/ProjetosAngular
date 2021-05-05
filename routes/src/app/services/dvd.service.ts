import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Dvd } from '../models/Dvd';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

private dvdSubject$: BehaviorSubject<Dvd[]> = new BehaviorSubject<Dvd[]>([]);
public dvds$ = this.dvdSubject$.asObservable();

constructor() {
    timer(2000)
      .subscribe(() => {
        this.dvdSubject$.next([
          { title: 'DVD - Beegees', year: 2016, genre: ['music']},
          { title: 'The wind', year: 2018, genre: ['movie']}
        ])
      })
 }

 addDvd(b: Dvd) {

  let books = this.dvdSubject$.getValue();
  books.push(b);

}

removeDvd(i: number) {
  let dvds = this.dvdSubject$.getValue();

  if(i>=0 && i < dvds.length) {
      dvds.splice(i, 1);
  }
}

getDvd(i: number): Observable<Dvd> {
    return this.dvds$.pipe(
      map(dvds => (i >= 0 && i < dvds.length) ? dvds[i] : null),
      delay(1000)
    )
}

}
