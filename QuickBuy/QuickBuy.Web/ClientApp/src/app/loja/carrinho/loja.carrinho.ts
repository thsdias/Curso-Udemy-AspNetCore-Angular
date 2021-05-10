import { Endereco } from '../../model/endereco';
import { Produto } from '../../model/produto';

export class LojaCarrinho
{
  public produtos: Produto[] = [];  // Declara e inicializa a lista.

  public adicionar(produto: Produto) { 
    if (this.existeItensCarrinho()) {
      this.produtos = this.obterProdutos();

      // Valida se o carrinho ja possui esse produto.
      const existe = this.produtos.find(p => p.id === produto.id);

      if (existe) { // Altera a quantidade de itens no carrinho.
        for (var i = 0; i < this.produtos.length; i++) {
          if (this.produtos[i].id == produto.id) {
            console.log(this.produtos[i].quantidade);
            let qtd: number = this.produtos[i].quantidade == undefined ? 2 : this.produtos[i].quantidade += 1;
            this.produtos[i].quantidade = qtd;
          }
        }
      } else { // Adiciona um novo produto no carrinho.
        this.produtos.push(produto);
      }
    } else { // Adiciona item no carrinho.
      this.produtos.push(produto);
    }

    sessionStorage.setItem('produtosCarrinho', JSON.stringify(this.produtos));
  }

  public obterProdutos(): Produto[] {
    var produtosCarrinho = sessionStorage.getItem('produtosCarrinho');

    if (produtosCarrinho) {
      return JSON.parse(produtosCarrinho);
    }

    return this.produtos;
  }

  public existeItensCarrinho(): boolean {
    return this.obterProdutos().length > 0;
  }

  public removerProduto(produto: Produto) {
    var produtosCarrinho = sessionStorage.getItem('produtosCarrinho');

    if (produtosCarrinho) {
      this.produtos = JSON.parse(produtosCarrinho);
      this.produtos = this.produtos.filter(p => p.id != produto.id);
      sessionStorage.setItem('produtosCarrinho', JSON.stringify(this.produtos));
    }
  }

  public atualizarCarrinho(produto: Produto[]) {
    sessionStorage.setItem('produtosCarrinho', JSON.stringify(produto));
  }

  public limparCarrinhoCompras() {
    sessionStorage.setItem('produtosCarrinho', "");
  }
}
