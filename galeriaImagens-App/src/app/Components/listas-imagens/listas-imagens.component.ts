import { ImagemService } from './../../services/imagem.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Imagem } from 'src/app/Models/Imagem';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogExclusaoImagemComponent } from './dialog-exclusao-imagem/dialog-exclusao-imagem.component';

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
  pathToImage: string;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(private imagemService: ImagemService, private dialog: MatDialog) { }

  ngOnInit(): void {
     this.getAllImagensByUsuarioId();
  }

  exibirColunas(): string[]{
    return ['id', 'imagem', 'salvoEm', 'acoes']
  }

  getAllImagensByUsuarioId() {

    this.imagemService.getAllImagensByUsuarioId(this.usuarioId).subscribe((response) => {
       this.imagens.data = response;
       this.imagens.paginator = this.paginator;

       this.imagens.data.forEach(i => {
        if(i.nome !== '') {
          i.nome = `http://localhost:5000/Images/${i.nome}`;
        }
       });

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


    }, (error) => {
       console.log(error);
    });
    this.displayedColumns = this.exibirColunas();
  }

  abrirDialog(id: number): void{
    this.dialog.open(DialogExclusaoImagemComponent, {
       data: {
         imagemId: id
       }
     }).afterClosed().subscribe((resultado: boolean) => {
       if(resultado === true){
           // debugger;
           this.imagemService.getImagens().subscribe((dados) => {
              this.imagens.data = dados;

              this.imagens.data.forEach(i => {
                if(i.nome !== '') {
                  i.nome = `http://localhost:5000/Images/${i.nome}`;
                }
               });

           });
           this.displayedColumns = this.exibirColunas();
        }
     });
 }

}
