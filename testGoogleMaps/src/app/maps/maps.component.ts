import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { GetGeolocationService } from '../services/get-geolocation.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor(private geoLocationService: GetGeolocationService, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit(): void {
     this.initMap();
  }

  title: string = 'My first AGM project';
  markerTitle: string = 'Localização atual';
  lat: number;
  lng: number;
  zoom: number = 13;
  coordinates: any;

  map: any;

  initMap(): void {
    this.geoLocationService.getPosition().subscribe(
      (pos) => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude
      });
  }

}
