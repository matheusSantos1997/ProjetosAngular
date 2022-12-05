import { ImagemService } from './../../services/imagem.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Imagem } from 'src/app/Models/Imagem';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogExclusaoImagemComponent } from './dialog-exclusao-imagem/dialog-exclusao-imagem.component';
import { Pagination } from 'src/app/Models/Pagination/Pagination';

@Component({
  selector: 'app-listas-imagens',
  templateUrl: './listas-imagens.component.html',
  styleUrls: ['./listas-imagens.component.css']
})
export class ListasImagensComponent implements OnInit {
  imagemLargura = 200;
  imagemMargem = 10;
  displayedColumns: string[];
  imagens = new MatTableDataSource<Imagem>();

  usuarioId: any = localStorage.getItem('UsuarioId');

  pagination: Pagination;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  bLoading: boolean = false;

  constructor(private imagemService: ImagemService, private dialog: MatDialog) { }

  ngOnInit(): void {
     this.pagination = { currentPage: 1, itemsPerPage: 3, totalItems: 1} as Pagination;
     this.getAllImagensByUsuarioId();
  }

  exibirColunas(): string[]{
    return ['id', 'imagem', 'salvoEm', 'acoes']
  }

    getAllImagensByUsuarioId() {
      this.bLoading = false;
      this.imagemService.getAllImagensByUsuarioId(this.usuarioId, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((response) => {
         this.imagens.data = response.result;
         this.pagination = response.pagination;
         // this.imagens.paginator = this.paginator;

         this.imagens.data.forEach(i => {
          if(i.nome !== '') {
            i.nome = `http://localhost:5000/Images/${i.nome}`;
          }
         });

         this.getPaginationTranslateActions();



      }, (error) => {
         console.log(error);
      });
      this.displayedColumns = this.exibirColunas();
    }

    pageChanged(event: PageEvent) {

      let page = event.pageIndex;
      let size = event.pageSize;

     page = page + 1;

       this.pagination.currentPage = page;

       this.pagination.itemsPerPage = size;
       this.pagination.totalItems = event.length;
       this.getAllImagensByUsuarioId();
    }

  abrirDialog(id: number): void {
    this.dialog.open(DialogExclusaoImagemComponent, {
       data: {
         imagemId: id
       }
     }).afterClosed().subscribe((resultado: boolean) => {
       if(resultado === true){
           // debugger;
           this.imagemService.getAllImagensByUsuarioId(this.usuarioId, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((dados) => {

            this.imagens.data = dados.result;
            this.pagination = dados.pagination;
            this.paginator.firstPage();

              this.imagens.data.forEach(i => {
                if(i.nome !== '') {
                  i.nome = `http://localhost:5000/Images/${i.nome}`;
                }
               });

               this.getPaginationTranslateActions();

           });

           this.displayedColumns = this.exibirColunas();
        }
     });
 }

 private getPaginationTranslateActions() {
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
 }


}
