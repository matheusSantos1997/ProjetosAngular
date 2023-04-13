import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuario.service';

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

  logar(): void {
    const usuario = this.formulario.value;
    this.bLoading = true;
    this.usuarioService.logarUsuario(usuario).subscribe((response) => {

      const emailUsuarioLogado = response.emailUsuarioLogado;
      const usuarioId = response.usuarioId;
      const tokenUsuarioLogado = response.tokenUsuario;
      localStorage.setItem('EmailUsuarioLogado', emailUsuarioLogado);
      localStorage.setItem('UsuarioId', usuarioId);
      localStorage.setItem('TokenUsuarioLogado', tokenUsuarioLogado);

      this.bLoading = false;
      this.router.navigateByUrl('/');
      this.snackBar.open(`Bem vindo usuário ${response.emailUsuarioLogado}`, null, {
        duration: 2000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
     });


    }, (error) => {
      this.bLoading = false;
       if(error.status === 401){
        this.snackBar.open('Usuário e/ou senha incorretos.', null, {
          duration: 2000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
       } else {
         console.log(error);
       }
    })
  }

}
