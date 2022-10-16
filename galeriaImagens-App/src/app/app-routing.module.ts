import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarImagemComponent } from './Components/cadastrar-imagem/cadastrar-imagem.component';
import { CadastroComponent } from './Components/cadastro/cadastro.component';
import { EditarImagemComponent } from './Components/editar-imagem/editar-imagem.component';
import { ListasImagensComponent } from './Components/listas-imagens/listas-imagens.component';
import { LoginComponent } from './Components/login/login.component';
import { InterceptorGuard } from './Guard/interceptor.guard';

const routes: Routes = [
   { path: '', component: ListasImagensComponent, canActivate: [InterceptorGuard],},
   { path: 'imagens/cadastrar', component: CadastrarImagemComponent, canActivate: [InterceptorGuard]},
    { path: 'imagens/atualizar/:id', component: EditarImagemComponent, canActivate: [InterceptorGuard]},
   { path: 'usuario/cadastro', component: CadastroComponent},
   { path: 'usuario/login', component: LoginComponent },
   { path: '', redirectTo: '', pathMatch: 'full' },
   { path: '**', redirectTo: '', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
