using System;
using System.Collections.Generic;

namespace planning.Models
{
    public partial class Incidencias
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public DateTime? FechaInicial { get; set; }
        public DateTime? FechaFinal { get; set; }
        public bool? Estado { get; set; }
        public int? IdTrabajador { get; set; }
        public int? IdCliente { get; set; }

        public Clientes IdClienteNavigation { get; set; }
        public Trabajadores IdTrabajadorNavigation { get; set; }
    }
}
