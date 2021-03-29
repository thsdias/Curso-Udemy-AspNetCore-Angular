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

            // Carga default na tabela Forma Pagamento.
            modelBuilder.Entity<FormaPagamento>().HasData(
                new FormaPagamento() { Id = 1, Nome = "Boleto", Descricao = "Forma de Pagamento do tipo Boleto." },
                new FormaPagamento() { Id = 2, Nome = "Cartão de Crédito", Descricao = "Forma de Pagamento do tipo Cartão de Crédito." },
                new FormaPagamento() { Id = 3, Nome = "Depósito", Descricao = "Forma de Pagamento do tipo Depósito." }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
