using System;
using System.Collections.Generic;

namespace planning.Models
{
    public partial class Trabajadores
    {
        public Trabajadores()
        {
            Incidencias = new HashSet<Incidencias>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public int? Responsable { get; set; }

        public Usuarios IdNavigation { get; set; }
        public Responsables ResponsableNavigation { get; set; }
        public ICollection<Incidencias> Incidencias { get; set; }
    }
}
