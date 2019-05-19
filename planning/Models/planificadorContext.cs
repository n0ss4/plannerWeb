using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using planificadorWeb.Models;

namespace planning.Models
{
    public partial class planificadorContext : DbContext
    {
        public planificadorContext()
        {
        }

        public planificadorContext(DbContextOptions<planificadorContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Clientes> Clientes { get; set; }
        public virtual DbSet<Incidencias> Incidencias { get; set; }
        public virtual DbSet<Localizaciones> Localizaciones { get; set; }
        public virtual DbSet<Logs> Logs { get; set; }
        public virtual DbSet<Rangos> Rangos { get; set; }
        public virtual DbSet<Responsables> Responsables { get; set; }
        public virtual DbSet<Trabajadores> Trabajadores { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }
        public virtual DbSet<WEB_usuarios> WEB_usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clientes>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CodigoPostal)
                    .IsRequired()
                    .HasColumnName("codigo_postal")
                    .HasMaxLength(5);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.CodigoPostalNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.CodigoPostal)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("clientes_a_localizacion");

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Clientes)
                    .HasForeignKey<Clientes>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Clientes__id__27F8EE98");
            });

            modelBuilder.Entity<Incidencias>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .HasColumnName("estado")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.FechaFinal)
                    .HasColumnName("fecha_final")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaInicial)
                    .HasColumnName("fecha_inicial")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdCliente).HasColumnName("id_cliente");

                entity.Property(e => e.IdTrabajador).HasColumnName("id_trabajador");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Incidencias)
                    .HasForeignKey(d => d.IdCliente)
                    .HasConstraintName("FK__Incidenci__id_cl__2DB1C7EE");

                entity.HasOne(d => d.IdTrabajadorNavigation)
                    .WithMany(p => p.Incidencias)
                    .HasForeignKey(d => d.IdTrabajador)
                    .HasConstraintName("FK__Incidenci__id_tr__2CBDA3B5");
            });

            modelBuilder.Entity<Localizaciones>(entity =>
            {
                entity.HasKey(e => e.CodigoPostal);

                entity.Property(e => e.CodigoPostal)
                    .HasColumnName("codigo_postal")
                    .HasMaxLength(5)
                    .ValueGeneratedNever();

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Logs>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ErrorLine).HasColumnName("ERROR_LINE");

                entity.Property(e => e.ErrorMessage)
                    .HasColumnName("ERROR_MESSAGE")
                    .HasMaxLength(4000);

                entity.Property(e => e.ErrorNumber).HasColumnName("ERROR_NUMBER");

                entity.Property(e => e.ErrorProcedure)
                    .HasColumnName("ERROR_PROCEDURE")
                    .HasMaxLength(128);

                entity.Property(e => e.ErrorSeverity).HasColumnName("ERROR_SEVERITY");

                entity.Property(e => e.ErrorState).HasColumnName("ERROR_STATE");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Rangos>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Responsables>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Apellidos)
                    .IsRequired()
                    .HasColumnName("apellidos")
                    .HasMaxLength(400)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Responsables)
                    .HasForeignKey<Responsables>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Responsables__id__1F63A897");
            });

            modelBuilder.Entity<Trabajadores>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Apellidos)
                    .IsRequired()
                    .HasColumnName("apellidos")
                    .HasMaxLength(400)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Responsable).HasColumnName("responsable");

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Trabajadores)
                    .HasForeignKey<Trabajadores>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Trabajadores__id__22401542");

                entity.HasOne(d => d.ResponsableNavigation)
                    .WithMany(p => p.Trabajadores)
                    .HasForeignKey(d => d.Responsable)
                    .HasConstraintName("trabajadores_a_responsables");
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Contraseña)
                    .IsRequired()
                    .HasColumnName("contraseña")
                    .HasMaxLength(128);

                entity.Property(e => e.Rango).HasColumnName("rango");

                entity.Property(e => e.Usuario)
                    .IsRequired()
                    .HasColumnName("usuario")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.RangoNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.Rango)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuarios__rango__1C873BEC");
            });
        }
    }
}
