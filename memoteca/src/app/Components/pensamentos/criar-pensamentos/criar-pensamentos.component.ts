import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {

  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  formulario!: FormGroup;

  constructor(private pensamentoService: PensamentoService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
      this.validarFormulario();
  }

  validarFormulario() {
    this.formulario = this.fb.group({
       conteudo: new FormControl('', [Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)]),
       autoria: new FormControl('', [Validators.required, Validators.minLength(3)]),
       modelo: new FormControl('', [Validators.required]),
       favorito: new FormControl([false])
    })
  }

  criarPensamento() {
      //this.pensamentoService.criarPensamento(this.pensamento).subscribe((response) => {
        if(this.formulario.valid) {
          this.pensamentoService.criarPensamento(this.formulario.value).subscribe((response) => {
            console.log(response);
            this.router.navigate(['/listarPensamento']);
         }, (error) => {
           console.error(error);
         })
        }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  // habilitarBotao(): string {
  //    if(this.formulario.valid) {
  //       return 'botao'
  //    } else {
  //      return 'botao__desabilitado'
  //    }
  // }

}
