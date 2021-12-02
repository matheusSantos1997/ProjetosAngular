import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Cartao } from 'src/app/models/Cartao';
import { Categoria } from 'src/app/models/Categoria';
import { Despesa } from 'src/app/models/Despesa';
import { Mes } from 'src/app/models/Mes';
import { CartoesService } from 'src/app/services/Cartoes.service';
import { DespesasService } from 'src/app/services/Despesas.service';
import { MesService } from 'src/app/services/Mes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from 'src/app/services/Categorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconSnackBarComponent } from '../../customs/icon-snack-bar.component';

@Component({
  selector: 'app-AtualizarDespesa',
  templateUrl: './AtualizarDespesa.component.html',
  styleUrls: ['./AtualizarDespesa.component.css']
})
export class AtualizarDespesaComponent implements OnInit {

  despesa: Observable<Despesa>;
  valorDespesa: number;
  formulario: any;
  cartoes: Cartao[];
  categorias: Categoria[];
  meses: Mes[];
  despesaId: number;
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(private despesaService: DespesasService,
              private cartoesService: CartoesService,
              private categoriasService: CategoriasService,
              private mesesService: MesService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
      this.despesaId = this.route.snapshot.params.id;

      this.cartoesService.pegarCartoesPeloUsuarioId(this.usuarioId).subscribe((resultado) => {
        this.cartoes = resultado;
      });

      this.categoriasService.filtrarCategoriasDespesas().subscribe((resultado) => {
        this.categorias = resultado;
      });

      this.mesesService.pegarTodos().subscribe((resultado) => {
        this.meses = resultado;
      });

      this.despesaService.pegarDespesaPeloId(this.despesaId).subscribe((resultado) => {
        this.valorDespesa = resultado.valor;

        this.formulario = new FormGroup({
          despesaId: new FormControl(resultado.despesaId),
          cartaoId: new FormControl(resultado.cartaoId, Validators.required),
          descricao: new FormControl(resultado.descricao, 
                        [Validators.required, 
                        Validators.minLength(1),
                        Validators.maxLength(50)]),
          categoriaId: new FormControl(resultado.categoriaId, Validators.required),
          valor: new FormControl(resultado.valor, Validators.required),
          dia: new FormControl(resultado.dia, Validators.required),
          mesId: new FormControl(resultado.mesId, Validators.required),
          ano: new FormControl(resultado.ano, Validators.required),
          usuarioId: new FormControl(resultado.usuarioId)
      });
    });
  }

  get propriedade() {
      return this.formulario.controls;
  }

  enviarFormulario(): void {
      const despesa = this.formulario.value;
      this.despesaService.atualizarDespesa(this.despesaId, despesa).subscribe((resultado) => {
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
      }, (erro) => {
         if(erro.status === 400){
          this.snackBar.openFromComponent(IconSnackBarComponent, {
            data: {
               icon: 'gpp_bad',
               message: ' Algo deu Errado.'
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
      this.router.navigate(['/despesas/listagemdespesas']);
  }

}
