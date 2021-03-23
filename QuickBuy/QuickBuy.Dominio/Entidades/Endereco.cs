using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public class Endereco : Entidade
    {
        public string CEP { get; set; }

        public string UF { get; set; }

        public string Cidade { get; set; }

        public string Logradouro { get; set; }

        public int Numero { get; set; }

        public string Complemento { get; set; }

        public override void ValidaDados()
        {
            if (string.IsNullOrEmpty(CEP))
            {
                AdicionarMsgCritica("Informe o CEP do endereço.");
            }

            if (string.IsNullOrEmpty(UF))
            {
                AdicionarMsgCritica("Informe o estado.");
            }

            if (string.IsNullOrEmpty(Cidade))
            {
                AdicionarMsgCritica("Informe a cidade.");
            }

            if (string.IsNullOrEmpty(Logradouro))
            {
                AdicionarMsgCritica("Informe o logradouro.");
            }

            if (string.IsNullOrEmpty(Numero.ToString()))
            {
                AdicionarMsgCritica("Digite o número do endereço.");
            }
        }
    }
}
