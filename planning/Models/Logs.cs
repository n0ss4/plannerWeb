using System;
using System.Collections.Generic;

namespace planning.Models
{
    public partial class Logs
    {
        public int Id { get; set; }
        public DateTime? Fecha { get; set; }
        public int? ErrorNumber { get; set; }
        public int? ErrorSeverity { get; set; }
        public int? ErrorState { get; set; }
        public string ErrorProcedure { get; set; }
        public int? ErrorLine { get; set; }
        public string ErrorMessage { get; set; }
    }
}
