using ApartShare.Data;
using ApartShare.Models.DTOs.RequestDTOs;

namespace ApartShare.Models.Interfaces
{
    public interface IRequestRepository : IGenericRepository<Request>
    {
        Task<IEnumerable<MyRequestDTO>> GetAllRequestsWithApartmentDetails(Guid userId);
    }
}