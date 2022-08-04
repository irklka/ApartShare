using DAL.Entities;
using Common.DTOs.RequestDTOs;

namespace DAL.Repository.Abstract
{
    public interface IRequestRepository : IGenericRepository<Request>
    {
        Task<IEnumerable<MyRequestDTO>> GetAllRequestsWithApartmentDetails(Guid userId);
        Task<IEnumerable<MyGuestDTO>> GetAllGuestsWithDetails(Guid userId);
    }
}