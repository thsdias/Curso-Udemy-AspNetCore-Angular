"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LojaCarrinho = void 0;
var LojaCarrinho = /** @class */ (function () {
    function LojaCarrinho() {
        this.produtos = []; // Declara e inicializa a lista.
    }
    LojaCarrinho.prototype.adicionar = function (produto) { 
        if (this.existeItensCarrinho()) {
            this.produtos = this.obterProdutos();
        }
        this.produtos.push(produto);
        sessionStorage.setItem('produtosCarrinho', JSON.stringify(this.produtos));
    };
    LojaCarrinho.prototype.obterProdutos = function () {
        var produtosCarrinho = sessionStorage.getItem('produtosCarrinho');
        if (produtosCarrinho) {
            return JSON.parse(produtosCarrinho);
        }
        return this.produtos;
    };
    LojaCarrinho.prototype.existeItensCarrinho = function () {
        return this.obterProdutos().length > 0;
    };
    LojaCarrinho.prototype.removerProduto = function (produto) {
        var produtosCarrinho = sessionStorage.getItem('produtosCarrinho');
        if (produtosCarrinho) {
            this.produtos = JSON.parse(produtosCarrinho);
            this.produtos = this.produtos.filter(function (p) { return p.id != produto.id; });
            sessionStorage.setItem('produtosCarrinho', JSON.stringify(this.produtos));
        }
    };
    LojaCarrinho.prototype.atualizarCarrinho = function (produto) {
        sessionStorage.setItem('produtosCarrinho', JSON.stringify(produto));
    };
    LojaCarrinho.prototype.limparCarrinhoCompras = function () {
        sessionStorage.setItem('produtosCarrinho', "");
    };
    return LojaCarrinho;
}());
exports.LojaCarrinho = LojaCarrinho;
