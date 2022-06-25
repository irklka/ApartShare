using ApartShare.Data;
using ApartShare.Helpers;
using ApartShare.Models.DTOs.RequestDTOs;
using ApartShare.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApartShare.Models.Repository
{
    public class RequestRepository : GenericRepository<Request>, IRequestRepository
    {
        public RequestRepository(UserContext context) : base(context) { }

        public async Task<IEnumerable<MyRequestDTO>> GetAllRequestsWithApartmentDetails(Guid userId)
        {
            var result = new List<MyRequestDTO>();

            var myRequests = await Context.Requests
                .Where(x => x.GuestId == userId).ToListAsync();

            foreach (var request in myRequests)
            {

                var newRequest = new MyRequestDTO
                {
                    Id = request.Id,
                    Status = request.Status,
                    City = request.City,
                    FromDate = request.FromDate,
                    ToDate = request.DueDate,
                    GuestId = request.GuestId,
                    HostId = request.HostId
                };

                var apartmentForRequest = await Context.Apartments
                                             .Where(x => x.OwnerId == request.HostId)
                                             .FirstOrDefaultAsync();

                var imageBase64String = Base64Converter.ToBase64BytesString(apartmentForRequest.ImageBase64ByteArray);

                newRequest.Address = apartmentForRequest.Address;
                newRequest.BedsNumber = apartmentForRequest.BedsNumber;
                newRequest.DistanceToCenter = apartmentForRequest.DistanceToCenter;
                newRequest.ImageBase64 = imageBase64String;

                result.Add(newRequest);
            }
            return result;
        }

    }
}