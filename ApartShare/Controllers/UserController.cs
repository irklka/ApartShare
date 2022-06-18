using ApartShare.Models;
using ApartShare.Models.DTOs.UserDtos;
using ApartShare.Models.Extensions;
using ApartShare.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult Registration([FromBody] UserRegistration userRegistration)
        {
            if (_unitOfWork.Users.FindByCondition(x => x.LoginName == userRegistration.LoginName).Any())
            {
                return BadRequest("Same Login name already exists");
            }

            User user = new User
            {
                Id = Guid.NewGuid(),
                Name = userRegistration.FullName,
                Email = userRegistration.Email,
                LoginName = userRegistration.LoginName,
                ImageBase64 = userRegistration.ImageBase64,
                Password = userRegistration.Password
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
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            //TODO add JWT generation

            var userVerify = _unitOfWork.Users
                .FindByCondition(x => x.LoginName == userLogin.Login 
                                    && x.Password == userLogin.Password);

            if (userVerify.Any())
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
            
            return Ok(user);
        }
    }
}