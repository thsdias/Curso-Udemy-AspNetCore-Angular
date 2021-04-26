import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router";
import { Produto } from "../../model/produto"
import { ProdutoService } from "../../service/produto/produto.service";

@Component({
  selector: "pesquisa-produto",
  templateUrl: "./pesquisa.produto.component.html",
  styleUrls: ["./pesquisa.produto.component.css"]
})
export class PesquisaProdutoComponent implements OnInit
{
  public produtos: Produto[];
  public mensagem: string;

  ngOnInit(): void { 
  }

  constructor(private produtoService: ProdutoService, private router: Router) {
    this.produtoService.obterTodos().subscribe(
      produtosRetorno => {
        this.mensagem = "";
        this.produtos = produtosRetorno;
      },
      err => {
        this.mensagem = "Erro ao obter os Produtos cadastrados!";
        console.log(err.error);
      }
    );
  }

  public adicionarProduto() {
    sessionStorage.setItem('produtoSession', "");
    this.router.navigate(['/produto']);
  }

  public editarProduto(produto: Produto) {
    sessionStorage.setItem('produtoSession', JSON.stringify(produto));
    this.router.navigate(['/produto']);
  }

  public deletarProduto(produto: Produto) {
    var retorno = confirm("Deseja realmente deleter o produto selecionado?");

    if (retorno == true) { 
      this.produtoService.deletar(produto).subscribe(
        produtos => {
          this.mensagem = "";
          this.produtos = produtos;
        },
        err => {
          this.mensagem = "Erro ao deletar o produto!";
          console.log(err.error);
        }
      );
    } else {
      return false;
    }
  }
}
