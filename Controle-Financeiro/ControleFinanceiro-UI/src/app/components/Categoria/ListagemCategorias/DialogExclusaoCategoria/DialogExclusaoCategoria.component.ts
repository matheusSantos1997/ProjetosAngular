import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from 'src/app/services/Categorias.service';

@Component({
  selector: 'app-DialogExclusaoCategoria',
  templateUrl: './DialogExclusaoCategoria.component.html',
  styleUrls: ['./DialogExclusaoCategoria.component.css']
})
export class DialogExclusaoCategoriaComponent {

  constructor(@Inject (MAT_DIALOG_DATA) public dados: any,
  private categoriasService: CategoriasService,
  private snackBar: MatSnackBar) { }

  excluirCategoria(categoriaId: number): void{
    this.categoriasService.excluirCategoria(categoriaId)
        .subscribe(resultado => {
             // this.dados = resultado;
             this.snackBar.open(resultado.mensagem, null, {
               duration: 2000,
               panelClass: ['snackbar-success'],
               horizontalPosition: 'right',
               verticalPosition: 'top'
             });
        }, (erro) => {
           this.snackBar.open('Erro ao deletar', null, {
              duration: 2000,
              panelClass: ['snackbar-error'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
           });
        });
}


}
