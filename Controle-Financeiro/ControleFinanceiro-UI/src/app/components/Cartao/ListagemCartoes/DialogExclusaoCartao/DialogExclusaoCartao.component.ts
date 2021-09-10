import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartoesService } from 'src/app/services/Cartoes.service';

@Component({
  selector: 'app-DialogExclusaoCartao',
  templateUrl: './DialogExclusaoCartao.component.html',
  styleUrls: ['./DialogExclusaoCartao.component.css']
})
export class DialogExclusaoCartaoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private cartoesService: CartoesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  excluirCartao(cartaoId: number): void {
      this.cartoesService.excluirCartao(cartaoId).subscribe((resultado) => {
          this.snackBar.open(resultado.mensagem, null, {
             duration: 2000,
             panelClass: ['snackbar-success'],
             horizontalPosition: 'right',
             verticalPosition: 'top'
          });
      }, (erro) => {
         if(erro.status === 400) {
            this.snackBar.open('Erro ao excluir cartões.', null, {
              duration: 2000,
              panelClass: ['snackbar-error'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
         }
      });
  }

}
