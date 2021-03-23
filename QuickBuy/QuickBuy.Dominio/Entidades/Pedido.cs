using QuickBuy.Dominio.ObjetoValor;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public class Pedido : Entidade
    {
        public int Id { get; set; }

        public DateTime DataPedido { get; set; }

        public int UsuarioId { get; set; }

        public DateTime DataPrevisaoEntrega { get; set; }

        public Endereco Endereco { get; set; }

        public int FormaPagamentoId { get; set; }

        public FormaPagamento FormaPagamento { get; set; }

        public ICollection<ItemPedido> ItensPedidos { get; set; }

        public override void ValidaDados()
        {
            if(!ItensPedidos.Any())
            {
                AdicionarMsgCritica("Pedido não pode ficar sem item de pedido.");
            }
        }
    }
}
