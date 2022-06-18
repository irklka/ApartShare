using ApartShare.Models;
using ApartShare.Models.DTOs.ApartmentDtos;
using ApartShare.Models.DTOs.RequestDtos;
using ApartShare.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApartShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApartmentController : ControllerBase
    {
        private readonly ILogger<ApartmentController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public ApartmentController(ILogger<ApartmentController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("apartmentsFiltered")]
        public async Task<IActionResult> GetApartmentsWithFilters([FromQuery] string? city, DateTime? fromDate, DateTime? dueDate)
        {
            //TODO user should be logged in, JWT should be checked.

            if (dueDate == null)
            {
                dueDate = DateTime.Now.AddDays(7);
            }

            var response = new ApartmentsDTO()
            {
                City = city,
                FromDate = fromDate,
                DueDate = dueDate,
            };

            var allRequests = await _unitOfWork.Apartments.GetAllWithStatusAndDatesAsync();

            if (city != null)
            {

                allRequests = allRequests
                    .Where(x => x.City.ToLower().Contains(city.ToLower()));

            }
            else if (fromDate != null && fromDate < dueDate)
            {
                allRequests = allRequests
                    .Where(x => (x.FromDate >= dueDate || x.DueDate <= fromDate));
            }

            response.Apartments = allRequests
                .OrderBy(x => x.DueDate);

            if (response.Apartments.Any())
            {
                return Ok(response);
            }
            return NotFound("No results for given query.");
        }

        [HttpPost("{id}")]
        public IActionResult CreateApartmentAsync(Guid id, [FromBody] ApartmentCreation apartment)
        {
            //TODO check JWT and compare id's

            Apartment newApartment = new Apartment
            {
                Id = Guid.NewGuid(),
                Address = apartment.Address,
                City = apartment.City,
                BedsNumber = apartment.BedsNumber,
                DistanceToCenter = apartment.DistanceToCenter,
                ImageBase64 = apartment.ImageBase64,
                OwnerId = id
            };

            try
            {
                var checkApartment = _unitOfWork.Apartments.FindByCondition(x => x.OwnerId == id).FirstOrDefault();
                if (checkApartment != null)
                {
                    checkApartment.Address = apartment.Address;
                    checkApartment.City = apartment.City;
                    checkApartment.BedsNumber = apartment.BedsNumber;
                    checkApartment.DistanceToCenter = apartment.DistanceToCenter;
                    checkApartment.ImageBase64 = apartment.ImageBase64;

                    _unitOfWork.Apartments.Update(checkApartment);
                }
                else
                {
                    _unitOfWork.Apartments.Create(newApartment);
                }
                _unitOfWork.Commit();
            }
            catch
            {

                return BadRequest("Error during creation.");
            }

            return Ok(newApartment);
        }
    }
}
