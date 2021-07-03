import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ngx-bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { ContatosComponent } from './contatos/contatos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TituloComponent } from './shared/titulo/titulo.component';

@NgModule({
   declarations: [
      AppComponent,
      EventosComponent,
      NavComponent,
      DateTimeFormatPipe,
      PalestrantesComponent,
      ContatosComponent,
      DashboardComponent,
      PerfilComponent,
	  TituloComponent
   ],
   imports: [
	 BrowserModule,
	 AppRoutingModule,
	 HttpClientModule,
	 FormsModule,
	 BrowserAnimationsModule,
	 ToastrModule.forRoot({//mensagemdepopup,
	 timeOut:3000,
	 positionClass:'toast-bottom-right',
	 preventDuplicates:true,
	 progressBar:true,
     }),
	 NgxSpinnerModule,//animaçaodecarregamento,
	 CollapseModule.forRoot(),
	 TooltipModule.forRoot(),//permiteaparecernomesemcomponenteshtmlaopassaromouseemcima,
	 BsDropdownModule.forRoot(),
	 ModalModule.forRoot(),//modal,

	],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
