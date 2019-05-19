using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using planificadorWeb.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using planning.Models;

namespace planificadorWeb.Services
{
    public interface IAuthService
    {
        WEB_usuarios Login(string username, string password);
    }

    public class AuthService : IAuthService
    {
        private planificadorContext db;

        public AuthService(planificadorContext planificadorContext)
        {
            db = planificadorContext;
        }
        public WEB_usuarios Login(string username, string password)
        {

            var id_usuario = new SqlParameter
            {
                ParameterName = "id_usuario",
                DbType = System.Data.DbType.Int32,
                Direction = System.Data.ParameterDirection.Output
            };

            var sql = "WEB_comprobar_contraseña @usuario, @contraseña, @id_usuario OUT";
            db.Database.ExecuteSqlCommand(
                sql,
                new SqlParameter("@usuario", username),
                new SqlParameter("@contraseña", password),
                id_usuario);

            var id = (int) id_usuario.Value;

            if (id != 0)
            {

                var user = db.WEB_usuarios.Where(x => x.Id == id).SingleOrDefault();

                return user;
            }

            return null;
        }
    }
}
