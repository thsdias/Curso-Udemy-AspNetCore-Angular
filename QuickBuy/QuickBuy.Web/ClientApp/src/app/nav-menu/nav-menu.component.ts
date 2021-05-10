import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LojaCarrinho } from '../loja/carrinho/loja.carrinho';
import { UsuarioService } from '../service/usuario/usuario.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit 
{
  isExpanded = false;
  public carrinhoCompras: LojaCarrinho;

  get usuario() {
    return this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.carrinhoCompras = new LojaCarrinho();
  }

  constructor(private router: Router, private usuarioService: UsuarioService) {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public usuarioLogado(): boolean { 
    return this.usuarioService.usuarioAutenticado();
  }

  public usuarioAdministrador(): boolean {
    return this.usuarioService.usuarioAdministrador();
  }

  public existeItensCarrinho(): boolean {
    return this.carrinhoCompras.existeItensCarrinho();
  }

  sair() {
    this.usuarioService.limparSessao();
    this.router.navigate(['/']); // Navega para a pagina raiz/principal.
  }
}
