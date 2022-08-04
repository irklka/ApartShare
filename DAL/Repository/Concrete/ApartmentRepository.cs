using DAL.Context;
using DAL.Entities;
using DAL.Repository.Abstract;
using Common.DTOs.ApartmentDtos;
using Common.Enums;
using Common.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository.Concrete
{
    public class ApartmentRepository : GenericRepository<Apartment>, IApartmentRepository

    {
        public ApartmentRepository(UserContext context) : base(context) { }

        // should return all the apartments with booking dates (if avaialble) and status.
        public async Task<IEnumerable<ApartmentDTO>> GetAllWithStatusAndDatesAsync()
        {
            var result = new List<ApartmentDTO>();

            var apartments = await Context.Apartments.ToListAsync();

            foreach (var apartment in apartments)
            {
                var imageBase64String = Base64Converter.ToBase64BytesString(apartment.ImageBase64ByteArray);

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