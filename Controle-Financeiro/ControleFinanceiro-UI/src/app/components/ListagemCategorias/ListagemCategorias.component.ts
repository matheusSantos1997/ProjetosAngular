import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CategoriasService } from 'src/app/services/Categorias.service';
import { DialogExclusaoCategoriaComponent } from './DialogExclusaoCategoria/DialogExclusaoCategoria.component';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-ListagemCategorias',
  templateUrl: './ListagemCategorias.component.html',
  styleUrls: ['./ListagemCategorias.component.css']
})
export class ListagemCategoriasComponent implements OnInit {

  categorias = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesCategorias: string[] = []; // array de string responsavel por ter os nomes das categorias
  nomesCatagorias: Observable<string[]>; // variavel que vai mostrar os nomes das categorias

  constructor(private categoriasService: CategoriasService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
      this.categoriasService.pegarTodos().subscribe(
      (result) => {
         result.forEach(categoria => {
            // preenche as opçoes no array de string de categorias
            this.opcoesCategorias.push(categoria.nome);
         });
         this.categorias.data = result;
      });

      this.displayedColumns = this.exibirColunas();

      // preenchendo os valores filtrados de nomesCategorias
      this.nomesCatagorias = this.autoCompleteInput.valueChanges
          .pipe(startWith(''), map(nome => this.filtrarNomes(nome)));
  }

  exibirColunas(): string[]{
     return ['nome', 'icone', 'tipo', 'acoes']
  }

  abrirDialog(categoriaId, nome): void{
     this.dialog.open(DialogExclusaoCategoriaComponent, {
        data: {
          categoriaId: categoriaId,
          nome: nome
        }
      }).afterClosed().subscribe((resultado: boolean) => {
        if(resultado === true){
            // debugger;
            this.categoriasService.pegarTodos().subscribe((dados) => {
               this.categorias.data = dados;
            });
            this.displayedColumns = this.exibirColunas();
         }
      });
  }

  filtrarNomes(nome: string): string[]{
      // trim remove os espaços
      if(nome.trim().length >= 4){
         this.categoriasService.filtrarCategorias(nome.toLowerCase()).subscribe(resultado => {
             this.categorias.data = resultado;
         });
      } else {
        if(nome === ''){
           this.categoriasService.pegarTodos().subscribe(resultado => {
              this.categorias.data = resultado;
           });
        }
      }
      return this.opcoesCategorias.filter(categoria => {
          categoria.toLowerCase().includes(nome.toLowerCase());
      });
  }

}


