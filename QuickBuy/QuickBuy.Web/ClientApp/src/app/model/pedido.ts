import { ItemPedido } from "./itemPedido";

export class Pedido
{
  id: number;
  dataPedido: Date;
  dataPrevisaoEntrega: Date;
  usuarioId: number;
  enderecoId: number;
  formaPagamentoId: number;
  valorTotal: number;
  itensPedido: ItemPedido[];

  constructor() {
    this.dataPedido = new Date();
    this.itensPedido = [];
  }
}
