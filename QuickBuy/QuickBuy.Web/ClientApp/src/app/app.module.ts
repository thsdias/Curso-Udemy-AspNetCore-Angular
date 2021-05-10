import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TruncateModule } from 'ng2-truncate';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './usuario/login/login.component';
import { ValidaRotas } from './autorizacao/valida.rotas';
import { CadastroUsuarioComponent } from './usuario/cadastro/cadastro.usuario.component';
import { ProdutoComponent } from './produto/cadastro/produto.component';
import { PesquisaProdutoComponent } from './produto/pesquisa/pesquisa.produto.component';
import { LojaPesquisaComponent } from './loja/pesquisa/loja.pesquisa.component';
import { LojaProdutosComponent } from './loja/produtos/loja.produtos.component';
import { LojaCompraComponent } from './loja/compra/loja.compra.component';
import { EnderecoComponent } from './usuario/endereco/endereco.component';
import { ContaUsuarioComponent } from './usuario/conta/conta.component';
import { LojaCompraFinalizadaComponent } from './loja/compra-finalizada/loja.compra.finalizada.component';

import { UsuarioService } from './service/usuario/usuario.service';
import { ProdutoService } from './service/produto/produto.service';
import { EnderecoService } from './service/endereco/enderecoService';
import { PedidoService } from './service/pedido/pedido.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProdutoComponent,
    LoginComponent,
    EnderecoComponent,
    CadastroUsuarioComponent,
    PesquisaProdutoComponent,
    LojaPesquisaComponent,
    LojaProdutosComponent,
    LojaCompraComponent,
    ContaUsuarioComponent,
    LojaCompraFinalizadaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    TruncateModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'produto', component: ProdutoComponent, canActivate: [ValidaRotas] },
      { path: 'login', component: LoginComponent },
      { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
      { path: 'pesquisa-produto', component: PesquisaProdutoComponent, canActivate: [ValidaRotas] },
      { path: 'loja-produtos', component: LojaProdutosComponent },
      { path: 'loja-efetiva-compra', component: LojaCompraComponent, canActivate: [ValidaRotas] },
      { path: 'endereco', component: EnderecoComponent, canActivate: [ValidaRotas] },
      { path: 'conta-usuario', component: ContaUsuarioComponent, canActivate: [ValidaRotas] },
      { path: 'compra-finalizada', component: LojaCompraFinalizadaComponent },
    ])
  ],
  providers: [
    UsuarioService,
    ProdutoService,
    EnderecoService,
    PedidoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
