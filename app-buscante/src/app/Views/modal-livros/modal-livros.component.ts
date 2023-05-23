import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Livros } from 'src/app/Models/interfaces';

@Component({
  selector: 'app-modal-livros',
  templateUrl: './modal-livros.component.html',
  styleUrls: ['./modal-livros.component.css']
})
export class ModalLivrosComponent {

  @Input() livro?: Livros;
  statusModal: boolean = true;
  @Output() mudouModal = new EventEmitter();

  fecharModal() {
    this.statusModal = false
    this.mudouModal.emit(this.statusModal);
    let bodyElement = document.querySelector('body') as HTMLElement;
    bodyElement.style.overflow = "scroll";
  }

  esconderScroll(){
    if(this.statusModal == true ) {
      let bodyElement = document.querySelector('body') as HTMLElement;
      bodyElement.style.overflow = "hidden";
    }
  }

  lerPrevia() {
    window.open(this.livro?.previewLink, '_blank');
  }

}
