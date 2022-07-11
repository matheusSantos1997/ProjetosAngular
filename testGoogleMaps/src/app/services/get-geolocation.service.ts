import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetGeolocationService {

  constructor() { }

  public getPosition(): Observable<any> {
    return Observable.create(
      (observer: any) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        observer.next(pos);
      }),
      (error: Error) => {
          console.log('Position is not available');
      },
      {
        enableHighAccuracy: true
      };
    });
  }
}
