import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './Components/cabecalho/cabecalho.component';
import { LivroComponent } from './Components/livro/livro.component';
import { RodapeComponent } from './Components/rodape/rodape.component';
import { ListaLivrosComponent } from './Views/lista-livros/lista-livros.component';
import { ModalLivrosComponent } from './Views/modal-livros/modal-livros.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    LivroComponent,
    RodapeComponent,
    ListaLivrosComponent,
    ModalLivrosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
