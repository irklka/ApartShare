using ApartShare.Models;
using ApartShare.Models.DTOs.UserDtos;
using ApartShare.Models.Extensions;
using ApartShare.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ApartShare.Helpers;

namespace ApartShare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly JwtService _jwtService;

        public UserController(ILogger<UserController> logger, IUnitOfWork unitOfWork, JwtService jwtService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
        }

        [HttpGet("check")]
        public IActionResult Check()
        {

            return Ok("Api is up " + Request.Cookies["jwt"]);
        }

        [HttpPost("registration")]
        public IActionResult Registration([FromBody] UserRegistrationDTO userRegistration)
        {
            if (_unitOfWork.Users.FindByCondition(x => x.LoginName == userRegistration.LoginName).Any())
            {
                return BadRequest(new
                {
                    message = "Same Login name already exists"
                });
            }

            var passwordHash = PasswordService.ComputeStringToSha256Hash(userRegistration.Password);

            User user = new User
            {
                Id = Guid.NewGuid(),
                Name = userRegistration.FullName,
                Email = userRegistration.Email,
                LoginName = userRegistration.LoginName,
                ImageBase64 = userRegistration.ImageBase64,
                Password = passwordHash
            };

            try
            {
                _unitOfWork.Users.Create(user);
                _unitOfWork.Commit();
            }
            catch
            {
                return BadRequest(new
                {
                    message = "Error during registration"
                });
            }

            return Ok(user.ToDTO());
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDTO userLogin)
        {

            var passwordHash = PasswordService.ComputeStringToSha256Hash(userLogin.Password);
            
            var userVerify = _unitOfWork.Users
                .FindByCondition(x => x.LoginName == userLogin.Login
                                    && x.Password == passwordHash).SingleOrDefault();
            
            if (userVerify != null)
            {
                var jwt = _jwtService.Generate(userVerify.Id);

                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true,
                });

                return Ok(new
                {
                    message = "User verified",
                    jwt = jwt
                });
            }

            return NotFound(new
            {
                message = "Invalid credentials"
            });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                Guid userId = Guid.Parse(token.Issuer);

                var user = await _unitOfWork.Users.GetUserWithApartment(userId);

                if (user == null)
                {
                    return NotFound(new
                    {
                        message = $"User with id:{userId} was not found."
                    });
                }

                return Ok(user.ToDTO());
            }
            catch
            {
                return Ok(new
                {
                    messaage = $"{Request.Cookies["jwt"]}"
                });
                return Unauthorized();
            }

        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }
    }
}