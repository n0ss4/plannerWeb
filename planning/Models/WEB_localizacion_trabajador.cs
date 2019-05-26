using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace planning.Models
{
    public partial class WEB_localizacion_trabajador
    {
        public int id { get; set; }
        public int id_trabajador { get; set; }
        public string trabajador { get; set; }
        public string codigo { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public DateTime inicial { get; set; }
        public DateTime final { get; set; }
    }
}
