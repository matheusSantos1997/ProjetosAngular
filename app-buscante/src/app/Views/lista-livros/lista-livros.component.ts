import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, of, throwError } from 'rxjs';
import { catchError, debounceTime, delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { Item, Livros, LivrosResultado } from 'src/app/Models/interfaces';
import { LivroVolumeInfo } from 'src/app/Models/livroVolumeInfo';
import { LivroService } from 'src/app/Services/livro.service';
const pause = 3000;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit {

  listaLivros: Livros[] = [];
  campoBusca = new FormControl()
  subscription?: Subscription;
  livro: Livros = {};
  mensagemErro = '';
  livrosResultados?: LivrosResultado;

  constructor(private service: LivroService) { }

  // totalLivrosEncontrados$ = this.campoBusca.valueChanges.pipe(
  //   delay(3000),
  //   filter((value: any) => {
  //     if(value.length >= 3) {
  //       return value;
  //     } else {
  //       return;
  //     }
  //   }),
  //   switchMap((value) => this.service.buscar(value)), // cancela todas as requisiçoes anteriores mantendo apenas a requisiçao atual
  //   tap(() => console.log('requisiçao feita')),
  //   map((totalItems) => this.livrosResultados = totalItems),
  //   catchError((error) => {
  //     console.error(error)
  //     return of();
  //   })

  // )

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    // debounceTime(3000),
    delay(3000),
    filter((value: any) => {
      if(value.length >= 3) {
        return value;
      } else {
        return;
      }
    }),
    tap(() => console.log('fluxo inicial')),
    switchMap((value) => this.service.buscar(value)), // cancela todas as requisiçoes anteriores mantendo apenas a requisiçao atual
    tap(() => console.log('requisiçao feita')),
    map((totalItems) => this.livrosResultados = totalItems),
    map((response) => response.items ?? []), // modifica o retorno de uma api em json
    map((items) => this.listaLivros = this.livrosResultadosParaLivros(items)),
    catchError(error => {
       console.log(error);
       return throwError(() => new Error(this.mensagemErro = 'erro ao carregar livros'))
    })
  )

  ngOnInit(): void {

  }

  // ngOnDestroy(): void {
  //    this.subscription?.unsubscribe(); // desinscreve do observable e poupa uso da memoria
  // }

  // buscarLivros() {
  //    this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: (items) => {
  //       console.log('Requests')
  //       this.listaLivros = this.livrosResultadosParaLivros(items)
  //     },
  //     error: (error) => console.error(error)
  //    })
  // }

  livrosResultadosParaLivros(items: Item[]): LivroVolumeInfo[] {
     return items.map(item => {
        return new LivroVolumeInfo(item);
     })
  }

}
