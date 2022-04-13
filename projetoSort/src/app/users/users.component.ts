import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // Configuração da ordenação
  orderColumn: string = 'nome'; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = true;
  caseInsensitive: boolean = false

  constructor() { }

  ngOnInit(): void {

  }

  usuarios = [
    {nome: 'A', endereco: 'A', email: 'a'},
    {nome: 'B', endereco: 'B', email: 'b'},
    {nome: 'C', endereco: 'C', email: 'c' }
 ];

  sortData(columnSort: string) {
     this.orderColumn = columnSort;

     this.reverse = !this.reverse;
   }

   customComparator(itemA: string, itemB: string) {
    return itemA > itemB ? 1 : -1;
}

}
