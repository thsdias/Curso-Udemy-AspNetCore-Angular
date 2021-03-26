using Microsoft.EntityFrameworkCore;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoValor;
using QuickBuy.Repositorio.Repositorios.Config;

namespace QuickBuy.Repositorio.Repositorios.Contexto
{
    public class QuickBuyContext: DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Produto> Produtos{ get; set; }

        public DbSet<Pedido> Pedidos{ get; set; }

        public DbSet<ItemPedido> ItensPedido { get; set; }

        public DbSet<Endereco> Enderecos { get; set; }

        public DbSet<FormaPagamento> FormasPagamento{ get; set; }

        public QuickBuyContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Classes de mapeamento.
            modelBuilder.ApplyConfiguration(new UsuarioConfiguracao());
            modelBuilder.ApplyConfiguration(new ProdutoConfiguracao());
            modelBuilder.ApplyConfiguration(new PedidoConfiguracao());
            modelBuilder.ApplyConfiguration(new ItemPedidoConfiguracao());
            modelBuilder.ApplyConfiguration(new EnderecoConfiguracao());
            modelBuilder.ApplyConfiguration(new FormaPagamentoConfiguracao());

            base.OnModelCreating(modelBuilder);
        }
    }
}
