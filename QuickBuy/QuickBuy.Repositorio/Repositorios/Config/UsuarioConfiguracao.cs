using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Repositorio.Repositorios.Config
{
    public class UsuarioConfiguracao : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            // Builder utiliza padrao Fluent.

            // Campo Id.
            builder.HasKey(u => u.Id);

            // Campo Email.
            builder
                .Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(50);

            // Campo Nome.
            builder
                .Property(u => u.Nome)
                .IsRequired()
                .HasMaxLength(50);

            // Campo SobreNome.
            builder
                .Property(u => u.SobreNome)
                .IsRequired()
                .HasMaxLength(50);

            // Campo Senha.
            builder
                .Property(u => u.Senha)
                .IsRequired()
                .HasMaxLength(250);

            // Campo Enderecos.
            builder
                .HasMany(u => u.Enderecos)
                .WithOne(e => e.Usuario);

            // Campo Pedidos.
            builder
                .HasMany(u => u.Pedidos)
                .WithOne(p => p.Usuario);
        }
    }
}
