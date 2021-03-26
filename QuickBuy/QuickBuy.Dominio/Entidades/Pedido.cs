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

        public DateTime DataPrevisaoEntrega { get; set; }

        public int UsuarioId { get; set; }

        public virtual Usuario Usuario { get; set; }

        public int EnderecoId { get; set; }

        public virtual Endereco Endereco { get; set; }

        public int FormaPagamentoId { get; set; }

        public virtual FormaPagamento FormaPagamento { get; set; }

        public virtual ICollection<ItemPedido> ItensPedidos { get; set; }

        public override void ValidaDados()
        {
            if(!ItensPedidos.Any())
            {
                AdicionarMsgCritica("Pedido não pode ficar sem item de pedido.");
            }
        }
    }
}
