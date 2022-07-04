import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title: string = 'My first AGM project';
  lat: number = -23.9496523;
  lng: number = -46.398153;
  zoom: number = 15;

  initMap(): void {
    let map: google.maps.Map;
    const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};

    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
       center,
       zoom: 8
    })

  }

}
