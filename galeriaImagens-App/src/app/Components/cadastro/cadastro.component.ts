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

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.formulario = this.fb.group({
        nome: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        cpf: new FormControl(null, [Validators.required]),
        profissao: new FormControl(null, [Validators.required]),
        nomeUsuario: new FormControl(null, [Validators.required]),
        senha: new FormControl(null, [Validators.required])
     })
  }

  salvarFormulario(): void {
    const usuario = this.formulario.value;
      this.usuarioService.registrarUsuario(usuario).subscribe((response) => {
         this.router.navigateByUrl('usuario/login');
         this.snackBar.open('Usuario registrado com sucesso.', null, {
             duration: 2000,
             panelClass: ['snackbar-success'],
             horizontalPosition: 'right',
             verticalPosition: 'top'
         });
      });
  }

}
