using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Repositorio.Repositorios.Config
{
    public class ProdutoConfiguracao : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            // Campo Id.
            builder.HasKey(p => p.Id);

            // Campo Nome.
            builder
                .Property(p => p.Nome)
                .IsRequired()
                .HasMaxLength(50);

            // Campo Descricao.
            builder
                .Property(p => p.Descricao)
                .IsRequired()
                .HasMaxLength(250);

            // Campo Preco.
            builder
                .Property(p => p.Preco)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            // Campo NomeArquivo.
            builder
                .Property(p => p.NomeArquivo)
                .HasMaxLength(50);
        }
    }
}
