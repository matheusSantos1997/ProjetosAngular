import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtualizarCartaoComponent } from './components/Cartao/AtualizarCartao/AtualizarCartao.component';
import { ListagemCartoesComponent } from './components/Cartao/ListagemCartoes/ListagemCartoes.component';
import { NovoCartaoComponent } from './components/Cartao/NovoCartao/NovoCartao.component';
import { AtualizarCategoriaComponent } from './components/Categoria/AtualizarCategoria/AtualizarCategoria.component';
import { ListagemCategoriasComponent } from './components/Categoria/ListagemCategorias/ListagemCategorias.component';
import { NovaCategoriaComponent } from './components/Categoria/NovaCategoria/NovaCategoria.component';
import { DashboardComponent } from './components/dashboard/Dashboard/Dashboard.component';
import { AtualizarFuncaoComponent } from './components/Funcao/AtualizarFuncao/AtualizarFuncao.component';
import { ListagemFuncoesComponent } from './components/Funcao/ListagemFuncoes/ListagemFuncoes.component';
import { NovaFuncaoComponent } from './components/Funcao/NovaFuncao/NovaFuncao.component';
import { LoginUsuarioComponent } from './components/Usuario/LoginUsuario/LoginUsuario.component';
import { RegistrarUsuarioComponent } from './components/Usuario/RegistrarUsuario/RegistrarUsuario.component';
import { AuthGuardService } from './services/AuthGuard.service';

const routes: Routes = [
  // rotas de categorias
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children:[
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
        path: 'cartoes/listagemcartoes', component: ListagemCartoesComponent
      },
      {
        path: 'cartoes/novocartao', component: NovoCartaoComponent
      },
      {
        path: 'cartoes/atualizarcartao/:id', component: AtualizarCartaoComponent
      }

    ]
  },
  {
    path: 'usuarios/registrarusuario', component: RegistrarUsuarioComponent
  },
  {
    path: 'usuarios/loginusuario', component: LoginUsuarioComponent
  },
  {
     path: '', pathMatch: 'full', redirectTo: 'usuarios/loginusuario'
  },
  {
     path: '**', redirectTo: 'usuarios/loginusuario'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
