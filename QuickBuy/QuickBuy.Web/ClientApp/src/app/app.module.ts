import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './usuario/login/login.component';
import { ValidaRotas } from './autorizacao/valida.rotas';
import { CadastroUsuarioComponent } from './usuario/cadastro/cadastro.usuario.component';
import { ProdutoComponent } from './produto/cadastro/produto.component';
import { PesquisaProdutoComponent } from './produto/pesquisa/pesquisa.produto.component';

import { UsuarioService } from './service/usuario/usuario.service';
import { ProdutoService } from './service/produto/produto.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProdutoComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    PesquisaProdutoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      //{ path: 'produto', component: ProdutoComponent, canActivate: [ValidaRotas] },
      { path: 'produto', component: ProdutoComponent },
      { path: 'login', component: LoginComponent },
      { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
      { path: 'pesquisa-produto', component: PesquisaProdutoComponent }
    ])
  ],
  providers: [
    UsuarioService,
    ProdutoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
