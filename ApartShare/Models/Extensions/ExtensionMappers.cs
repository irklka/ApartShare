using ApartShare.Models.DTOs.ApartmentDtos;
using ApartShare.Models.DTOs.RequestDtos;
using ApartShare.Models.DTOs.UserDtos;

namespace ApartShare.Models.Extensions
{
    public static class ExtensionMappers
    {
        public static UserDTO ToDTO(this User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                LoginName = user.LoginName,
                Password = user.Password,
                MyApartment = user.MyApartment,
                ImageBase64 = user.ImageBase64
            };
        }

        public static RequestDTO? ToRequestDTO(this Request request)
        {
            if (request == null)
                return null;

            return new RequestDTO
            {
                Id = request.Id,
                Status = request.Status,
                City = request.City,
                FromDate = request.FromDate,
                ToDate = request.DueDate,
                GuestId = request.GuestId,
                HostId = request.HostId
            };
        }
    }
}
