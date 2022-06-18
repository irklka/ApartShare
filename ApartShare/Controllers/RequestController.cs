using ApartShare.Models;
using ApartShare.Models.DTOs.RequestDtos;
using ApartShare.Models.Enums;
using ApartShare.Models.Extensions;
using ApartShare.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApartShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestController : ControllerBase
    {
        private readonly ILogger<RequestController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public RequestController(ILogger<RequestController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("myGuests")]
        public IActionResult GetMyGuestRequests(Guid id)
        {
            //TODO Check JWT for user id and compare them.

            var request = _unitOfWork.Requests
                .FindByCondition(x => x.HostId == id)
                .Select(x => x.ToRequestDTO())
                .ToList();

            return Ok(request);
        }

        [HttpPost("changeRequestStatus")]
        public IActionResult UpdateRequestsStatus(Guid id, int status)
        {
            if (status > 2 || status < 0)
            {
                return BadRequest("Invalid status");
            }

            var request = _unitOfWork.Requests.Get(id);

            if (request == null)
            {
                return NotFound($"Request with id:{id} was not found.");
            }

            var checkIfAleadyApproved = _unitOfWork.Requests
                                            .FindByCondition(x => x.HostId == request.HostId
                                                            && x.Status == RequestStatus.Accepted)
                                            .Any();
            if (checkIfAleadyApproved)
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
        public IActionResult GetMyRequests(Guid id)
        {
            //TODO Check JWT for user id and compare them.

            var request = _unitOfWork.Requests
                .FindByCondition(x => x.GuestId == id)
                .Select(x => x.ToRequestDTO())
                .ToList();

            return Ok(request);
        }

        [HttpPost("createRequest")]
        public IActionResult CreateRequest(Guid HostId, Guid GuestId, [FromBody] CreateRequestDTO request)
        {
            //TODO Check JWT for user id and compare them.

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
