import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MapsComponent } from './maps/maps.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApi,
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
