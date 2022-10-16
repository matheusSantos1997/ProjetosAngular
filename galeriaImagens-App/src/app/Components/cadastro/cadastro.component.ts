import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario: FormGroup;
  bLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.validarFormulario();
  }

  validarFormulario(): void {
    this.formulario = this.fb.group({
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required, Validators.maxLength(14)]),
      profissao: new FormControl(null, [Validators.required]),
      nomeUsuario: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
   })
  }

  cadastrarUsuario(): void {
    const usuario = this.formulario.value;
    this.usuarioService.register(usuario).subscribe(() => {

      this.bLoading = false;
      this.router.navigateByUrl('usuario/login');
      this.snackBar.open('Bem vindo usuário.', null, {
        duration: 2000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
     });
    }, (error: any) => {
      console.log(error);
    })
  }

}
