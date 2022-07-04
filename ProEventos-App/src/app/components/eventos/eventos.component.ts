import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit, OnDestroy {

  public modalRef: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public larguraImg: number = 100;
  public margemImg: number = 2;
  public exibirImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(): string {
     return this._filtroLista;
  }

  public set filtroLista(value: string) {
     this._filtroLista = value;
     this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
     filtrarPor = filtrarPor.toLocaleLowerCase();
     return this.eventos.filter((evento: Evento) =>
      evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
     )
  }

  constructor(
             private eventoService: EventoService,
             private modalService: BsModalService,
             private toastr: ToastrService
             ) { }

  ngOnDestroy(): void {
    this.getEventos()
  }

  ngOnInit(): void {
    this.getEventos();
  }



  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe((response: Evento[]) => {
       this.eventos = response;
       this.eventosFiltrados = this.eventos;
       console.log(response)

    }, (error: Error) => {
       console.error(error);
    })
  }

  openModal(template: TemplateRef<any>): void{
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  decline(): void {
    this.modalRef.hide();
  }

}
