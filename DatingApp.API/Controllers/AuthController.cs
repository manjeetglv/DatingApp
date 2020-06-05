using System;
using System.Threading.Tasks;
using DatingApp.Data.Repositories.Authentication;
using DatingApp.Security.Dtos;
using DatingApp.Security.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            // validate request
            
            // Lowercase username for consistency
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _authRepository.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");
            
            User userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            User createdUser = await _authRepository.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }

        
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            User user = await _authRepository.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
            if (user == null)
                return Unauthorized();
            string tokenSecretKey = _configuration.GetSection("AppSettings:Token").Value;
            
            return Ok(_authRepository.GenerateToken(user, tokenSecretKey));
        }
    }
}