using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Repositorios.Contexto;

namespace QuickBuy.Repositorio.Repositorios
{
    public class EnderecoRepositorio: BaseRepositorio<Endereco>, IEnderecoRepositorio
    {
        public EnderecoRepositorio(QuickBuyContext quickBuyContext) : base(quickBuyContext)
        {
        }
    }
}
