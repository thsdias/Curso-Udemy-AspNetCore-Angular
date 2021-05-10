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

            // Campo Valor Total Compra.
            builder
                .Property(p => p.ValorTotal)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            // Campo Item Pedido.
            builder
                .HasMany(p => p.ItensPedido)
                .WithOne(i => i.Pedido);
        }
    }
}
