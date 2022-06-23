using ApartShare.Helpers;
using ApartShare.Models.DTOs.ApartmentDtos;
using ApartShare.Models.DTOs.ApartmentDTOs;
using ApartShare.Models.DTOs.RequestDtos;
using ApartShare.Models.DTOs.UserDtos;
using System.Text;

namespace ApartShare.Models.Extensions
{
    public static class ExtensionMappers
    {
        public static UserDTO ToDTO(this User user)
        {
            var imageBase64String = Base64Converter.Base64BytesToString(user.ImageBase64ByteArray);

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                LoginName = user.LoginName,
                Password = user.Password,
                MyApartment = user.MyApartment.ToDTO(),
                //ImageBase64 = user.ImageBase64
                ImageBase64 = imageBase64String,
            };
        }

        public static UserApartmentDTO? ToDTO(this Apartment apartment)
        {
            if( apartment == null)
            {
                return null;
            }
            var imageBase64String = Base64Converter.Base64BytesToString(apartment.ImageBase64ByteArray);

            return new UserApartmentDTO
            {
                City = apartment.City,
                Address = apartment.Address,
                BedsNumber = apartment.BedsNumber,
                DistanceToCenter = apartment.DistanceToCenter,
                //ImageBase64 = apartment.ImageBase64,
                ImageBase64 = imageBase64String,
                OwnerId = apartment.OwnerId
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
