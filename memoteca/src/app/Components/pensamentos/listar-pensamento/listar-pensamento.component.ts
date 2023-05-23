import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  autoCompleteInput = new FormControl();

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  opcoesConteudos: string[] = [];
  conteudos?: Observable<string[]>;;

  constructor(private pensamentoService: PensamentoService, private router: Router) { }

  ngOnInit(): void {
    this.pegarTodosPensamentos();
  }

  pegarTodosPensamentos() {
      this.pensamentoService.listarPensamentos(this.paginaAtual).subscribe((response) => {
         // console.log(response);
        response.forEach((conteudo) => {
           this.opcoesConteudos.push(conteudo.conteudo);
        });
         this.listaPensamentos = response;

         this.conteudos = this.autoCompleteInput.valueChanges
             .pipe(startWith(''), map((conteudo) => this.filtrarConteudo(conteudo)))
      }, (error) => {
        console.error(error);
      });
  }

  carregarMaisPensamentos() {
    this.pensamentoService.listarPensamentos(++this.paginaAtual).subscribe((listaPensamentos) => {
      if(Array.isArray(listaPensamentos)) {
        this.listaPensamentos = listaPensamentos;
    } else {
        this.haMaisPensamentos = false;
    }
    }, (error) => {
      console.error(error);
    })
  }

  carregarMaisPensamentosFavoritos() {
    this.pensamentoService.listarPensamentoFavorito(++this.paginaAtual).subscribe((listarPensamentosFavoritos) => {
      if(Array.isArray(listarPensamentosFavoritos)) {
        this.listaPensamentos = listarPensamentosFavoritos;
      } else {
        this.haMaisPensamentos = false;
      }
    }, (error) => {
      console.error(error);
    })
  }

  recarregarComponente() {
     // location.reload();
     this.favoritos = false;
     this.paginaAtual = 1;
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = 'reload';
     this.router.navigate([this.router.url]);

  }

  listarFavoritos() {
     this.titulo = 'Meus Favoritos';
     this.favoritos = true;
     this.haMaisPensamentos = true;
     this.paginaAtual = 1;
     this.pensamentoService.listarPensamentoFavorito(this.paginaAtual).subscribe((response) => {
         this.listaPensamentos = response;
         this.listaFavoritos = response;
     });
  }

  filtrarConteudo(conteudo: string): string[] {
      this.haMaisPensamentos = true;
      this.paginaAtual = 1;
      if(conteudo.trim().length >=3 ){
          this.pensamentoService.listarPensamentosPorConteudo(conteudo.toLowerCase(), this.paginaAtual)
              .subscribe(listaConteudo => {
                 this.listaPensamentos = listaConteudo;
              })
      } else {
          if(conteudo === ''){
            this.pensamentoService.listarPensamentos(this.paginaAtual).subscribe(response => {
              this.listaPensamentos = response;
            })
          }
      }

      return this.opcoesConteudos.filter(conteudoFiltrado => {
        conteudoFiltrado.toLowerCase().includes(conteudo.toLowerCase());
      })
  }

}
