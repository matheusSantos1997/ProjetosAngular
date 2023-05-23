import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  @Input() listaFavoritos: Pensamento[] = [];

  constructor(private pensamentoService: PensamentoService) { }

  ngOnInit(): void {
  }

  larguraPensamento(): string {
     return this.pensamento.conteudo.length >= 256 ? 'pensamento-g' : 'pensamento-p';
  }

  mudarIconeFavorito(): string {
     if(this.pensamento.favorito === false) {
         return 'inativo'
     }

     return 'ativo'
  }

  atualizarFavoritos() {
     this.pensamentoService.mudarFavorito(this.pensamento).subscribe(() => {
         this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1); // remove da lista de favoritos
     })
  }

}
