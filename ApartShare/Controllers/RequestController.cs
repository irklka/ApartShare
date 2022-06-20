using ApartShare.Helpers;
using ApartShare.Models;
using ApartShare.Models.DTOs.RequestDtos;
using ApartShare.Models.Enums;
using ApartShare.Models.Extensions;
using ApartShare.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApartShare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly ILogger<RequestController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly JwtService _jwtService;

        public RequestController(ILogger<RequestController> logger, IUnitOfWork unitOfWork, JwtService jwtService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
        }

        [HttpGet("myGuests")]
        public async Task<IActionResult> GetMyGuestRequestsAsync()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                Guid userId = Guid.Parse(token.Issuer);

                var request = await _unitOfWork.Requests
                    .FindByConditionAsync(x => x.HostId == userId);

                var response = request
                    .Select(x => x.ToRequestDTO())
                    .ToList();

                return Ok(response);
            }
            catch
            {
                return Unauthorized();
            }

        }

        [HttpPost("changeRequestStatus")]
        public async Task<IActionResult> UpdateRequestsStatusAsync(Guid id, int status)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);
            }
            catch
            {
                return Unauthorized();
            }

            if (status > 2 || status < 0)
            {
                return BadRequest("Invalid status");
            }

            var request = _unitOfWork.Requests.Get(id);

            if (request == null)
            {
                return NotFound($"Request with id:{id} was not found.");
            }

            var checkIfAleadyApproved = await _unitOfWork.Requests
                                            .FindByConditionAsync(x => x.HostId == request.HostId
                                                            && x.Status == RequestStatus.Accepted);
            if (checkIfAleadyApproved.Any())
            {
                return BadRequest("Following appartment is already booked.");
            }

            var newStatusEnum = (RequestStatus)status;

            request.Status = newStatusEnum;
            _unitOfWork.Requests.Update(request);
            _unitOfWork.Commit();

            return Ok(request.ToRequestDTO());
        }

        [HttpGet("myRequests")]
        public async Task<IActionResult> GetMyRequestsAsync()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                Guid userId = Guid.Parse(token.Issuer);

                var request = await _unitOfWork.Requests
                .FindByConditionAsync(x => x.GuestId == userId);

                var response = request
                .Select(x => x.ToRequestDTO())
                .ToList();

                return Ok(response);
            }
            catch
            {
                return Unauthorized();
            }

        }

        [HttpPost("createRequest")]
        public IActionResult CreateRequest(Guid HostId, Guid GuestId, [FromBody] CreateRequestDTO request)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);
            }
            catch
            {
                return Unauthorized();
            }

            var checkHost = _unitOfWork.Users.Get(HostId);
            var checkGuest = _unitOfWork.Users.Get(GuestId);

            if (checkGuest == null || checkHost == null)
            {
                return BadRequest("Guest or Host doesn't exist.");
            }

            Request newRequest = new Request
            {
                Id = Guid.NewGuid(),
                Status = 0,
                FromDate = request.FromDate,
                DueDate = request.DueDate,
                City = request.City,
                GuestId = GuestId,
                HostId = HostId,
                CreationDate = DateTime.Now
            };

            try
            {
                _unitOfWork.Requests.Create(newRequest);
                _unitOfWork.Commit();
            }
            catch
            {
                return BadRequest("Error during creation.");
            }

            return Ok(newRequest.ToRequestDTO());
        }
    }
}
