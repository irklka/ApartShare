using ApartShare.Data;

namespace ApartShare.Models.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public Task<object> GetGuestsForUser(Guid id);
        
        public Task<User?> GetUserWithApartment(Guid id);
    }
}