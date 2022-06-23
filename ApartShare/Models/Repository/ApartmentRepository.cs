using ApartShare.Data;
using ApartShare.Helpers;
using ApartShare.Models.DTOs.ApartmentDtos;
using ApartShare.Models.Enums;
using ApartShare.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApartShare.Models.Repository
{
    public class ApartmentRepository : GenericRepository<Apartment>, IApartmentRepository
    {
        public ApartmentRepository(UserContext context) : base(context) { }

        public async Task<IEnumerable<ApartmentDTO>> GetAllWithStatusAndDatesAsync()
        {
            var result = new List<ApartmentDTO>();

            var apartments = await Context.Apartments.ToListAsync();

            foreach (var apartment in apartments)
            {
                var imageBase64String = Base64Converter.Base64BytesToString(apartment.ImageBase64ByteArray);

                var newApartment = new ApartmentDTO
                {
                    Address = apartment.Address,
                    City = apartment.City,
                    DistanceToCenter = apartment.DistanceToCenter,
                    BedsNumber = apartment.BedsNumber,
                    OwnerId = apartment.OwnerId,
                    ImageBase64 = imageBase64String,
                    FromDate = default,
                    DueDate = default,
                    Status = default
                };

                var requestsForApartment = await Context.Requests
                                                .Where(x => x.HostId == newApartment.OwnerId)
                                                .ToListAsync();

                var checkIfAnyAccepted = requestsForApartment
                                            .Where(x => x.Status == RequestStatus.Accepted)
                                            .OrderBy(x => x.CreationDate)
                                            .FirstOrDefault();

                if (checkIfAnyAccepted != default)
                {
                    newApartment.Status = RequestStatus.Accepted;
                    newApartment.FromDate = checkIfAnyAccepted.FromDate;
                    newApartment.DueDate = checkIfAnyAccepted.DueDate;
                }

                result.Add(newApartment);

            }
            return result;
        }
    }
}