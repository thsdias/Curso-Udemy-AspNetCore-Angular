import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Endereco } from '../../model/endereco';
import { ItemPedido } from '../../model/itemPedido';
import { Pedido } from '../../model/Pedido';
import { Produto } from '../../model/produto';
import { PedidoService } from '../../service/pedido/pedido.service';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { LojaCarrinho } from '../carrinho/loja.carrinho';

@Component({
  selector: "loja-compra",
  templateUrl: "./loja.compra.component.html",
  styleUrls: ["./loja.compra.component.css"]
})
export class LojaCompraComponent implements OnInit
{
  public carrinhoCompras: LojaCarrinho;
  public produtos: Produto[];
  public enderecos: Endereco[];
  public total: number;
  public mensagem: string;

  @ViewChild('enderecoEntrega') enderecoEntrega: ElementRef;

  get endereco(): string {
    return this.enderecoEntrega.nativeElement.value;
  }
  set endereco(logradouro: string) {
    this.enderecoEntrega.nativeElement.value = logradouro;
  }

  ngOnInit(): void { 
    this.carrinhoCompras = new LojaCarrinho();
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.enderecos = this.usuarioService.usuario.enderecos;
    this.atualizarPrecoTotal();
  }

  constructor(private usuarioService: UsuarioService, private pedidoService: PedidoService, private router: Router) {

  }

  public atualizarPreco(produto: Produto, qtd: number) {
    if (!produto.precoOriginal) {
      produto.precoOriginal = produto.preco;
    }

    if (qtd <= 0) {
      qtd = 1;
      produto.quantidade = qtd;
    }

    produto.preco = produto.precoOriginal * qtd;
    this.carrinhoCompras.atualizarCarrinho(this.produtos);
    this.atualizarPrecoTotal();
  }

  public removerProduto(produto: Produto) { 
    this.carrinhoCompras.removerProduto(produto);
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.atualizarPrecoTotal();
    this.mensagem = "";
  }

  public atualizarPrecoTotal() { 
    //this.total = this.produtos.reduce((acumulador, produto) => acumulador + produto.preco, 0);
    this.total = 0;

    for (var i = 0; i < this.produtos.length; i++) {       
      let qtd: number = this.produtos[i].quantidade == undefined ? 1 : this.produtos[i].quantidade;
      let precoProduto: number = this.produtos[i].precoOriginal == undefined ? this.produtos[i].preco : this.produtos[i].precoOriginal;
      let precoTotalProduto: number = (precoProduto * qtd);
      this.produtos[i].preco = precoTotalProduto;
      this.total += precoTotalProduto;
    }
  }

  public efetivarCompra() {
    this.mensagem = "";

    if (this.endereco == "") {
      this.mensagem = "O Endereço de Entrega deve ser informado!";
      return;
    }

    let pedido = this.criarPedido();
    this.pedidoService.efetivarCompra(pedido).subscribe(
      pedidoId => {
        sessionStorage.setItem("pedidoId", pedidoId.toString());
        this.produtos = [];
        this.endereco = "";
        this.carrinhoCompras.limparCarrinhoCompras();
        this.router.navigate(["/compra-finalizada"]);
      },
      erro => {
        console.log(erro.error);
        this.mensagem = "Erro ao Finalizar a Comprar!";
      }
    );    
  }

  public criarPedido(): Pedido { 
    let pedido = new Pedido();
    pedido.usuarioId = this.usuarioService.usuario.id;
    pedido.dataPrevisaoEntrega = new Date();
    pedido.enderecoId = Number(this.endereco);
    pedido.formaPagamentoId = 2;
    pedido.valorTotal = this.total;
    
    this.produtos = this.carrinhoCompras.obterProdutos();

    for (let produto of this.produtos) {
      let itemPedido = new ItemPedido();
      itemPedido.produtoId = produto.id;
      itemPedido.quantidade = (!produto.quantidade) ? 1 : produto.quantidade;
      itemPedido.valor = produto.preco;
      pedido.itensPedido.push(itemPedido);
    }

    return pedido;
  }
}
