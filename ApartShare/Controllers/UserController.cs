using Microsoft.AspNetCore.Mvc;
using ApartShare.Helpers;
using Common.DTOs.UserDtos;
using ApartShare.Extensions;
using DAL.Repository.Abstract;
using Common.Helpers;

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
            bool auth = false;
            var jwt = Request.Cookies["jwt"];

            if (jwt != null)
            {
                try
                {
                    var token = _jwtService.Verify(jwt);
                    auth = true;
                }
                catch
                {
                    auth = false;
                    Response.Cookies.Delete("jwt");
                }
                auth = true;
            }

            return Ok(new
            {
                message = auth
            });

        }

        [HttpPost("registration")]
        public async Task<IActionResult> RegistrationAsync([FromBody] UserRegistrationDTO userRegistration)
        {
            var checkIfLoginExists = await _unitOfWork.Users.FindByConditionAsync(x => x.LoginName == userRegistration.LoginName);

            if (checkIfLoginExists.Any())
            {
                return BadRequest(new
                {
                    message = "Same Login name already exists"
                });
            }

            var user = userRegistration.FromDTO();

            try
            {
                _unitOfWork.Users.Create(user!);
                _unitOfWork.Commit();
            }
            catch
            {
                return BadRequest(new
                {
                    message = "Error during registration, try different email."
                });
            }

            return Ok(user!.ToDTO());
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginDTO userLogin)
        {
            Response.Cookies.Delete("jwt");

            var passwordHash = PasswordService.ComputeStringToSha256Hash(userLogin.Password);

            var verify = await _unitOfWork.Users
                .FindByConditionAsync(x => x.LoginName == userLogin.Login
                                    && x.Password == passwordHash);

            var userVerify = verify.SingleOrDefault();

            if (userVerify != null)
            {
                var jwt = _jwtService.Generate(userVerify.Id);

                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true
                });

                return Ok(new
                {
                    message = "User verified.",
                });
            }

            return NotFound(new
            {
                message = "Invalid credentials."
            });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt!);

                Guid userId = Guid.Parse(token.Issuer);

                var user = await _unitOfWork.Users.GetUserWithApartment(userId);

                if (user == null)
                {
                    return NotFound(new
                    {
                        message = $"User with id:{userId} was not found."
                    });
                }

                return Ok(user);
            }
            catch
            {
                return Unauthorized(new
                {
                    message = "session is expired."
                });
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