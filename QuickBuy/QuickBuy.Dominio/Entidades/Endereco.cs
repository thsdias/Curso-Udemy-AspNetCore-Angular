using QuickBuy.Dominio.Enum;
using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public class Endereco : Entidade
    {
        public int Id { get; set; }

        public string CEP { get; set; }

        public string Estado { get; set; }

        public string Cidade { get; set; }

        public string Bairro { get; set; }

        public string Logradouro { get; set; }

        public string Numero { get; set; }

        public string Complemento { get; set; }

        public string Apelido { get; set; }

        public int UsuarioId { get; set; }

        public virtual Usuario Usuario { get; set; }

        public override void ValidaDados()
        {
            if (string.IsNullOrEmpty(CEP))
            {
                AdicionarMsgCritica("Informe o CEP do endereço.");
            }

            if (Estado.Equals(null))
            {
                AdicionarMsgCritica("Informe o nome do Estado.");
            }

            if (string.IsNullOrEmpty(Cidade))
            {
                AdicionarMsgCritica("Informe a cidade.");
            }

            if (string.IsNullOrEmpty(Logradouro))
            {
                AdicionarMsgCritica("Informe o logradouro.");
            }

            if (string.IsNullOrEmpty(Bairro))
            {
                AdicionarMsgCritica("Informe o Bairro.");
            }

            if (string.IsNullOrEmpty(Apelido))
            {
                AdicionarMsgCritica("Informe um Apelido para o Endereço.");
            }
        }
    }
}
