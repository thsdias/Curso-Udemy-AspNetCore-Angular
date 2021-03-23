using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public abstract class Entidade
    {
        List<string> _mensagemValidacao { get; set; }

        private List<string> MensagemValidacao
        { 
            get { return _mensagemValidacao ?? (_mensagemValidacao = new List<string>());  } 
        }

        public abstract void ValidaDados();

        protected bool Valido
        {
            get { return !MensagemValidacao.Any(); }
        }

        protected void AdicionarMsgCritica(string mensagem)
        {
            MensagemValidacao.Add(mensagem);
        }

        protected void LimparMensagensValidacao()
        {
            MensagemValidacao.Clear();
        }
    }
}
