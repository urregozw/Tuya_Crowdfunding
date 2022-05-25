using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        // POST: api/Chat
        [HttpPost]
        public ActionResult<string> Post([FromBody] LogIn login)
        {
            string userId = authService.LogIn(login);

            if (userId == null)
            {
                return NotFound($"User not found");
            }

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(userId));
        }

    }
}
