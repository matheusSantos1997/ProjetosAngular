import { Despesa } from 'src/app/models/Despesa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DespesasService } from 'src/app/services/Despesas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogExclusaoDespesaComponent } from './DialogExclusaoDespesa/DialogExclusaoDespesa.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-ListagemDespesas',
  templateUrl: './ListagemDespesas.component.html',
  styleUrls: ['./ListagemDespesas.component.css']
})
export class ListagemDespesasComponent implements OnInit {

  despesas = new MatTableDataSource<any>();
  displayedColumns: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  autoCompleteInput = new FormControl();
  opcoesCategorias: string[] = [];
  nomesCategorias: Observable<string[]>;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  constructor(private despesasService: DespesasService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
     this.pegarDespesasPeloUsuarioId();
  }

  pegarDespesasPeloUsuarioId() {

      this.despesasService.pegarDespesasPeloUsuarioId(this.usuarioId).subscribe((resultado) => {
            resultado.forEach(despesa => {
                this.opcoesCategorias.push(despesa.categoria.nome);
            });

            this.despesas.data = resultado;
            this.despesas.paginator = this.paginator;
            this.despesas.sort = this.sort;

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

      this.nomesCategorias = this.autoCompleteInput.valueChanges
         .pipe(startWith(''), map(nome => this.filtrarCategorias(nome)));
  }

  exibirColunas(): string[]{
      return ['numero', 'descricao', 'categoria', 'valor', 'data', 'acoes'];
  }

  filtrarCategorias(nomeCategoria: string): string[]{
      if(nomeCategoria.trim().length >= 4) {
          this.despesasService.filtrarDespesas(nomeCategoria.toLowerCase()).subscribe(resultado => {
             this.despesas.data = resultado;
          });
      } else {
          if(nomeCategoria === ''){
            this.despesasService.pegarDespesasPeloUsuarioId(this.usuarioId).subscribe(resultado => {
                this.despesas.data = resultado;
            });
          }
      }

      return this.opcoesCategorias.filter(
         despesa => despesa.toLowerCase().includes(nomeCategoria.toLowerCase()));
  }

  sortData(sort: Sort) {
    const data = this.despesas.data.slice();
    if (!sort.active || sort.direction === '') {
      this.despesas.data = data;
      return;
    }

    this.despesas.data = data.sort((a: Despesa, b: Despesa) => {
     const isAsc = sort.direction === 'asc';
     switch (sort.active) {
       case 'numero':
         return this.compare(a.cartao.numero, b.cartao.numero, isAsc);
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
   })
 }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) && (a.toString().localeCompare(b.toString())) * (isAsc ? 1 : -1);
  }

  abrirDialog(despesaId: number, valor: number): void {
      this.dialog.open(DialogExclusaoDespesaComponent, {
        data: {
           despesaId: despesaId,
           valor: valor
        }
      }).afterClosed().subscribe((resultado) => {
         if(resultado === true) {
            this.despesasService.pegarDespesasPeloUsuarioId(this.usuarioId).subscribe((registros) => {
               this.despesas.data = registros;
               this.despesas.paginator = this.paginator;
            });

            this.displayedColumns = this.exibirColunas();
         }
      });
  }

}
