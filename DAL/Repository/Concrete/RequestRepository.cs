using Common.DTOs.RequestDTOs;
using Microsoft.EntityFrameworkCore;
using DAL.Context;
using DAL.Entities;
using DAL.Repository.Abstract;
using Common.Helpers;

namespace DAL.Repository.Concrete
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
                    DueDate = request.DueDate,
                    GuestId = request.GuestId,
                    HostId = request.HostId
                };

                var apartmentForRequest = await Context.Apartments
                                             .Where(x => x.OwnerId == request.HostId)
                                             .FirstOrDefaultAsync();

                var imageBase64String = Base64Converter.ToBase64BytesString(apartmentForRequest!.ImageBase64ByteArray);

                newRequest.Address = apartmentForRequest.Address;
                newRequest.BedsNumber = apartmentForRequest.BedsNumber;
                newRequest.DistanceToCenter = apartmentForRequest.DistanceToCenter;
                newRequest.ImageBase64 = imageBase64String;

                result.Add(newRequest);
            }
            return result;
        }

        //gets all of guests for specific user
        public async Task<IEnumerable<MyGuestDTO>> GetAllGuestsWithDetails(Guid userId)
        {
            var result = new List<MyGuestDTO>();

            var myGuestRequests = await Context.Requests
                .Where(x => x.HostId == userId).ToListAsync();

            foreach (var guestRequest in myGuestRequests)
            {

                var newGuest = new MyGuestDTO
                {
                    Id = guestRequest.Id,
                    Status = guestRequest.Status,
                    City = guestRequest.City,
                    FromDate = guestRequest.FromDate,
                    DueDate = guestRequest.DueDate,
                    GuestId = guestRequest.GuestId,
                    HostId = guestRequest.HostId
                };

                var guestForRequest = await Context.Users.FindAsync(guestRequest.GuestId);

                var imageBase64String = Base64Converter.ToBase64BytesString(guestForRequest!.ImageBase64ByteArray);

                newGuest.ImageBase64 = imageBase64String;
                newGuest.Name = guestForRequest.Name;

                result.Add(newGuest);
            }
            return result;
        }

    }
}