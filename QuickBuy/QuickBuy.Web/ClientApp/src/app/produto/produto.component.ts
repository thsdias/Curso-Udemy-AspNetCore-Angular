import { Component } from "@angular/core"

@Component({
  selector: "produto",
  templateUrl: "./produto.component.html"
})
export class ProdutoComponent {  
  nome: string;
  liberadoParaVenda: boolean;

  public obterNome(): string {
    return "celular samsung s20";
  }
}
