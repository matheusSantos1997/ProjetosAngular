import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuncoesService } from 'src/app/services/Funcoes.service';

@Component({
  selector: 'app-DialogExclusaoFuncao',
  templateUrl: './DialogExclusaoFuncao.component.html',
  styleUrls: ['./DialogExclusaoFuncao.component.css']
})
export class DialogExclusaoFuncaoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private funcoesService: FuncoesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  excluirFuncao(funcaoId: string): void{
      this.funcoesService.excluirFuncao(funcaoId).subscribe(resultado => {
         this.snackBar.open(resultado.mensagem, null, {
           duration: 2000,
           panelClass: ['snackbar-success'],
           horizontalPosition: 'right',
           verticalPosition: 'top'
         });
      }, (erro) => {
           if(erro.status === 400) {
              this.snackBar.open('Erro ao excluir a função', null, {
                 duration: 2000,
                 panelClass: ['snackbar-error'],
                 horizontalPosition: 'right',
                 verticalPosition: 'top'
              });
           }
      });
  }

}
