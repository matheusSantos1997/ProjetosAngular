import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { Mes } from 'src/app/models/Mes';
import { CategoriasService } from 'src/app/services/Categorias.service';
import { GanhosService } from 'src/app/services/ganhos.service';
import { MesService } from 'src/app/services/Mes.service';
import { IconSnackBarComponent } from '../../customs/icon-snack-bar.component';

@Component({
  selector: 'app-novo-ganho',
  templateUrl: './novo-ganho.component.html',
  styleUrls: ['./novo-ganho.component.css']
})
export class NovoGanhoComponent implements OnInit {

  formulario: any;
  categorias: Categoria[];
  meses: Mes[];
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(private router: Router,
              private ganhosService: GanhosService,
              private categoriasService: CategoriasService,
              private mesesService: MesService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

       forkJoin([
              this.categoriasService.filtrarCategoriasGanhos(),

              this.mesesService.pegarTodos()
       ]).subscribe(([resultadoCategoria, resultadoMes]) => {
            this.categorias = resultadoCategoria;
            this.meses = resultadoMes;
            console.log('meses', resultadoMes)
       });

       this.formulario = new FormGroup({
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

  enviarFormulario(): void {
      const ganho = this.formulario.value;
      this.ganhosService.novoGanho(ganho).subscribe((resultado) => {
          // this.router.navigate(['/ganhos/listagemganhos']);
          this.snackBar.openFromComponent(IconSnackBarComponent, {
            data: {
               icon: 'done',
               message: ` ${resultado.mensagem}`
            },
             duration: 2000,
             panelClass: ['snackbar-success'],
             horizontalPosition: 'right',
             verticalPosition: 'top'
        });
      }, (erro) => {
           if (erro.status === 400) {
               this.snackBar.openFromComponent(IconSnackBarComponent, {
                 data: {
                   icon: 'gpp_bad',
                   message: ' Algo deu errado.'
                 },
                 duration: 2000,
                 panelClass: ['snackbar-error'],
                 horizontalPosition: 'right',
                 verticalPosition: 'top'
               });
           }
      });
  }

  voltarListagem(): void {
      this.router.navigate(['/ganhos/listagemganhos']);
  }

}
