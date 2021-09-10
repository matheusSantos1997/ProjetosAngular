import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cartao } from 'src/app/models/Cartao';
import { CartoesService } from 'src/app/services/Cartoes.service';

@Component({
  selector: 'app-AtualizarCartao',
  templateUrl: './AtualizarCartao.component.html',
  styleUrls: ['../ListagemCartoes/ListagemCartoes.component.css']
})
export class AtualizarCartaoComponent implements OnInit {

  formulario: any;
  cartao: Observable<Cartao>;
  numeroCartao: string;
  erros: string[];
  cartaoId: number;

  constructor(private cartoesService: CartoesService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
     this.erros = [];
     this.cartaoId = this.route.snapshot.params.id;

     this.cartoesService.pegarCartaoPeloId(this.cartaoId).subscribe((resultado) => {
         this.numeroCartao = resultado.numero;
         this.formulario = new FormGroup({
            cartaoId: new FormControl(resultado.cartaoId),
            nome: new FormControl(resultado.nome, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
            bandeira: new FormControl(resultado.bandeira, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
            numero: new FormControl(resultado.numero, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
            limite: new FormControl(resultado.limite, [Validators.required]),
            usuarioId: new FormControl(resultado.usuarioId)
         });
     });
  }

  get propriedade() {
     return this.formulario.controls;
  }

  enviarFormulario(): void {
     this.erros = [];
     const cartao = this.formulario.value;

     this.cartoesService.atualizarCartao(this.cartaoId, cartao).subscribe((resultado) => {
          this.router.navigate(['cartoes/listagemcartoes']);
          this.snackBar.open(resultado.mensagem, null, {
              duration: 2000,
              panelClass: ['snackbar-success'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
          });
     }, (erro) => {
      if(erro.status === 400) {
        this.snackBar.open('Erro ao atualizar cartões', null, {
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
