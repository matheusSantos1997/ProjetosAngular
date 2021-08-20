import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncoesService } from 'src/app/services/Funcoes.service';

@Component({
  selector: 'app-AtualizarFuncao',
  templateUrl: './AtualizarFuncao.component.html',
  styleUrls: ['../ListagemFuncoes/ListagemFuncoes.component.css']
})
export class AtualizarFuncaoComponent implements OnInit {

  funcaoId: string;
  nomeFuncao: string;
  formulario: any;
  erros: string[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private funcoesService: FuncoesService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.erros = [];
     this.funcaoId = this.route.snapshot.params.id;

     this.funcoesService.pegarFuncaoPeloId(this.funcaoId).subscribe((resultado) => {
         this.nomeFuncao = resultado.name; // atribui o resultado na variavel nomeFuncao
         this.formulario = new FormGroup({
             id: new FormControl(resultado.id),
             name: new FormControl(resultado.name, [Validators.required, Validators.maxLength(50)]),
             descricao: new FormControl(resultado.descricao, [Validators.required, Validators.maxLength(50)])
         });
     });
  }

  get propriedade(){
     return this.formulario.controls;
  }

  enviarFormulario(): void {
     this.erros = [];
     const funcao = this.formulario.value;
     this.funcoesService.atualizarFuncao(this.funcaoId, funcao).subscribe((resultado) => {
          this.router.navigate(['/funcoes/listagemfuncoes']);
          this.snackBar.open(resultado.mensagem, null, {
             duration: 2000,
             panelClass: ['snackbar-success'],
             horizontalPosition: 'right',
             verticalPosition: 'top'
          });
     }, (erro) => {
        if(erro.status === 400){
           this.snackBar.open('Erro ao atualizar uma função.', null, {
              duration: 2000,
              panelClass: ['snackbar-error'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
           });
        }
     });
  }

  voltarListagem(): void{
    this.router.navigate(['/funcoes/listagemfuncoes']);
 }

}
