using DAL.Entities;
using Common.DTOs.ApartmentDtos;

namespace DAL.Repository.Abstract
{
    public interface IApartmentRepository : IGenericRepository<Apartment>
    {
        Task<IEnumerable<ApartmentDTO>> GetAllWithStatusAndDatesAsync();
    }
}