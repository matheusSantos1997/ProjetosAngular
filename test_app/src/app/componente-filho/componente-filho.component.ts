import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-componente-filho',
  standalone: true,
  imports: [],
  templateUrl: './componente-filho.component.html',
  styleUrl: './componente-filho.component.css'
})
export class ComponenteFilhoComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() closeModal = new EventEmitter<void>();

  onClose(){
    this.closeModal.emit();
  }

  saveChanges() {
    // Lógica para salvar as alterações
    this.onClose(); // Fecha o modal após salvar, se necessário
    console.log('Entrou!');
  }

  cancel(){
    this.onClose();
  }

}
