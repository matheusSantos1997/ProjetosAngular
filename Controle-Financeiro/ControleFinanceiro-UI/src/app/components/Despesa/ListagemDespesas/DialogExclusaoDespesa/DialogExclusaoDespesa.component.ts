import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackBarComponent } from 'src/app/components/customs/icon-snack-bar.component';
import { DespesasService } from 'src/app/services/Despesas.service';

@Component({
  selector: 'app-DialogExclusaoDespesa',
  templateUrl: './DialogExclusaoDespesa.component.html',
  styleUrls: ['./DialogExclusaoDespesa.component.css']
})
export class DialogExclusaoDespesaComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private despesasSevice: DespesasService,
              private snackBar: MatSnackBar) { }

  excluirDespesa(despesaId: number): void {
     this.despesasSevice.excluirDespesa(despesaId).subscribe((resultado) => {
      this.snackBar.openFromComponent(IconSnackBarComponent, {
        data: {
           icon: 'done',
           message: resultado.mensagem  
        },
         duration: 2000,
         panelClass: ['snackbar-success'],
         horizontalPosition: 'right',
         verticalPosition: 'top'   
     });
    });
  }

}
