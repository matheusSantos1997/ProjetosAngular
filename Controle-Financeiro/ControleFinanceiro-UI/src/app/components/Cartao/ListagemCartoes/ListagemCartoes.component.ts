import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Cartao } from 'src/app/models/Cartao';
import { CartoesService } from 'src/app/services/Cartoes.service';
import { DialogExclusaoCartaoComponent } from './DialogExclusaoCartao/DialogExclusaoCartao.component';

@Component({
  selector: 'app-ListagemCartoes',
  templateUrl: './ListagemCartoes.component.html',
  styleUrls: ['./ListagemCartoes.component.css']
})
export class ListagemCartoesComponent implements OnInit {

  cartoes = new MatTableDataSource<any>();
  displayColumns: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  autoCompleteInput = new FormControl();
  opcoesNumeros: string[] = [];
  numeroCartoes: Observable<string[]>;

  // paginaçao
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  // ordenaçao
  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(private cartoesService: CartoesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
      this.listarCartoesUsuarioId();
  }

  listarCartoesUsuarioId(): void {
      this.cartoesService.pegarCartoesPeloUsuarioId(this.usuarioId).subscribe((resultado) => {
          resultado.forEach(numero => {
             this.opcoesNumeros.push(numero.numero);
          });
          this.cartoes.data = resultado;
          this.cartoes.paginator = this.paginator;
          this.cartoes.sort = this.sort;

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

      this.displayColumns = this.exibirColunas();

      this.numeroCartoes = this.autoCompleteInput.valueChanges.pipe(startWith(''), map((numero) => this.filtrarCartoes(numero)));
  }



  exibirColunas(): string[] {
      return ['nome', 'bandeira', 'numero', 'limite', 'acoes'];
  }

  filtrarCartoes(numero: string): string[] {
      if(numero.trim().length >=4){
         this.cartoesService.filtrarCartoes(numero).subscribe((resultado) => {
            this.cartoes.data = resultado;
         });
      } else {
         if(numero === '') {
           this.cartoesService.pegarCartoesPeloUsuarioId(this.usuarioId).subscribe((resultado) => {
              this.cartoes.data = resultado;
           });
         }
      }

      return this.opcoesNumeros.filter(nc =>
        nc.toLowerCase().includes(numero.toLowerCase())
      );
  }

  sortData(sort: Sort){
     const data = this.cartoes.data.slice();
     if (!sort.active || sort.direction === '') {
        this.cartoes.data = data;
        return;
     }

     this.cartoes.data = data.sort((a: Cartao, b: Cartao) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nome':
          return this.compare(a.nome, b.nome, isAsc);
        case 'bandeira':
          return this.compare(a.bandeira, b.bandeira, isAsc);
        case 'numero':
          return this.compare(a.numero, b.numero, isAsc);
        case 'limite':
          return this.compare(a.limite, b.limite, isAsc);
        default:
          return 0;
      }
     });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) && (a.toString().localeCompare(b.toString())) * (isAsc ? 1 : -1);
  }

  abrirDialog(cartaoId, numero): void {
      this.dialog.open(DialogExclusaoCartaoComponent, {
        data: {
           cartaoId: cartaoId,
           numero: numero
        },

      })
       .afterClosed().subscribe(resultado => {
           if(resultado === true){
              this.cartoesService.pegarCartoesPeloUsuarioId(this.usuarioId).subscribe((dados) => {
                 this.cartoes.data = dados;
                 this.cartoes.paginator = this.paginator;
              });
              this.displayColumns = this.exibirColunas();
           }
       });
  }

}
