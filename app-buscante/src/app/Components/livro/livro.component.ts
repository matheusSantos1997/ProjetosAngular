import { Component, Input } from '@angular/core';
import { Livros } from 'src/app/Models/interfaces';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent {

  @Input() livro: Livros = {};
  modalAberto?: boolean;

  onModelChange(evento: boolean) {
    this.modalAberto = evento;
  }

}
