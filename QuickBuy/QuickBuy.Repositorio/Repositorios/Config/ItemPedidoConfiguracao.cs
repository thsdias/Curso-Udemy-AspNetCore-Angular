using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;

namespace QuickBuy.Repositorio.Repositorios.Config
{
    public class ItemPedidoConfiguracao : IEntityTypeConfiguration<ItemPedido>
    {
        public void Configure(EntityTypeBuilder<ItemPedido> builder)
        {
            // Campo Id.
            builder.HasKey(i => i.Id);

            // Campo Quantidade.
            builder
                .Property(i => i.Quantidade)
                .IsRequired()
                .HasColumnType("int");

            // Campo ProdutoId.
            builder
                .Property(p => p.ProdutoId)
                .IsRequired();
        }
    }
}
