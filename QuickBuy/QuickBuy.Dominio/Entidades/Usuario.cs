using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public class Usuario : Entidade
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        public string Nome { get; set; }

        public string SobreNome { get; set; }

        public ICollection<Pedido> Pedidos { get; set; }

        public override void ValidaDados()
        {
            LimparMensagensValidacao();

            if (string.IsNullOrEmpty(Email))
            {
                AdicionarMsgCritica("O email do usuário é obrigatório");
            }

            if (string.IsNullOrEmpty(Nome))
            {
                AdicionarMsgCritica("O nome é obrigatório.");
            }

            if (string.IsNullOrEmpty(SobreNome))
            {
                AdicionarMsgCritica("O sobrenome deve ser preenchido.");
            }

            if (string.IsNullOrEmpty(Senha))
            {
                AdicionarMsgCritica("A senha é obrigatória.");
            }
        }
    }
}
