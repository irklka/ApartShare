using DAL.Entities;
using DAL.Context;
using Common.DTOs.UserDtos;

namespace DAL.Repository.Abstract
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<UserDTO?> GetUserWithApartment(Guid id);
    }
}