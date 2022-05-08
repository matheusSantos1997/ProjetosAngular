import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // Configuração da ordenação
  orderColumn: string = 'nome'; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = false;
  caseInsensitive: boolean = true;

  constructor() { }

  ngOnInit(): void {

  }

  usuarios = [
    {nome: 'casa', endereco: 'A', email: 'a'},
    {nome: 'Barco', endereco: 'B', email: 'b'},
    {nome: 'area', endereco: 'C', email: 'c' }
 ];

  sortData(columnSort: string) {
     this.orderColumn = columnSort;
     this.reverse = !this.reverse;
   }

}
