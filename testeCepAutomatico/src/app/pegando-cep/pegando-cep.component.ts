import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CepService } from '../services/cep.service';

@Component({
  selector: 'app-pegando-cep',
  templateUrl: './pegando-cep.component.html',
  styleUrls: ['./pegando-cep.component.css']
})
export class PegandoCepComponent implements OnInit {

  formulario: FormGroup;
  mask:string;
  password: boolean = false;

  constructor(private fb: FormBuilder, private cepService: CepService) { }

  ngOnInit(): void {

    this.formulario = this.fb.group({
      cep: new FormControl(null, [Validators.required]),
      rua: new FormControl(null),
      numero: new FormControl(null, [Validators.required]),
      complemento: new FormControl(null),
      bairro: new FormControl(null),
      cidade: new FormControl(null),
      uf: new FormControl(null),
      ibge: new FormControl(null),
      cpfCnpj: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')])
    });
  }

  alternarImagem() {
    this.password = !this.password; // vai fazer com que as imagens suma da tela
 }

 limpaFormularioCep() {
  let cep = document.getElementById('cep') as HTMLInputElement;

   if(cep.value === '' || cep.value === undefined) {

    let rua = document.getElementById('rua') as HTMLInputElement;
    rua.value = '';

    let complemento = document.getElementById('complemento') as HTMLInputElement;
    complemento.value = '';

    let bairro = document.getElementById('bairro') as HTMLInputElement;
    bairro.value = '';

    let cidade = document.getElementById('cidade') as HTMLInputElement;
    cidade.value = '';

    let uf = document.getElementById('uf') as HTMLInputElement;
    uf.value = '';

    let ibge = document.getElementById('ibge') as HTMLInputElement;
    ibge.value = '';

   }


 }

 consultaCEP() {
  const cep = this.formulario.get('cep').value;
    this.cepService.consultaCEP(cep)
    .subscribe(dados => this.infoCep(dados));

}

infoCep(conteudo: any) {
  if (conteudo.cep) {
      //Atualiza os campos com os valores.
      let rua = document.getElementById('rua') as HTMLInputElement;
      rua.value=(conteudo.logradouro);

      let complemento = document.getElementById('complemento') as HTMLInputElement;
      complemento.value=(conteudo.complemento);

      let bairro = document.getElementById('bairro') as HTMLInputElement;
      bairro.value=(conteudo.bairro);

      let cidade = document.getElementById('cidade') as HTMLInputElement;
      cidade.value=(conteudo.localidade);

      let uf = document.getElementById('uf') as HTMLInputElement;
      uf.value=(conteudo.uf);

      let ibge = document.getElementById('ibge') as HTMLInputElement;
      ibge.value=(conteudo.ibge);

      this.limpaFormularioCep();

  } //end if.
  else {
      //CEP não Encontrado.
      this.limpaFormularioCep();
      console.log("CEP não encontrado.");
  }
  }

  // cpfCnpjMask() {
  //   const value = this.formulario.get('cpfCnpj').value;
  //   // console.log(value, value.length,this.formulario)
  //   if(value.length <= 14) {

  //     this.mask = '000.000.000-00'
  //   }
  //   else {
  //     this.mask = '00.000.000/0000-00'
  //   }
  // }

  mostrarSenha() {
    const senha = document.querySelector("#password") as HTMLInputElement;
    if (senha.type === "password") {
      senha.type = "text";
    } else {
      senha.type = "password";
    }
  }

}
