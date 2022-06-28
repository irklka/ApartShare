using ApartShare.Helpers;
using ApartShare.Models;
using ApartShare.Models.DTOs.ApartmentDtos;
using ApartShare.Models.DTOs.RequestDtos;
using ApartShare.Models.Extensions;
using ApartShare.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

#pragma warning disable CS8604 // Possible null reference argument.


namespace ApartShare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentController : ControllerBase
    {
        private readonly ILogger<ApartmentController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly JwtService _jwtService;

        public ApartmentController(ILogger<ApartmentController> logger, IUnitOfWork unitOfWork, JwtService jwtService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
        }

        [HttpGet("apartmentsFiltered")]
        public async Task<IActionResult> GetApartmentsWithFilters([FromQuery] string? city, DateTime? fromDate, DateTime? dueDate)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);
            }
            catch
            {
                return Unauthorized(new
                {
                    message = "session is expired."
                });
            }

            //if (dueDate == null)
            //{
            //    dueDate = DateTime.Now.AddDays(1);
            //}

            //if (fromDate == null)
            //{
            //    fromDate = DateTime.Now;
            //}

            var response = new ApartmentsDTO()
            {
                City = city,
                FromDate = fromDate,
                DueDate = dueDate,
            };

            var allApartments = await _unitOfWork.Apartments.GetAllWithStatusAndDatesAsync();

            if (allApartments == null)
            {
                return Ok(new
                {
                    message = "No apartments available for this time."
                });
            }

            if (city != null)
            {
                allApartments = allApartments
                    .Where(x => x.City.ToLower().Contains(city.ToLower()));

            }

            if (fromDate != null && dueDate != null && fromDate <= dueDate)
            {
                allApartments = allApartments
                    .Where(x => (x.FromDate >= dueDate || x.DueDate <= fromDate));
            }

            response.Apartments = allApartments
                .OrderBy(x => x.DueDate);

            if (response.Apartments.Any())
            {
                return Ok(response);
            }

            return Ok(new
            {
                message = "No results for given query."
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateApartmentAsync([FromBody] ApartmentCreationDTO apartment)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                Guid userId = Guid.Parse(token.Issuer);

                var base64ToByteArray = Base64Converter.FromBase64StringSafe(apartment.ImageBase64);

                var newApartment = apartment.FromDTO(userId);

                try
                {
                    //If apartment already exists update its fields.
                    var apart = await _unitOfWork.Apartments.FindByConditionAsync(x => x.OwnerId == userId);
                    var checkApartment = apart.SingleOrDefault();

                    if (checkApartment != null)
                    {
                        checkApartment.Address = apartment.Address;
                        checkApartment.City = apartment.City;
                        checkApartment.BedsNumber = apartment.BedsNumber;
                        checkApartment.DistanceToCenter = apartment.DistanceToCenter;
                        checkApartment.ImageBase64ByteArray = base64ToByteArray;

                        _unitOfWork.Apartments.Update(checkApartment);
                    }
                    else
                    {
                        //If apartments does not exist create new one.
                        _unitOfWork.Apartments.Create(newApartment);
                    }
                    _unitOfWork.Commit();
                }
                catch
                {

                    return BadRequest(new
                    {
                        message = "Error during creation."
                    });
                }

                return Ok(apartment);
            }
            catch
            {
                return Unauthorized(new
                {
                    message = "session is expired."
                });
            }
        }
    }
}
