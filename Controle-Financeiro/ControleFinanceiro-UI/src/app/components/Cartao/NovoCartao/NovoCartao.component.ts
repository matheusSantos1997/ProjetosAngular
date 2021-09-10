import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cartao } from 'src/app/models/Cartao';
import { CartoesService } from 'src/app/services/Cartoes.service';

@Component({
  selector: 'app-NovoCartao',
  templateUrl: './NovoCartao.component.html',
  styleUrls: ['../ListagemCartoes/ListagemCartoes.component.css']
})
export class NovoCartaoComponent implements OnInit {

  formulario: any;
  erros: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  verifyData: Cartao;

  constructor(private cartoesService: CartoesService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.erros = [];

     this.formulario = new FormGroup({
         nome: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
         bandeira: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
         numero: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
         limite: new FormControl(null, [Validators.required]),
         usuarioId: new FormControl(this.usuarioId)
     });
  }

  get propriedade() {
      return this.formulario.controls;
  }

  enviarFormulario(): void{
      this.erros = [];
      const cartao = this.formulario.value;
      this.cartoesService.novoCartao(cartao).subscribe((resultado) => {

        this.router.navigate(['cartoes/listagemcartoes']);
        this.snackBar.open(resultado.mensagem, null, {
            duration: 2000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });

      }, (erro) => {
        if(erro.status === 400){
          this.snackBar.open('Erro ao inserir cartões', null, {
            duration: 2000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        })
        }
      });
  }

  voltarListagem(): void {
     this.router.navigate(['cartoes/listagemcartoes']);
  }

}
