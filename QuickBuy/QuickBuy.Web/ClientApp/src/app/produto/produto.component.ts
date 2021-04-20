import { Component, OnInit } from "@angular/core"
import { Produto } from "../model/produto";
import { ProdutoService } from "../service/produto/produto.service";

@Component({
  selector: "produto",
  templateUrl: "./produto.component.html",
  styleUrls: ["./produto.component.css"]
})
export class ProdutoComponent implements OnInit
{
  public produto: Produto;

  constructor(private produtoServico: ProdutoService) {
  }

  ngOnInit(): void {
    this.produto = new Produto();
  }

  public cadastrar() {
    this.produtoServico
      .cadastrar(this.produto)
      .subscribe(
        produto => {
          console.log(produto);
        },
        err => {
          console.log(err.error);
        }
      );
  }
}
