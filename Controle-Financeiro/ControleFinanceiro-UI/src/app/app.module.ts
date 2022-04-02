import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { JwtModule } from '@auth0/angular-jwt';
import { ChartsModule } from 'ng2-charts';

//angular material imports
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

// rotas
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { IconSnackBarComponent } from './components/customs/icon-snack-bar.component';
import { ListagemCategoriasComponent } from './components/Categoria/ListagemCategorias/ListagemCategorias.component';
import { NovaCategoriaComponent } from './components/Categoria/NovaCategoria/NovaCategoria.component';
import { AtualizarCategoriaComponent } from './components/Categoria/AtualizarCategoria/AtualizarCategoria.component';
import { DialogExclusaoCategoriaComponent } from './components/Categoria/ListagemCategorias/DialogExclusaoCategoria/DialogExclusaoCategoria.component';
import { ListagemFuncoesComponent } from './components/Funcao/ListagemFuncoes/ListagemFuncoes.component';
import { NovaFuncaoComponent } from './components/Funcao/NovaFuncao/NovaFuncao.component';
import { AtualizarFuncaoComponent } from './components/Funcao/AtualizarFuncao/AtualizarFuncao.component';
import { DialogExclusaoFuncaoComponent } from './components/Funcao/ListagemFuncoes/DialogExclusaoFuncao/DialogExclusaoFuncao.component';
import { RegistrarUsuarioComponent } from './components/Usuario/RegistrarUsuario/RegistrarUsuario.component';
import { LoginUsuarioComponent } from './components/Usuario/LoginUsuario/LoginUsuario.component';
import { DashboardComponent } from './components/dashboard/Dashboard/Dashboard.component';
import { HeaderComponent } from './components/dashboard/Header/Header.component';
import { NovoCartaoComponent } from './components/Cartao/NovoCartao/NovoCartao.component';
import { ListagemCartoesComponent } from './components/Cartao/ListagemCartoes/ListagemCartoes.component';
import { AtualizarCartaoComponent } from './components/Cartao/AtualizarCartao/AtualizarCartao.component';
import { DialogExclusaoCartaoComponent } from './components/Cartao/ListagemCartoes/DialogExclusaoCartao/DialogExclusaoCartao.component';
import { NovaDespesaComponent } from './components/Despesa/NovaDespesa/NovaDespesa.component';
import { ListagemDespesasComponent } from './components/Despesa/ListagemDespesas/ListagemDespesas.component';
import { AtualizarDespesaComponent } from './components/Despesa/AtualizarDespesa/AtualizarDespesa.component';
import { DialogExclusaoDespesaComponent } from './components/Despesa/ListagemDespesas/DialogExclusaoDespesa/DialogExclusaoDespesa.component';
import { ListagemGanhosComponent } from './components/Ganho/listagem-ganhos/listagem-ganhos.component';
import { NovoGanhoComponent } from './components/Ganho/novo-ganho/novo-ganho.component';
import { AtualizarGanhoComponent } from './components/Ganho/atualizar-ganho/atualizar-ganho.component';
import { DialogExclusaoGanhosComponent } from './components/Ganho/listagem-ganhos/dialog-exclusao-ganhos/dialog-exclusao-ganhos.component';
import { AtualizarUsuarioComponent } from './components/Usuario/atualizar-usuario/atualizar-usuario.component';
import { IndexComponent } from './components/dashboard/index/index.component';

export function PegarTokenUsuario(){
    return localStorage.getItem('TokenUsuarioLogado');
}

@NgModule({
  declarations: [
    AppComponent,
    ListagemCategoriasComponent,
    NovaCategoriaComponent,
    AtualizarCategoriaComponent,
    DialogExclusaoCategoriaComponent,
    ListagemFuncoesComponent,
    NovaFuncaoComponent,
    AtualizarFuncaoComponent,
    DialogExclusaoFuncaoComponent,
    RegistrarUsuarioComponent,
    LoginUsuarioComponent,
    DashboardComponent,
    HeaderComponent,
    ListagemCartoesComponent,
    NovoCartaoComponent,
    AtualizarCartaoComponent,
    DialogExclusaoCartaoComponent,
    NovaDespesaComponent,
    ListagemDespesasComponent,
    AtualizarDespesaComponent,
    DialogExclusaoDespesaComponent,
    IconSnackBarComponent,
    ListagemGanhosComponent,
    NovoGanhoComponent,
    AtualizarGanhoComponent,
    DialogExclusaoGanhosComponent,
    AtualizarUsuarioComponent,
    IndexComponent
   ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule,
    JwtModule.forRoot({
      config: {
         tokenGetter: PegarTokenUsuario,
         allowedDomains: ['localhost:5000'],
         disallowedRoutes: []
      }
    })
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
