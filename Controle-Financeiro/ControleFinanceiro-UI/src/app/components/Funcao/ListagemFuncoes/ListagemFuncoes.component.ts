import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Funcao } from 'src/app/models/Funcao';
import { FuncoesService } from 'src/app/services/Funcoes.service';
import { DialogExclusaoFuncaoComponent } from './DialogExclusaoFuncao/DialogExclusaoFuncao.component';

@Component({
  selector: 'app-ListagemFuncoes',
  templateUrl: './ListagemFuncoes.component.html',
  styleUrls: ['./ListagemFuncoes.component.css']
})
export class ListagemFuncoesComponent implements OnInit {

  funcoes = new MatTableDataSource<any>();
  displayColumns: string[]; // lista de strings que serao as colunas da tabela
  autoCompleteInput = new FormControl();
  opcoesFuncoes: string[] = [];
  nomesFuncoes: Observable<string[]>

  // paginaçao
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  // ordenaçao
  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  constructor(private funcoesService: FuncoesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
      this.getAllFuncoes();
  }

  getAllFuncoes(){
      this.funcoesService.pegarTodos().subscribe((resultado) => {
         resultado.forEach((funcao: Funcao) => {
            this.opcoesFuncoes.push(funcao.name);
         });

         this.funcoes.data = resultado;
         this.funcoes.sort = this.sort;
         this.funcoes.paginator = this.paginator;

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

      this.nomesFuncoes = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.filtrarNomes(nome)))
  }

  exibirColunas(): string[]{
      return ['nome', 'descricao', 'acoes'];
  }

  filtrarNomes(nome: string): string[]{
      if(nome.trim().length >= 4){
         this.funcoesService.filtrarFuncoes(nome.toLowerCase()).subscribe(resultado => {
             this.funcoes.data = resultado;
         });
      } else {
         if(nome === ''){
           this.funcoesService.pegarTodos().subscribe(resultado => {
               this.funcoes.data = resultado;
           });
         }
      }

      return this.opcoesFuncoes.filter((funcao) => funcao.toLowerCase().includes(nome.toLowerCase()));
  }

  abrirDialog(funcaoId, nome): void{
      this.dialog.open(DialogExclusaoFuncaoComponent, {
          data:
          {
             funcaoId: funcaoId,
             nome: nome
          },
      }).afterClosed().subscribe((resultado: boolean) => {
          if(resultado === true){
              this.funcoesService.pegarTodos().subscribe(dados => {
                 this.funcoes.data = dados;
                 this.funcoes.paginator = this.paginator;
              });
              this.displayColumns = this.exibirColunas();
          }
      });
  }

}
