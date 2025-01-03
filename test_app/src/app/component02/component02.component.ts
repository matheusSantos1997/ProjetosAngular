import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { ComponenteFilhoComponent } from "../componente-filho/componente-filho.component";

@Component({
  selector: 'app-component02',
  standalone: true,
  imports: [AppModule, ComponenteFilhoComponent],
  templateUrl: './component02.component.html',
  styleUrl: './component02.component.css'
})
export class Component02Component {
  media: number = 10;

  nomes: string[] = ['Matheus', 'Fulano', 'Cicrano', 'Beltano'];

  linguagem: string = 'JAVA';

  isModalVisible = false;

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

}
