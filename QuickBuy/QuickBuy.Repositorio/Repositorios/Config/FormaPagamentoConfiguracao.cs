using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.ObjetoValor;

namespace QuickBuy.Repositorio.Repositorios.Config
{
    public class FormaPagamentoConfiguracao : IEntityTypeConfiguration<FormaPagamento>
    {
        public void Configure(EntityTypeBuilder<FormaPagamento> builder)
        {
            // Campo Id.
            builder.HasKey(f => f.Id);

            // Campo Nome.
            builder
                .Property(f => f.Nome)
                .IsRequired()
                .HasMaxLength(50);

            // Campo Descricao.
            builder
                .Property(f => f.Descricao)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
