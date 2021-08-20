import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { Tipo } from 'src/app/models/Tipo';
import { CategoriasService } from 'src/app/services/Categorias.service';
import { TiposService } from 'src/app/services/Tipos.service';

@Component({
  selector: 'app-AtualizarCategoria',
  templateUrl: './AtualizarCategoria.component.html',
  styleUrls: ['../ListagemCategorias/ListagemCategorias.component.css']
})
export class AtualizarCategoriaComponent implements OnInit {
  nomeCategoria: string;
  categoriaId: number;
  categoria: Observable<Categoria>;
  tipos: Tipo[];
  formulario: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tiposService: TiposService,
              private categoriasService: CategoriasService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params.id;
     this.tiposService.pegarTodos().subscribe(resultado => {
       this.tipos = resultado;
     });

     // pegando os dados da categoria
     this.categoriasService.pegarCategoriaPeloId(this.categoriaId)
     .subscribe(resultado => {
       this.nomeCategoria = resultado.nome;
        this.formulario = new FormGroup({
           categoriaId: new FormControl(resultado.categoriaId),
           nome: new FormControl(resultado.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
           icone: new FormControl(resultado.icone, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
           tipoId: new FormControl(resultado.tipoId, [Validators.required])
        });
     });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  enviarFormulario(): void {
    const categoria = this.formulario.value;
    this.categoriasService.atualizarCategoria(this.categoriaId, categoria)
                          .subscribe((resultado) => {
                             this.router.navigate(['categorias/listagemcategorias']);
                             this.snackBar.open(resultado.mensagem, null, {
                              duration: 2000,
                              panelClass: ['snackbar-success'],
                              horizontalPosition: 'right',
                              verticalPosition: 'top'
                            });
                          }, (erro) => {
                            this.snackBar.open('Erro ao Atualizar', null, {
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
