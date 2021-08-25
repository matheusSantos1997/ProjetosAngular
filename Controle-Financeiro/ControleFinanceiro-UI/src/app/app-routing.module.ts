import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtualizarCategoriaComponent } from './components/Categoria/AtualizarCategoria/AtualizarCategoria.component';
import { ListagemCategoriasComponent } from './components/Categoria/ListagemCategorias/ListagemCategorias.component';
import { NovaCategoriaComponent } from './components/Categoria/NovaCategoria/NovaCategoria.component';
import { AtualizarFuncaoComponent } from './components/Funcao/AtualizarFuncao/AtualizarFuncao.component';
import { ListagemFuncoesComponent } from './components/Funcao/ListagemFuncoes/ListagemFuncoes.component';
import { NovaFuncaoComponent } from './components/Funcao/NovaFuncao/NovaFuncao.component';
import { RegistrarUsuarioComponent } from './components/Usuario/Registro/RegistrarUsuario/RegistrarUsuario.component';

const routes: Routes = [
  // rotas de categorias
  {
    path: 'categorias/listagemcategorias', component: ListagemCategoriasComponent
  },
  {
    path: 'categorias/novacategoria', component: NovaCategoriaComponent
  },
  {
    path: 'categorias/atualizarcategoria/:id', component: AtualizarCategoriaComponent
  },
  // {
  //   path: '', pathMatch: 'full', redirectTo: 'categorias/listagemcategorias'
  // },
  // {
  //   path: '**', redirectTo: 'categorias/listagemcategorias'
  // },

  // rotas de funçoes
  {
    path: 'funcoes/listagemfuncoes', component: ListagemFuncoesComponent
  },
  {
    path: 'funcoes/novafuncao', component: NovaFuncaoComponent
  },
  {
    path: 'funcoes/atualizarfuncao/:id', component: AtualizarFuncaoComponent
  },
  {
    path: 'usuarios/registrarusuario', component: RegistrarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
