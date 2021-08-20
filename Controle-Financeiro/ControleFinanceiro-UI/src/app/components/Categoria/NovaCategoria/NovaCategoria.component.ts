import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tipo } from 'src/app/models/Tipo';
import { CategoriasService } from 'src/app/services/Categorias.service';
import { TiposService } from 'src/app/services/Tipos.service';

@Component({
  selector: 'app-NovaCategoria',
  templateUrl: './NovaCategoria.component.html',
  styleUrls: ['../ListagemCategorias/ListagemCategorias.component.css']
})
export class NovaCategoriaComponent implements OnInit {

  formulario: any;
  tipos: Tipo[];

  constructor(private tiposServices: TiposService,
              private categoriasSevices: CategoriasService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.tiposServices.pegarTodos().subscribe(resultado => {
       this.tipos = resultado;
       // console.log(resultado);
     });

     this.formulario = new FormGroup({
         nome: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
         icone: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
         tipoId: new FormControl(null, [Validators.required]),
     });
  }

  get propriedade() {
     return this.formulario.controls;
  }

  // sava formulario
  enviarFormulario(): void{
     const categoria = this.formulario.value;

     this.categoriasSevices.novaCategoria(categoria)
                           .subscribe(resultado => {
           this.router.navigate(['categorias/listagemcategorias']);
           this.snackBar.open(resultado.mensagem, null, {
            duration: 2000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
     }, (erro) => {
      this.snackBar.open('Erro ao inserir uma categoria', null, {
         duration: 2000,
         panelClass: ['snackbar-error'],
         horizontalPosition: 'right',
         verticalPosition: 'top'
      });
   });
  }

  voltarListagem(): void{
    this.router.navigate(['categorias/listagemcategorias']);
 }

}
