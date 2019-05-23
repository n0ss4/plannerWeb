using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using planificadorWeb.Models;
using planning.Models;
using planning.ViewModels;

namespace planificadorWeb.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class ApiController : ControllerBase
    {

        private planificadorContext db;

        public ApiController(planificadorContext planificadorContext)
        {
            db = planificadorContext;
        }

        /**
         * API (Usuarios, Clientes, Trabajadores, Responsables, Localizaciones y Incidencias)
         * **/

        #region Usuarios

        /**
        * GET -> Mostrar todos los usuarios.
        * **/

        [HttpGet("usuarios")]
        public ActionResult GetAllUsers()
        {
            var res = db.Usuarios.ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
        * GET -> Mostrar un usuario.
        * **/

        [HttpGet("usuario/{id}")]
        public ActionResult GetUser(int id)
        {
            var res = db.Usuarios.Where(x => x.Id == id).ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * POST -> Añadir un nuevo usuario.
         */

        [HttpPost("usuario")]
        public void PostUser(string usuario, string contraseña, short rango)
        {
            var sql = "WEB_crear_usuario @usuario, @contraseña, @rango";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@usuario", usuario),
                new SqlParameter("@contraseña", contraseña),
                new SqlParameter("@rango", rango));
        }

        /**
         * UPDATE -> Actualizar un usuario.
         * **/

        [HttpPut("usuario")]
        public void PutUser(int id, string usuario, string contraseña, short rango)
        {
            var sql = "UPDATE Usuarios SET usuario = @usuario, contraseña = @contraseña, rango = @rango WHERE id = @id";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@usuario", usuario),
                new SqlParameter("@contraseña", contraseña),
                new SqlParameter("@rango", rango),
                new SqlParameter("@id", id));
        }


        #endregion

        #region Localizaciones

        /**
        * GET -> Mostrar todas las localizaciones.
        * **/

        [HttpGet("localizaciones")]
        public ActionResult GetAllLocations()
        {
            var res = db.Localizaciones.ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * GET -> Mostrar una localizacion.
         * **/

        [HttpGet("localizacion/{codigo}")]
        public ActionResult GetLocation(string codigo)
        {
            var res = db.Localizaciones.Where(x => x.CodigoPostal == codigo).ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        #endregion

        #region Clientes

        /**
         * GET -> Mostrar todos los clientes.
         * **/

        [HttpGet("clientes")]
        public ActionResult GetAllClients()
        {
            var res = db.Clientes.ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * GET -> Mostrar un cliente.
         * **/

        [HttpGet("cliente/{id}")]
        public ActionResult GetClient(int id)
        {
            var res = db.Clientes.Where(x => x.Id == id).ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * POST -> Añadir un nuevo cliente.
         * **/

        [HttpPost("cliente")]
        public void PostClient(int id, string nombre, string codigo)
        {
            var sql = "WEB_crear_cliente @id, @nombre, @codigo_postal";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@id", id),
                new SqlParameter("@nombre", nombre),
                new SqlParameter("@codigo_postal", codigo));
        }

        /**
         * PUT -> Actualizar un cliente.
         * **/

        [HttpPut("cliente")]
        public void PutClient(int id, string nombre, string codigo)
        {
            var sql = "UPDATE Clientes SET nombre = @nombre, codigo_postal = @codigo_postal WHERE id = @id";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@nombre", nombre),
                new SqlParameter("@codigo_postal", codigo),
                new SqlParameter("@id", id));
        }

        #endregion

        #region Responsables

        /**
         * GET -> Mostrar todos los responsables.
         * **/

        [HttpGet("responsables")]
        public ActionResult GetAllBoss()
        {
            var res = db.Responsables.ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * GET -> Mostrar todos los responsables.
         * **/

        [HttpGet("responsable/{id}")]
        public ActionResult GetBoss(int id)
        {
            var res = db.Responsables.Where(x => x.Id == id).ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * POST -> Añadir un responsable.
         * **/

        [HttpPost("responsable")]
        public void PostBoss(int id, string nombre, string apellidos)
        {
            var sql = "WEB_crear_trabajadores @id, @nombre, @apellidos";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@id", id),
                new SqlParameter("@nombre", nombre),
                new SqlParameter("@apellidos", apellidos));
        }

        /**
         * UPDATE -> Actualizar un responsable.
         * **/

        #endregion

        #region Trabajadores

        /**
         * GET -> Mostrar todos los trabajadores.
         * **/

        [HttpGet("trabajadores")]
        public ActionResult GetAllEmployees()
        {
            var res = db.Trabajadores.ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * GET -> Mostrar todos los trabajadores.
         * **/

        [HttpGet("trabajador/{id}")]
        public ActionResult GetEmployee(int id)
        {
            var res = db.Trabajadores.Where(x => x.Id == id).ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * POST -> Añadir un nuevo trabajador.
         * **/

        [HttpPost("trabajador")]
        public void PostEmployee(int id, string nombre, string apellidos, int responsable)
        {
            var sql = "WEB_crear_trabajadores @id, @nombre, @apellidos, @responsable";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@id", id),
                new SqlParameter("@nombre", nombre),
                new SqlParameter("@apellidos", apellidos),
                new SqlParameter("@responsable", responsable));
        }

        /**
         * UPDATE -> Actualizar un trabajador.
         * **/

        [HttpPut("trabajador")]
        public void PutEmployee(int id, string nombre, string apellidos, int responsable)
        {
            var sql = "UPDATE Trabajadores " +
                "SET nombre = @nombre," +
                " apellidos = @apellidos," +
                " responsable = @responsable" +
                " WHERE id = @id";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@nombre", nombre),
                new SqlParameter("@apellidos", apellidos),
                new SqlParameter("@id", id),
                new SqlParameter("@responsable", responsable));
        }


        #endregion

        #region Incidencias

        /**
         * GET -> Mostrar todas las incidencias.
         * **/

        [HttpGet("incidencias")]
        public ActionResult GetAllWarnings()
        {
            var res = db.Incidencias.ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * GET -> Mostrar una incidencia.
         * **/

        [HttpGet("incidencia/{id}")]
        public ActionResult warning(int id)
        {
            var res = db.Incidencias.Where(x => x.Id == id).ToList();
            string jsonText = JsonConvert.SerializeObject(res);
            return Content(jsonText, "application/json");
        }

        /**
         * POST -> Añadir una incidencia nueva.
         * **/

        [HttpPost("incidencia")]
        public void PostWarning([FromBody] WarningViewModel data)
        {
            var sql = "WEB_crear_incidencias @descripcion, @fecha_inicial, @fecha_final, @id_trabajador, @id_cliente";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@descripcion", data.descripcion),
                new SqlParameter("@fecha_inicial", data.inicial),
                new SqlParameter("@fecha_final", data.final),
                new SqlParameter("@id_trabajador", data.trabajador),
                new SqlParameter("@id_cliente", data.cliente));
        }

        /**
         * UPDATE -> Actualizar una incidencia.
         * **/
        
        [HttpPut("incidencia")]
        public void PutWarning(int id, string descripcion, DateTime inicial, DateTime final, int trabajador, int cliente)
        {
            var sql = "UPDATE Incidencias " +
                "SET descripcion = @descripcion, " +
                "fecha_inicial = @fecha_inicial, " +
                "fecha_final = @fecha_final," +
                "id_trabajador = @id_trabajador," +
                "id_cliente = @id_cliente " +
                "WHERE id = @id";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@descripcion", descripcion),
                new SqlParameter("@fecha_inicial", inicial),
                new SqlParameter("@fecha_final", final),
                new SqlParameter("@id_trabajador", trabajador),
                new SqlParameter("@id_cliente", cliente),
                new SqlParameter("@id", id));
        }

        #endregion

        #region MÁS COSAS

        [HttpGet("trabajador/localizacion")]
        public ActionResult getEmployeeLocation(int Id, DateTime fecha)
        {
            var res = db.WEB_localizacion_trabajador.Where(x=> (x.id_trabajador == Id) && x.inicial.Day == fecha.Day && x.final.Day == fecha.Day).ToList();
            string jsonText = JsonConvert.SerializeObject(res, new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd HH:mm:ss" });
            return Content(jsonText, "application/json");
        }

        [HttpGet("trabajadores/localizaciones")]
        public ActionResult getViewLocalizacion()
        {
            var res = db.WEB_localizacion_trabajador.ToList();
            string jsonText = JsonConvert.SerializeObject(res, new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd HH:mm:ss" });
            return Content(jsonText, "application/json");
        }

        #endregion
    }
}