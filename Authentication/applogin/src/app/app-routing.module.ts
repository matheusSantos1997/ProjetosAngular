import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './login/auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { PeopleComponent } from './people/people.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  { path: 'people', component: PeopleComponent, canActivate: [ AuthGuardService ] },
  { path: 'products', component: ProductsComponent, canActivate: [ AuthGuardService ] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'people', pathMatch: 'full'},
  { path: '**', redirectTo: 'people', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
