import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { UsuariosService } from 'src/app/services/Usuarios.service';
import { IconSnackBarComponent } from '../../customs/icon-snack-bar.component';

@Component({
  selector: 'app-LoginUsuario',
  templateUrl: './LoginUsuario.component.html',
  styleUrls: ['./LoginUsuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  formulario: any;
  erros: string[];
  bLoading: boolean = false;

  constructor(private usuariosService: UsuariosService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
     this.erros = [];

     this.formulario = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]),
        senha: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
     });
  }

  get propriedade(){
      return this.formulario.controls;
  }

  enviarFormulario() {
     this.erros = [];
     const dadosLogin = this.formulario.value;
     this.bLoading = true;
     this.usuariosService.logarUsuario(dadosLogin).pipe(delay(1000)).subscribe((resultado) => {
        const emailUsuarioLogado = resultado.emailUsuarioLogado;
        const usuarioId = resultado.usuarioId;
        const tokenUsuarioLogado = resultado.tokenUsuarioLogado;
        localStorage.setItem('EmailUsuarioLogado', emailUsuarioLogado);
        localStorage.setItem('UsuarioId', usuarioId);
        localStorage.setItem('TokenUsuarioLogado', tokenUsuarioLogado);
        this.bLoading = false;
        // console.log(tokenUsuarioLogado);
        this.router.navigate(['/dashboard/index']);
        this.snackBar.openFromComponent(IconSnackBarComponent, {
            data: {
               icon: 'done',
               message: ` Bem vindo ${resultado.emailUsuarioLogado}`
            },
             duration: 2000,
             panelClass: ['snackbar-success'],
             horizontalPosition: 'right',
             verticalPosition: 'top'
        });
     }, (erro) => {
        this.bLoading = false;
        if(erro.status === 404){
          this.snackBar.openFromComponent(IconSnackBarComponent, {
             data: {
                icon: 'gpp_bad',
                message: ' Email e/ou Senha inválidos.'
             },
             duration: 2000,
             panelClass: ['snackbar-error'],
             horizontalPosition: 'right',
             verticalPosition: 'top'
          });
        } else {
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
        console.log(erro);
     });

  }


}
