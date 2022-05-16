using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Queries;

namespace WebAPI.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public LoginController()
        {
        }

        [HttpGet("")]
        public User getUser()
        {
            return Signer.user;
        }

        [HttpPost("")]
        public IActionResult login(Models.Login login)
        {
            Signer acount = new Signer();
            Console.WriteLine("Login email: " + login.Email);
            Console.WriteLine("School pasword: " + login.Password);
            Console.WriteLine("School pasword: " + login.Password);
            bool isValid = acount.isValid(login.Email, login.Password);
            Console.WriteLine("valid acount: " + isValid);
            if (isValid)
                return Created("~api/login", login);
            else return NotFound(login);
        }
    }
}