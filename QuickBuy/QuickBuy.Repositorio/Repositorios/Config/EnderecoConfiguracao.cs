using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Repositorio.Repositorios.Config
{
    public class EnderecoConfiguracao : IEntityTypeConfiguration<Endereco>
    {
        public void Configure(EntityTypeBuilder<Endereco> builder)
        {
            // Campo Id.
            builder.HasKey(e => e.Id);

            // Campo CEP.
            builder
                .Property(e => e.CEP)
                .IsRequired()
                .HasMaxLength(12);

            // Campo Estado.
            builder
                .Property(e => e.Estado)
                .IsRequired()
                .HasMaxLength(30);

            // Campo Cidade.
            builder
                .Property(e => e.Cidade)
                .IsRequired()
                .HasMaxLength(80);

            // Campo Logradouro.
            builder
                .Property(e => e.Logradouro)
                .IsRequired()
                .HasMaxLength(100);

            // Campo Bairro.
            builder
                .Property(e => e.Bairro)
                .IsRequired()
                .HasMaxLength(50);

            // Campo Numero.
            builder
                .Property(e => e.Numero)
                .IsRequired(false)
                .HasMaxLength(5);

            // Campo Complemento.
            builder
                .Property(e => e.Complemento)
                .HasMaxLength(50);

            // Campo Apelido Endereco.
            builder
                .Property(e => e.Apelido)
                .HasMaxLength(30);
        }
    }
}
