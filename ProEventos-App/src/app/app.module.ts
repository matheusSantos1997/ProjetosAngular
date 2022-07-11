import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { MenuComponent } from './components/menu/menu.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { EventoService } from './services/evento.service';
import { TituloComponent } from './components/titulo/titulo.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    MenuComponent,
    PalestrantesComponent,
    DateTimeFormatPipe,
    TituloComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //
  providers: [
    EventoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
