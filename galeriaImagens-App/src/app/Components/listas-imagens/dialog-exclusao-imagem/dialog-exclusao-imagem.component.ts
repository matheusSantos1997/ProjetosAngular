import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagemService } from 'src/app/services/imagem.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-exclusao-imagem',
  templateUrl: './dialog-exclusao-imagem.component.html',
  styleUrls: ['./dialog-exclusao-imagem.component.css']
})
export class DialogExclusaoImagemComponent {

  constructor(@Inject (MAT_DIALOG_DATA) public dados: any,
              private imagemService: ImagemService,
              private snackBar: MatSnackBar) { }

  excluirImagem(imagemId: number) {
      this.imagemService.deleteUpload(imagemId).subscribe((resultado) => {
        this.snackBar.open('Imagem excluida com sucesso', null, {
          duration: 2000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
  }

}
