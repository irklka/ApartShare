using ApartShare.Data;

namespace ApartShare.Models.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<object> GetGuestsForUser(Guid id);
        
        Task<User?> GetUserWithApartment(Guid id);
    }
}