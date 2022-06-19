using ApartShare.Models.DTOs.ApartmentDTOs;
using System.Text.Json.Serialization;

namespace ApartShare.Models.DTOs.UserDtos
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string LoginName { get; set; }
        public string Name { get; set; }
        public string ImageBase64 { get; set; }
        public UserApartmentDTO? MyApartment { get; set; }
    }
}
