using Common.DTOs.UserDtos;
using DAL.Context;
using DAL.Entities;
using DAL.Extensions;
using DAL.Repository.Abstract;
using Microsoft.EntityFrameworkCore;


namespace DAL.Repository.Concrete
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(UserContext context) : base(context) { }

        public async Task<UserDTO?> GetUserWithApartment(Guid id)
        {
            var userWithApartment = await Context.Users.Include(x => x.MyApartment)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            return userWithApartment?.ToDTO();
        }
    }
}
