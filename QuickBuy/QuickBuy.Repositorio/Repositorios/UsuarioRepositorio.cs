using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Repositorios.Contexto;
using System.Linq;

namespace QuickBuy.Repositorio.Repositorios
{
    public class UsuarioRepositorio : BaseRepositorio<Usuario>, IUsuarioRepositorio
    {
        public UsuarioRepositorio(QuickBuyContext quickBuyContext) : base(quickBuyContext)
        {
        }

        public Usuario Obter(string email, string senha)
        {
            return QuickBuyContext.Usuarios.FirstOrDefault(u => u.Email.Equals(email) && u.Senha.Equals(senha));
        }
    }
}
