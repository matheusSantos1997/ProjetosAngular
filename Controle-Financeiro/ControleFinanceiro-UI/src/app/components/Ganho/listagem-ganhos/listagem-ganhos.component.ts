import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ganho } from 'src/app/models/Ganho';
import { GanhosService } from 'src/app/services/ganhos.service';

@Component({
  selector: 'app-listagem-ganhos',
  templateUrl: './listagem-ganhos.component.html',
  styleUrls: ['./listagem-ganhos.component.css']
})
export class ListagemGanhosComponent implements OnInit {

  ganhos = new MatTableDataSource<any>();
  displayedColumns: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(private ganhosService: GanhosService) { }

  ngOnInit(): void {
      this.getAllGanhos();
  }

  getAllGanhos(): void {
      this.ganhosService.pegarGanhosPeloUsuarioId(this.usuarioId).subscribe((resultado) => {
           this.ganhos.data = resultado;
           this.ganhos.paginator = this.paginator;
           this.ganhos.sort = this.sort;

           // renomeia os nomes dos botoes da paginação
           this.paginator._intl.itemsPerPageLabel = 'Itens por página';
           this.paginator._intl.firstPageLabel = 'Primeira página';
           this.paginator._intl.lastPageLabel = 'Última página';
           this.paginator._intl.nextPageLabel = 'Próxima página';
           this.paginator._intl.previousPageLabel = 'Página anterior';
           this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
              return(
                page * pageSize + 1 + ' - ' + (page * pageSize + pageSize) + ' de ' + length
              );
           };
      });

      this.displayedColumns = this.exibirColunas();
  }

  exibirColunas(): string[] {
     return ['descricao', 'categoria', 'valor', 'data', 'acoes'];
  }

  sortData(sort: Sort) {
     const data = this.ganhos.data.slice();
     if (!sort.active || sort.direction === '') {
       this.ganhos.data = data;
       return;
     }

     this.ganhos.data = data.sort((a: Ganho, b: Ganho) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'descricao':
          return this.compare(a.descricao, b.descricao, isAsc);
        case 'categoria':
          return this.compare(a.categoria.icone, b.categoria.icone, isAsc);
        case 'valor':
          return this.compare(a.valor, b.valor, isAsc);
        case 'data':
          return this.compare(a.ano, b.ano, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
