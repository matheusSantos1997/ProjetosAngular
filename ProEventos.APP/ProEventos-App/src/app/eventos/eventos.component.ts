import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any = [];
  eventosFiltrados: any = [];
  widthImg: number = 50;
  marginImg: number = 2;

  mostrarImagem = false;
  private _filtroLista: string = '';

  public get filtroLista(): string {
     return this._filtroLista;
  }

  public set filtroLista(value: string) {
        this._filtroLista = value;
        this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
     filtrarPor = filtrarPor.toLocaleLowerCase();
     return this.eventos.filter(
       evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
       || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
     )
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.getEventos();
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem; // vai fazer com que as imagens suma da tela
 }

  // consumindo e retornando todas as informaçoes da API
  getEventos() {
       this.http.get('https://localhost:5001/api/evento').subscribe(
         (response) => {
           console.log(response);
           this.eventos = response
           this.eventosFiltrados = this.eventos;
           }, (error) => {
              console.error(error);
           }
         )
  }

}
