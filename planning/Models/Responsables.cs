using System;
using System.Collections.Generic;

namespace planning.Models
{
    public partial class Responsables
    {
        public Responsables()
        {
            Trabajadores = new HashSet<Trabajadores>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }

        public Usuarios IdNavigation { get; set; }
        public ICollection<Trabajadores> Trabajadores { get; set; }
    }
}
