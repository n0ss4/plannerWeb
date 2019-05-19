using System;
using System.Collections.Generic;

namespace planning.Models
{
    public partial class Clientes
    {
        public Clientes()
        {
            Incidencias = new HashSet<Incidencias>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string CodigoPostal { get; set; }

        public Localizaciones CodigoPostalNavigation { get; set; }
        public Usuarios IdNavigation { get; set; }
        public ICollection<Incidencias> Incidencias { get; set; }
    }
}
