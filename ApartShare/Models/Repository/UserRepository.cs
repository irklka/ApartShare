using ApartShare.Data;
using ApartShare.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApartShare.Models.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(UserContext context) : base(context) { }

        public async Task<object> GetGuestsForUser(Guid id)
        {
            var guests = await Context.Requests
                .Where(x => x.HostId == id && x.Status == Enums.RequestStatus.Accepted)
                .Select(x => new { x.Guest, x.FromDate, x.DueDate })
                .ToListAsync();

            return guests;
        }

        public async Task<User?> GetUserWithApartment(Guid id)
        {
            var userWithApartment = await Context.Users.Include(x => x.MyApartment)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            return userWithApartment;
        }
    }
}
