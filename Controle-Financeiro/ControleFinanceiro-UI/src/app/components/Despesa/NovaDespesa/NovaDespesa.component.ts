import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cartao } from 'src/app/models/Cartao';
import { Categoria } from 'src/app/models/Categoria';
import { Mes } from 'src/app/models/Mes';
import { CartoesService } from 'src/app/services/Cartoes.service';
import { CategoriasService } from 'src/app/services/Categorias.service';
import { DespesasService } from 'src/app/services/Despesas.service';
import { MesService } from 'src/app/services/Mes.service';
import { IconSnackBarComponent } from '../../customs/icon-snack-bar.component';

@Component({
  selector: 'app-NovaDespesa',
  templateUrl: './NovaDespesa.component.html',
  styleUrls: ['../ListagemDespesas/ListagemDespesas.component.css']
})
export class NovaDespesaComponent implements OnInit {

  formulario: any;
  cartoes: Cartao[];
  categorias: Categoria[];
  meses: Mes[];
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private depesasService: DespesasService,
              private cartoesService: CartoesService,
              private categoriasService: CategoriasService,
              private mesesService: MesService) { }

  ngOnInit(): void {
      this.cartoesService.pegarCartoesPeloUsuarioId(this.usuarioId).subscribe((resultado) => {
           this.cartoes = resultado;
      });

      this.categoriasService.filtrarCategoriasDespesas().subscribe((resultado) => {
           this.categorias = resultado;
      });

      this.mesesService.pegarTodos().subscribe((resultado) => {
           this.meses = resultado;
      });

      this.formulario = new FormGroup({
          cartaoId: new FormControl(null, [Validators.required]),
          descricao: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
          categoriaId: new FormControl(null, [Validators.required]),
          valor: new FormControl(null, [Validators.required]),
          dia: new FormControl(null, [Validators.required]),
          mesId: new FormControl(null, [Validators.required]),
          ano: new FormControl(null, [Validators.required]),
          usuarioId: new FormControl(this.usuarioId)
      });
  }

  get propriedade() {
      return this.formulario.controls;
  }

  somenteNumeros(e: any) {
    let charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
  }

  voltarListagem(): void {
     this.router.navigate(['/despesas/listagemdespesas']);
  }

  enviarFormulario(): void{
      const despesa = this.formulario.value;

      this.depesasService.novaDespesa(despesa).subscribe((resultado) => {

          this.router.navigate(['/despesas/listagemdespesas']);
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
      }, (error) => {
         if (error.status === 400) {
            this.snackBar.openFromComponent(IconSnackBarComponent, {
               data: {
                   icon: 'gpp_bad',
                   message: ' Erro ao inserir.'
               },
               duration: 2000,
               panelClass: ['snackbar-error'],
               horizontalPosition: 'right',
               verticalPosition: 'top'
            });
         }
      });
  }

}
