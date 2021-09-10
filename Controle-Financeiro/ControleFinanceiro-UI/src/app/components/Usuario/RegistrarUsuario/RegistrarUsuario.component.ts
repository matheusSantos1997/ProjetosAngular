import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DadosRegistro } from 'src/app/models/DadosRegistro';
import { UsuariosService } from 'src/app/services/Usuarios.service';

@Component({
  selector: 'app-RegistrarUsuario',
  templateUrl: './RegistrarUsuario.component.html',
  styleUrls: ['./RegistrarUsuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  formulario: any;
  foto: File = null;
  erros: string[];

  constructor(private usuariosService: UsuariosService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
      this.erros = [];

      this.formulario = new FormGroup({
         nomeUsuario: new FormControl(null, [Validators.required,
                                             Validators.minLength(6),
                                             Validators.maxLength(50)]),
         cpf: new FormControl(null, [Validators.required,
                                     Validators.minLength(1),
                                     Validators.maxLength(20)]),
         profissao: new FormControl(null, [Validators.required,
                                           Validators.minLength(1),
                                           Validators.maxLength(30)]),
         foto: new FormControl(null, Validators.required),
         email: new FormControl(null, [Validators.required,
                                       Validators.email,
                                       Validators.minLength(10),
                                       Validators.maxLength(50)]),
         senha: new FormControl(null, [Validators.required,
                                       Validators.minLength(6),
                                       Validators.maxLength(50)])
      })
  }

  get propriedade() {
      return this.formulario.controls;
  }

  selecionarFoto(fileInput: any): void {
      this.foto = fileInput.target.files[0] as File; // pegando a foto e transformando em um arquivo

      // lendo o arquivo
      const reader = new FileReader();

      // assim que carregar
      reader.onload = (e: any) => {
          document.getElementById('foto').removeAttribute('hidden'); // remove o atributo hidden
          document.getElementById('foto').setAttribute('src', e.target.result); // seta a imagem
      }

      reader.readAsDataURL(this.foto); // lê a foto como url
  }

  enviarFormulario(): void {
     this.erros = [];
     const usuario = this.formulario.value;
     const formData: FormData = new FormData();

     // verifica se a foto é diferente de nula
     if(this.foto !== null){
        formData.append('file', this.foto, this.foto.name); // adiciona ao formData
     }

     // salvando a foto
     this.usuariosService.salvarFoto(formData).subscribe((resultado) => {
          const dadosRegistro: DadosRegistro = new DadosRegistro();
          dadosRegistro.nomeUsuario = usuario.nomeUsuario;
          dadosRegistro.cpf = usuario.cpf;
          dadosRegistro.foto = resultado.foto;
          dadosRegistro.profissao = usuario.profissao;
          dadosRegistro.email = usuario.email;
          dadosRegistro.senha = usuario.senha;

          this.usuariosService.registrarUsuario(dadosRegistro).subscribe((dados) => {
              const emailUsuarioLogado = dados.emailUsuarioLogado;
              const usuarioId = dados.usuarioId;
              const tokenUsuarioLogado = dados.tokenUsuarioLogado;
              localStorage.setItem('EmailUsuarioLogado', emailUsuarioLogado);
              localStorage.setItem('UsuarioId', usuarioId);
              localStorage.setItem('TokenUsuarioLogado', tokenUsuarioLogado)
              this.router.navigate(['usuarios/loginusuario']);
              this.snackBar.open('Usuario registrado com sucesso.', null, {
                duration: 2000,
                panelClass: ['snackbar-success'],
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
          });
     });

  }

}
