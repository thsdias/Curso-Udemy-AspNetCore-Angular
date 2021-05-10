import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../service/produto/produto.service';
import { LojaCarrinho } from '../carrinho/loja.carrinho';

@Component({
  selector: "loja-produtos",
  templateUrl: "./loja.produtos.component.html",
  styleUrls: ["./loja.produtos.component.css"]
})
export class LojaProdutosComponent implements OnInit
{
  public produto: Produto;
  public carrinhoCompras: LojaCarrinho;

  ngOnInit(): void {
    var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
    this.carrinhoCompras = new LojaCarrinho();

    if (produtoDetalhe) {
      this.produto = JSON.parse(produtoDetalhe);
    }
  }

  constructor(private produtoService: ProdutoService, private router: Router) {

  }

  public efetivarCompra() {
    this.carrinhoCompras.adicionar(this.produto);
    this.router.navigate(['/loja-efetiva-compra']);
  }
}
