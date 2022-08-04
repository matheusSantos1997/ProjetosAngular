import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarImagemComponent } from './Components/cadastrar-imagem/cadastrar-imagem.component';
import { CadastroComponent } from './Components/cadastro/cadastro.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EditarImagemComponent } from './Components/editar-imagem/editar-imagem.component';
import { ListasImagensComponent } from './Components/listas-imagens/listas-imagens.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
   { path: 'imagens', component: ListasImagensComponent, canActivate: [AuthGuardService]},
   { path: 'imagens/cadastrar', component: CadastrarImagemComponent, canActivate: [AuthGuardService]},
   { path: 'imagens/atualizar/:id', component: EditarImagemComponent, canActivate: [AuthGuardService]},
   { path: 'usuario/cadastro', component: CadastroComponent},
   { path: 'usuario/login', component: LoginComponent },
   { path: '', redirectTo: 'usuario/login', pathMatch: 'full' },
   { path: '**', redirectTo: 'usuario/login', pathMatch: 'full' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
