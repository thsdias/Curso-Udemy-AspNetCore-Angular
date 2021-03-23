using QuickBuy.Dominio.Enum;

namespace QuickBuy.Dominio.ObjetoValor
{
    public class FormaPagamento
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Descricao { get; set; }

        public bool PagamentoPorBoleto
        { 
            get { return Id == (int)TipoFormaPagamentoEnum.Boleto; }
        }

        public bool PagamentoPorCartaoCredito
        {
            get { return Id == (int)TipoFormaPagamentoEnum.CartaoCredito; }
        }

        public bool PagamentoPorCartaoDebito
        {
            get { return Id == (int)TipoFormaPagamentoEnum.CartaoDebito; }
        }

        public bool PagamentoPorDeposito
        {
            get { return Id == (int)TipoFormaPagamentoEnum.Deposito; }
        }

        public bool PagamentoIndefinido
        {
            get { return Id == (int)TipoFormaPagamentoEnum.NaoDefinido; }
        }
    }
}
