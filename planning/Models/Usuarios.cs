using System;
using System.Collections.Generic;

namespace planning.Models
{
    public partial class Usuarios
    {
        public int Id { get; set; }
        public string Usuario { get; set; }
        public byte[] Contraseña { get; set; }
        public byte Rango { get; set; }

        public Rangos RangoNavigation { get; set; }
        public Clientes Clientes { get; set; }
        public Responsables Responsables { get; set; }
        public Trabajadores Trabajadores { get; set; }
    }
}
