using ApartShare.Models;
using ApartShare.Models.DTOs.UserDtos;
using ApartShare.Models.Extensions;
using ApartShare.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ApartShare.Helpers;

namespace ApartShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public UserController(ILogger<UserController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("check")]
        public IActionResult Check()
        {
            return Ok("Api is up");
        }

        [HttpPost("registration")]
        public IActionResult Registration([FromBody] UserRegistrationDTO userRegistration)
        {
            if (_unitOfWork.Users.FindByCondition(x => x.LoginName == userRegistration.LoginName).Any())
            {
                return BadRequest("Same Login name already exists");
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
                return BadRequest("Error during registration.");
            }

            return Ok(user.ToDTO());
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDTO userLogin)
        {
            //TODO add JWT generation

            var passwordHash = PasswordService.ComputeStringToSha256Hash(userLogin.Password);

            var userVerify = _unitOfWork.Users
                .FindByCondition(x => x.LoginName == userLogin.Login 
                                    && x.Password == passwordHash).SingleOrDefault();

            if (userVerify != null)
            {
                return Ok("User verified.");
            }

            return NotFound("Invalid credentials.");
        }

        [HttpGet("profile/{id}")]
        public async Task<IActionResult> GetProfile(Guid id)
        {
            //TODO compare user id with JWT user id.

            var user = await _unitOfWork.Users.GetUserWithApartment(id);

            if(user == null)
            {
                return NotFound($"User with id:{id} was not found.");
            }

            return Ok(user.ToDTO());
        }
    }
}