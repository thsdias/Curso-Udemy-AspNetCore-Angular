using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public class ItemPedido : Entidade
    {
        public int Id { get; set; }

        public int ProdutoId { get; set; }

        public int Quantidade { get; set; }

        public decimal Valor { get; set; }

        public int PedidoId { get; set; }

        public virtual Pedido Pedido { get; set; }

        public override void ValidaDados()
        {
            if(string.IsNullOrEmpty(Quantidade.ToString()))
            {
                AdicionarMsgCritica("A quantidade deve ser informada.");
            }
        }
    }
}
