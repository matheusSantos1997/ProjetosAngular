import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';

const routes: Routes = [
   { path: 'eventos', redirectTo: 'eventos/listagem' },
   {
    path: 'eventos',
    component: EventosComponent,
    children: [
      { path: 'detalhe/:id', component: EventoDetalheComponent },
      { path: 'detalhe', component: EventoDetalheComponent },
      { path: 'listagem', component: EventoListaComponent }
    ]
   },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'palestrantes', component: PalestrantesComponent },
   { path: 'contatos', component: ContatosComponent },
   { path: 'perfil', component: PerfilComponent },
   { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
   { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
