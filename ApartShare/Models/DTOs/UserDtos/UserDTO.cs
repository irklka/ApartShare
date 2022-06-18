using ApartShare.Models.DTOs.ApartmentDtos;

namespace ApartShare.Models.DTOs.UserDtos
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string LoginName { get; set; }
        public string Name { get; set; }
        public string ImageBase64 { get; set; }
        public Apartment? MyApartment { get; set; }
    }
}
