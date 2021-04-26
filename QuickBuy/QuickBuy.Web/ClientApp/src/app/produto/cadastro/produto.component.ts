import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router";
import { Produto } from "../../model/produto";
import { ProdutoService } from "../../service/produto/produto.service";

@Component({
  selector: "produto",
  templateUrl: "./produto.component.html",
  styleUrls: ["./produto.component.css"]
})
export class ProdutoComponent implements OnInit
{
  public produto: Produto;
  public arquivoSelecionado: File;
  public titulo: string;
  public mensagem: string;
  public ativarSpinner: boolean;
  public atualizaProduto: boolean;

  constructor(private produtoServico: ProdutoService, private router: Router) {
  }

  ngOnInit(): void { 
    var produtoSession = sessionStorage.getItem('produtoSession');

    if (produtoSession) {
      this.produto = JSON.parse(produtoSession);
      this.atualizaProduto = true;
      this.titulo = "Editar Produto"
    } else {
      this.produto = new Produto();
      this.titulo= "Cadastro de Produto"
    }
  }

  public inputFile(files: FileList) { 
    this.arquivoSelecionado = files.item(0);
    this.ativarEsperar();
    this.produtoServico.enviarArquivo(this.arquivoSelecionado).subscribe(
      retorno => {
        this.mensagem = "";
        this.produto.nomeArquivo = retorno;
        console.log(retorno);
        this.desativarEsperar();
      },
      err => {
        this.mensagem = "Erro ao tentar selecionar o Arquivo!"
        console.log(err.error);
        this.desativarEsperar();
      }
    );
  }

  public cadastrar() {
    this.ativarEsperar();

    if (this.produto.nomeArquivo == undefined)
      this.produto.nomeArquivo = "sem-imagem.png";

    this.produtoServico.cadastrar(this.produto).subscribe(
      produto => {
        this.mensagem = "";
        console.log(produto);
        this.desativarEsperar();
        this.router.navigate(['/pesquisa-produto']);
      },
      err => { 
        console.log(err.error);
        this.mensagem = "Erro ao cadastrar o Produto!";
        this.desativarEsperar();
      }
    );
  }

  public alterar() {
    this.ativarEsperar();
    this.produtoServico.atualizar(this.produto).subscribe(
      produto => {
        this.mensagem = "";
        console.log(produto);
        this.desativarEsperar();
        this.router.navigate(['/pesquisa-produto']);
      },
      err => {
        console.log(err.error);
        this.mensagem = "Erro ao editar o Produto";
        this.desativarEsperar();
      }
    );
  }

  public ativarEsperar() {
    this.ativarSpinner = true;
  }

  public desativarEsperar() {
    this.ativarSpinner = false;
  }

  private tratarMsgErro(msg): string { 
    let novaMensagem = msg.split('.');

    for (let i = 0; i < novaMensagem.length; i++) {
      if (novaMensagem[i] !== "") { 
          novaMensagem[i] = "- " + novaMensagem[i] + ".\n";
      }
    }

    return novaMensagem.join("");
  }
}
