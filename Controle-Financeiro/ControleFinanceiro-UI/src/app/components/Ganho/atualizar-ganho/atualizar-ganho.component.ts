import { IconSnackBarComponent } from './../../customs/icon-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MesService } from './../../../services/Mes.service';
import { GanhosService } from './../../../services/ganhos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { Ganho } from 'src/app/models/Ganho';
import { Mes } from './../../../models/Mes';
import { CategoriasService } from 'src/app/services/Categorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-atualizar-ganho',
  templateUrl: './atualizar-ganho.component.html',
  styleUrls: ['./atualizar-ganho.component.css']
})
export class AtualizarGanhoComponent implements OnInit {

  ganho: Observable<Ganho>;
  ganhoId: number;
  valorGanho: any;
  categorias: Categoria[];
  meses: Mes[];
  formulario: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ganhosService: GanhosService,
              private categoriasService: CategoriasService,
              private mesService: MesService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.ganhoId = this.route.snapshot.params.id;

    forkJoin([
        this.categoriasService.filtrarCategoriasGanhos(),
        this.mesService.pegarTodos(),
        this.ganhosService.pegarGanhoPeloId(this.ganhoId)
    ]).subscribe(([resultadoCategoria, resultadoMes, resultadoGanho]) => {
        this.categorias = resultadoCategoria;
        this.meses = resultadoMes;
        this.valorGanho = resultadoGanho.valor.toFixed(2).replace('.', ',');

        this.formulario = new FormGroup({
          ganhoId: new FormControl(resultadoGanho.ganhoId),
          descricao: new FormControl(resultadoGanho.descricao, [Validators.required,
                                                                Validators.minLength(1),
                                                                Validators.maxLength(50)]),
          categoriaId: new FormControl(resultadoGanho.categoriaId, [Validators.required]),
          valor: new FormControl(resultadoGanho.valor, [Validators.required]),
          dia: new FormControl(resultadoGanho.dia, [Validators.required]),
          mesId: new FormControl(resultadoGanho.mesId, [Validators.required]),
          ano: new FormControl(resultadoGanho.ano, [Validators.required]),
          usuarioId: new FormControl(resultadoGanho.usuarioId)

       })
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  enviarFormulario(): void {
     const ganho = this.formulario.value;

     this.ganhosService.atualizarGanho(this.ganhoId, ganho).subscribe((resultado) => {
       this.router.navigate(['/ganhos/listagemganhos']);
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
     }, (erro) => {
        if(erro.status === 400) {
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
     this.router.navigate(['/ganhos/listagemganhos']);
  }
}
