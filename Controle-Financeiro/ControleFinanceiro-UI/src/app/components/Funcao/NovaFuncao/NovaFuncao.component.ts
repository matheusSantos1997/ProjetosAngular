import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuncoesService } from 'src/app/services/Funcoes.service';

@Component({
  selector: 'app-NovaFuncao',
  templateUrl: './NovaFuncao.component.html',
  styleUrls: ['../ListagemFuncoes/ListagemFuncoes.component.css']
})
export class NovaFuncaoComponent implements OnInit {

  formulario: any;

  constructor(private router: Router,
              private funcoesService: FuncoesService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

      this.formulario = new FormGroup({
          name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
          descricao: new FormControl(null, [Validators.required, Validators.maxLength(50)])
      });
  }

  get propriedade(){
     return this.formulario.controls;
  }

  enviarFormulario(): void {
      const funcao = this.formulario.value;

      this.funcoesService.novaFuncao(funcao).subscribe((resultado) => {
           this.router.navigate(['/funcoes/listagemfuncoes']);
           this.snackBar.open(resultado.mensagem, null, {
              duration: 2000,
              panelClass: ['snackbar-success'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
           });
      }, (erro) => {
         if(erro.status === 400){
            this.snackBar.open('Erro ao inserir uma função.', null, {
              duration: 2000,
              panelClass: ['snackbar-error'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
         }
      })
  }

  voltarListagem(): void{
     this.router.navigate(['/funcoes/listagemfuncoes']);
  }

}
