using DAL.Repository.Abstract;
using Common.DTOs.RequestDtos;
using Common.Enums;
using ApartShare.Extensions;
using ApartShare.Helpers;
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

                var token = _jwtService.Verify(jwt!);

                Guid userId = Guid.Parse(token.Issuer);

                var guestRequestsWithDetails = await _unitOfWork.Requests.GetAllGuestsWithDetails(userId);

                return Ok(guestRequestsWithDetails);
            }
            catch
            {
                return Unauthorized(new
                {
                    message = "session is expired."
                });
            }

        }

        [HttpPost("changeRequestStatus")]
        public async Task<IActionResult> UpdateRequestsStatusAsync(Guid id, int status)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt!);
            }
            catch
            {
                return Unauthorized(new
                {
                    message = "session is expired."
                });
            }

            if (status > 2 || status < 0)
            {
                return BadRequest(new
                {
                    message = "Invalid status."
                });
            }

            var request = _unitOfWork.Requests.Get(id);

            {
            if (request == null)
                return BadRequest(new
                {
                    message = $"Request with id:{id} was not found."
                });
            }

            var checkIfAleadyApproved = await _unitOfWork.Requests
                                            .FindByConditionAsync(x => x.HostId == request.HostId
                                                            && x.Status == RequestStatus.Accepted);
            if (checkIfAleadyApproved.Any())
            {
                return BadRequest(new
                {
                    message = "Following appartment is already booked."
                });
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

                var token = _jwtService.Verify(jwt!);

                Guid userId = Guid.Parse(token.Issuer);
                var myRequestsWithDetails = await _unitOfWork.Requests

                .GetAllRequestsWithApartmentDetails(userId);

                return Ok(myRequestsWithDetails);
            }
            catch
            {
                return Unauthorized(new
                {
                    message = "session is expired."
                });
            }

        }

        [HttpPost("createRequest")]
        public IActionResult CreateRequest([FromBody] CreateRequestDTO request)
        {
            Guid guestId;

            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt!);

                guestId = Guid.Parse(token.Issuer);
            }
            catch
            {
                return Unauthorized(new
                {
                    message = "session is expired."
                });
            }

            if(request.HostId == guestId)
            {
                return BadRequest(new
                {
                    message = "Can not book your own apartment."
                });
            }

            var checkHost = _unitOfWork.Users.Get(request.HostId);
            var checkGuest = _unitOfWork.Users.Get(guestId);

            if (checkGuest == null || checkHost == null)
            {
                return BadRequest(new
                {
                    message = "Guest or Host doesn't exist."
                });
            }

            var newRequest = request.FromRequestDTO(guestId);
            newRequest.CreationDate = DateTime.Now;

            try
            {
                _unitOfWork.Requests.Create(newRequest);
                _unitOfWork.Commit();
            }
            catch
            {
                return BadRequest(new
                {
                    message = "Error during creation."
                });
            }

            return Ok(newRequest.ToRequestDTO());
        }
    }
}
