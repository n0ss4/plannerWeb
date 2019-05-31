using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using planning.Models;

namespace planning.Controllers
{
    [Route("api")]
    [ApiController]
    public class CrudController : ControllerBase
    {
        private planificadorContext db;

        public CrudController(planificadorContext planificadorContext)
        {
            db = planificadorContext;
        }

        // CRUD: Metodo para poder eliminar, editar, subir nuevos eventos en el calendario.

        [HttpPost("crud")]
        public ActionResult UpdateData(EditParams param)
        {
            if (param.action == "insert" || (param.action == "batch" && param.added != null))
            {
                var value = (param.action == "insert") ? param.value : param.added[0];
                DateTime startTime = Convert.ToDateTime(value.FechaInicial);
                DateTime endTime = Convert.ToDateTime(value.FechaFinal);
                Incidencias appointment = new Incidencias()
                {
                    FechaInicial = startTime.ToLocalTime(),
                    FechaFinal = endTime.ToLocalTime(),
                    Descripcion = value.Descripcion,
                    Estado = value.Estado,
                    IdTrabajador = value.IdTrabajador,
                    IdCliente = value.IdCliente
                };

                db.Incidencias.Add(appointment);
                db.SaveChanges();
            }else if (param.action == "update" || (param.action == "batch" && param.changed != null))
            {
                var value = (param.action == "update") ? param.value : param.changed[0];
                var filterData = db.Incidencias.Where(c => c.Id == Convert.ToInt32(value.Id));
                if (filterData.Count() > 0)
                {
                    DateTime startTime = Convert.ToDateTime(value.FechaInicial);
                    DateTime endTime = Convert.ToDateTime(value.FechaFinal);
                    Incidencias appointment = db.Incidencias.Single(A => A.Id == Convert.ToInt32(value.Id));
                    appointment.FechaInicial = startTime.ToLocalTime();
                    appointment.FechaFinal = endTime.ToLocalTime();
                    appointment.Descripcion = value.Descripcion;
                    appointment.Estado = value.Estado;
                    appointment.IdTrabajador = value.IdTrabajador;
                    appointment.IdCliente = value.IdCliente;
                }

                db.SaveChanges();
            }else if (param.action == "remove" || (param.action == "batch" && param.deleted != null))
            {
                if (param.action == "remove")
                {
                    int key = Convert.ToInt32(param.key);
                    Incidencias appointment = db.Incidencias.Where(c => c.Id == key).FirstOrDefault();
                    if (appointment != null) db.Incidencias.Remove(appointment);
                }
                else
                {
                    foreach (var apps in param.deleted)
                    {
                        Incidencias appointment = db.Incidencias.Where(c => c.Id == apps.Id).FirstOrDefault();
                        if (apps != null) db.Incidencias.Remove(appointment);
                    }
                }

                db.SaveChanges();
            }

            var data = db.Incidencias.ToList();
            string jsonText = JsonConvert.SerializeObject(data);
            return Content(jsonText, "application/json");
        }

        public class EditParams
        {
            public string key { get; set; }
            public string action { get; set; }
            public List<Incidencias> added { get; set; }
            public List<Incidencias> changed { get; set; }
            public List<Incidencias> deleted { get; set; }
            public Incidencias value { get; set; }
        }
    }
}