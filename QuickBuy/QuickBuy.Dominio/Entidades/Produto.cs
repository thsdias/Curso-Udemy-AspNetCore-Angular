using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public class Produto : Entidade
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Descricao { get; set; }

        public decimal Preco { get; set; }

        public override void ValidaDados()
        {
            if (string.IsNullOrEmpty(Nome))
            {
                AdicionarMsgCritica("O nome do produto deve ser informado.");
            }

            if (string.IsNullOrEmpty(Descricao))
            {
                AdicionarMsgCritica("A descrição do produto deve ser informada.");
            }

            if (string.IsNullOrEmpty(Preco.ToString()))
            {
                AdicionarMsgCritica("O preco do produto deve ser informado");
            }
        }
    }
}
