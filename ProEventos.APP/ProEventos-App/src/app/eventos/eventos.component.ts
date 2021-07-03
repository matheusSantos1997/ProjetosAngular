import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  modalRef: BsModalRef;
  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  widthImg: number = 150;
  marginImg: number = 2;

  mostrarImagem: boolean = false;
  private _filtroLista: string = '';

  public get filtroLista(): string {
     return this._filtroLista;
  }

  public set filtroLista(value: string) {
        this._filtroLista = value;
        this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): any {
     filtrarPor = filtrarPor.toLocaleLowerCase();
     return this.eventos.filter(
       evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
       || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
     )
  }

  constructor(private eventoService: EventoService, 
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService
              ) { }

  ngOnInit() {
     this.getEventos();
     /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
  }

  public alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem; // vai fazer com que as imagens suma da tela
 }

  // consumindo e retornando todas as informaçoes da API
  public getEventos() {
      this.eventoService.getEvento().subscribe(
         (response: Evento[]) => {
              this.eventos = response;
              console.log(response);
         },
         (error: Error) => {
            console.error(error); 
         }
      );
  }

  openModal(template: TemplateRef<any>): void{
     this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
     this.modalRef.hide();
     this.toastr.success('O Evento foi deletado com sucesso!', 'Deletado!');
  }

  decline(): void {

     this.modalRef.hide();
  }

}
