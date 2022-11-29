import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { MenuComponent } from './Components/menu/menu.component';
import { ListasImagensComponent } from './Components/listas-imagens/listas-imagens.component';
import { CadastrarImagemComponent } from './Components/cadastrar-imagem/cadastrar-imagem.component';
import { EditarImagemComponent } from './Components/editar-imagem/editar-imagem.component';
import { DialogExclusaoImagemComponent } from './Components/listas-imagens/dialog-exclusao-imagem/dialog-exclusao-imagem.component';
import { LoginComponent } from './Components/login/login.component';
import { CadastroComponent } from './Components/cadastro/cadastro.component';
import { JwtModule } from '@auth0/angular-jwt';

export function PegarTokenUsuario(){
  return localStorage.getItem('TokenUsuarioLogado');
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListasImagensComponent,
    CadastrarImagemComponent,
    EditarImagemComponent,
    DialogExclusaoImagemComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false // ao salvar manterá a mascara do campo
    }),
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: PegarTokenUsuario,
          allowedDomains: ['localhost:5000'],
          disallowedRoutes: []
        }
      }
    )
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
