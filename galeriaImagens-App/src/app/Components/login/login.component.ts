import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  bLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.formulario = this.fb.group({
        email: new FormControl(null, [Validators.required]),
        senha: new FormControl(null, [Validators.required])
    });
  }

  salvarFormulario(): void {
    const usuario = this.formulario.value;
    this.bLoading = true;
    this.usuarioService.logarUsuario(usuario).pipe(delay(1000)).subscribe((response) => {
      const emailUsuarioLogado = response.emailUsuarioLogado;
      const usuarioId = response.usuarioId;
      const tokenUsuarioLogado = response.token;
      localStorage.setItem('EmailUsuarioLogado', emailUsuarioLogado);
      localStorage.setItem('UsuarioId', usuarioId);
      localStorage.setItem('token', tokenUsuarioLogado);
      this.bLoading = false;

      this.router.navigate(['/imagens']);

      this.snackBar.open('Bem vindo usuário.', null, {
        duration: 2000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
    });

    }, (error) => {
      this.bLoading = false;
       if(error.status === 404) {
        this.snackBar.open('Usuário e/ou senha incorretos.', null, {
          duration: 2000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
       } else {
        this.snackBar.open('Algo deu errado!', null, {
          duration: 2000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
       }
    })
  }

}
