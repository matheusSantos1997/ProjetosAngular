import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { GanhosService } from 'src/app/services/ganhos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackBarComponent } from 'src/app/components/customs/icon-snack-bar.component';

@Component({
  selector: 'app-dialog-exclusao-ganhos',
  templateUrl: './dialog-exclusao-ganhos.component.html',
  styleUrls: ['./dialog-exclusao-ganhos.component.css']
})
export class DialogExclusaoGanhosComponent {

  constructor(@Inject (MAT_DIALOG_DATA) public data: any,
              private ganhosService: GanhosService,
              private snackBar: MatSnackBar) { }

  excluirGanho(ganhoId: number) {
      this.ganhosService.excluirGanho(ganhoId).subscribe((resultado) => {
        this.snackBar.openFromComponent(IconSnackBarComponent, {
          data: {
            icon: 'done',
            message: `${resultado.mensagem}`
          },
          duration: 2000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
       });
      });
  }


}
