using ApartShare.Data;
using ApartShare.Models.DTOs.ApartmentDtos;

namespace ApartShare.Models.Interfaces
{
    public interface IApartmentRepository : IGenericRepository<Apartment>
    {
        Task<IEnumerable<ApartmentDTO>> GetAllWithStatusAndDatesAsync();
    }
}