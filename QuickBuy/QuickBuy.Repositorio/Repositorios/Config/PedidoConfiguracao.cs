using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Repositorio.Repositorios.Config
{
    public class PedidoConfiguracao : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            // Campo Id.
            builder.HasKey(p => p.Id);

            // Campo DataPedido.
            builder
                .Property(p => p.DataPedido)
                .IsRequired();

            // Campo Data PrevisaoEntrega.
            builder
                .Property(p => p.DataPrevisaoEntrega)
                .IsRequired();

            // Campo Item Pedido.
            builder
                .HasMany(p => p.ItensPedidos)
                .WithOne(i => i.Pedido);
        }
    }
}
