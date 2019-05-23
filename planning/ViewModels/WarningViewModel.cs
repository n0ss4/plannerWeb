using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace planning.ViewModels
{
    public class WarningViewModel
    {
        public string descripcion { get; set; }
        public DateTime inicial { get; set; }
        public DateTime final { get; set; }
        public int trabajador { get; set; }
        public int cliente { get; set; }
    }
}
