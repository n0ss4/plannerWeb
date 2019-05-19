using System;
using System.Collections.Generic;

namespace planning.Models
{
    public partial class Localizaciones
    {
        public Localizaciones()
        {
            Clientes = new HashSet<Clientes>();
        }

        public string CodigoPostal { get; set; }
        public string Nombre { get; set; }

        public ICollection<Clientes> Clientes { get; set; }
    }
}
