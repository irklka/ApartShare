using Common.DTOs.ApartmentDtos;
using Common.DTOs.ApartmentDTOs;
using Common.DTOs.RequestDtos;
using Common.DTOs.UserDtos;
using Common.Helpers;
using DAL.Entities;

namespace DAL.Extensions
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
                DueDate = request.DueDate,
                GuestId = request.GuestId,
                HostId = request.HostId
            };
        }

        public static Apartment? FromDTO(this ApartmentCreationDTO apartmentDTO, Guid ownerId)
        {
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

        public static User? FromDTO(this UserRegistrationDTO userDTO)
        {
            if (userDTO == null)
            {
                return null;
            }
            var imageBase64ByteArray = Base64Converter.FromBase64StringSafe(userDTO.ImageBase64);
            var passwordHash = PasswordService.ComputeStringToSha256Hash(userDTO.Password);

            return new User
            {
                Email = userDTO.Email,
                Name = userDTO.FullName,
                LoginName = userDTO.LoginName,
                Password = passwordHash,
                ImageBase64ByteArray = imageBase64ByteArray
            };
        }

        public static Request FromRequestDTO(this CreateRequestDTO request, Guid guestId)
        {
            return new Request
            {
                Id = Guid.NewGuid(),
                Status = 0,
                FromDate = request.FromDate,
                DueDate = request.DueDate,
                City = request.City,
                GuestId = guestId,
                HostId = request.HostId
            };
        }
    }
}
