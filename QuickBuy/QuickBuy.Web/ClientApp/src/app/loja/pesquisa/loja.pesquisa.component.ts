import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router";
import { Produto } from "../../model/produto";
import { ProdutoService } from "../../service/produto/produto.service";

@Component({
  selector: "app-loja",
  templateUrl: "./loja.pesquisa.component.html",
  styleUrls: ["./loja.pesquisa.component.css"]
})
export class LojaPesquisaComponent implements OnInit
{
  public produtos: Produto[];

  ngOnInit(): void {
  }

  constructor(private produtoService: ProdutoService, private router: Router) {
    this.produtoService.obterTodos().subscribe(
      produtos => {
        this.produtos = produtos;
      },
      err => {
        console.log(err.error);
      }
    )
  }

  public detalharProduto(produto: Produto) {
    sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto));
    this.router.navigate(['/loja-produtos']);
  }
}
