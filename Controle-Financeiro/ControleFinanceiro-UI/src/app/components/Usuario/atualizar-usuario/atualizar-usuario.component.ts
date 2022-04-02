import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UsuariosService } from 'src/app/services/Usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AtualizarUsuario } from 'src/app/models/AtualizarUsuario';
import { IconSnackBarComponent } from '../../customs/icon-snack-bar.component';

@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.component.html',
  styleUrls: ['./atualizar-usuario.component.css']
})
export class AtualizarUsuarioComponent implements OnInit {

  formulario: any;
  usuarioId: string = localStorage.getItem('UsuarioId');
  emailUsuario: string;
  urlFoto: SafeResourceUrl;
  foto: File = null;
  fotoAnterior: File = null;

  constructor(private router: Router,
              private usuariosService: UsuariosService,
              private sanitizer: DomSanitizer,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.usuariosService.retornarFotoUsuario(this.usuarioId).subscribe((resultado) => {
         this.fotoAnterior = resultado.imagem;
         this.urlFoto = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + resultado.imagem);
     });

     this.usuariosService.pegarUsuarioPeloId(this.usuarioId).subscribe((resultado) => {
        this.emailUsuario = resultado.email;

        this.formulario = new FormGroup({
          id: new FormControl(resultado.id),
          username: new FormControl(resultado.userName, [Validators.required,
                                                         Validators.minLength(6),
                                                         Validators.maxLength(50)]),
          email: new FormControl(resultado.email, [Validators.required,
                                                   Validators.minLength(10),
                                                   Validators.maxLength(50),
                                                   Validators.email]),
          cpf: new FormControl(resultado.cpf, [Validators.required,
                                               Validators.minLength(1),
                                               Validators.maxLength(20)]),
          profissao: new FormControl(resultado.profissao, [Validators.required,
                                                           Validators.minLength(1),
                                                           Validators.maxLength(30)]),
          foto: new FormControl(null)
        });
     });
  }

  get propriedade() {
     return this.formulario.controls;
  }

  selecionarFoto(fileInput: any): void {
      this.foto = fileInput.target.files[0] as File; // pegando a foto

      // leitor de arquivo
      const reader = new FileReader();

      reader.onload = (e: any) => {
         document.getElementById('foto').removeAttribute('hidden');
         document.getElementById('foto').setAttribute('src', e.target.result);
      }

      // enviando o arquivo com url
      reader.readAsDataURL(this.foto);
  }

  salvarInformacoes(): void {
     const dados = this.formulario.value;

     if(this.foto !== null) {
        const formData: FormData = new FormData();
        formData.append('file', this.foto, this.foto.name);

        this.usuariosService.salvarFoto(formData).subscribe((resultado) => {
            const atualizarUsuario: AtualizarUsuario = new AtualizarUsuario();
            atualizarUsuario.id = dados.id;
            atualizarUsuario.userName = dados.username;
            atualizarUsuario.cpf = dados.cpf;
            atualizarUsuario.email = dados.email;
            atualizarUsuario.profissao = dados.profissao;
            atualizarUsuario.foto = resultado.foto;

            this.usuariosService.atualizarUsuario(atualizarUsuario).subscribe((resposta) => {
               this.router.navigate(['/dashboard/index']);
               this.snackBar.openFromComponent(IconSnackBarComponent, {
                data: {
                  icon: 'done',
                  message: `${resposta.mensagem}`
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

     } else {
      const atualizarUsuario: AtualizarUsuario = new AtualizarUsuario();
      atualizarUsuario.id = dados.id;
      atualizarUsuario.userName = dados.username;
      atualizarUsuario.cpf = dados.cpf;
      atualizarUsuario.email = dados.email;
      atualizarUsuario.profissao = dados.profissao;
      atualizarUsuario.foto = this.fotoAnterior;

      this.usuariosService.atualizarUsuario(atualizarUsuario).subscribe((resposta) => {
       this.router.navigate(['/dashboard/index']);
       this.snackBar.openFromComponent(IconSnackBarComponent, {
        data: {
          icon: 'done',
          message: `${resposta.mensagem}`
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
  }

  voltar(): void {
     this.router.navigate(['/dashboard/index']);
  }

}
