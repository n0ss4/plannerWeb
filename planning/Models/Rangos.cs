using System;
using System.Collections.Generic;

namespace planning.Models
{
    public partial class Rangos
    {
        public Rangos()
        {
            Usuarios = new HashSet<Usuarios>();
        }

        public byte Id { get; set; }
        public string Nombre { get; set; }

        public ICollection<Usuarios> Usuarios { get; set; }
    }
}
