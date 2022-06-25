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
            var imageBase64String = Base64Converter.ToBase64BytesString(user.ImageBase64ByteArray);

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                LoginName = user.LoginName,
                Password = user.Password,
                MyApartment = user.MyApartment!.ToDTO(),
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
            var imageBase64String = Base64Converter.ToBase64BytesString(apartment.ImageBase64ByteArray);

            return new UserApartmentDTO
            {
                City = apartment.City,
                Address = apartment.Address,
                BedsNumber = apartment.BedsNumber,
                DistanceToCenter = apartment.DistanceToCenter,
                ImageBase64 = imageBase64String,
                OwnerId = apartment.OwnerId
            };
        }

        public static Apartment? FromDTO(this ApartmentCreationDTO apartmentDTO, Guid ownerId)
        {
            if (apartmentDTO == null)
            {
                return null;
            }
            var imageBase64ByteArray = Base64Converter.FromBase64StringSafe(apartmentDTO.ImageBase64);

            return new Apartment
            {
                City = apartmentDTO.City,
                Address = apartmentDTO.Address,
                BedsNumber = apartmentDTO.BedsNumber,
                DistanceToCenter = apartmentDTO.DistanceToCenter,
                ImageBase64ByteArray = imageBase64ByteArray,
                OwnerId = ownerId
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
