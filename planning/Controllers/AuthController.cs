using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using planificadorWeb.Models;
using planificadorWeb.Services;
using planning.ViewModels;

namespace planificadorWeb.Controllers
{
    [Authorize]
    [Route("/")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;

        }

        [AllowAnonymous]
        [Produces("application/json")]
        [HttpPost("acceder")]
        public ActionResult Login([FromBody] LoginViewModel data)
        {
            var username = data.username;
            var password = data.password;

            var user = _authService.Login(username, password);

            if (user != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("w2xTvrL7syDLqwMBCuje");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Nombre),
                        new Claim(ClaimTypes.Role, user.Rango),
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokens = tokenHandler.WriteToken(token);

                return Ok(new
                {
                    token = tokens
                });
            }
            else
            {
                return BadRequest(new { message = "Usuario o contraseña incorrectos" });
            }
               
        }

    }
}