using System.ComponentModel.DataAnnotations;

namespace ApartShare.Models.DTOs.UserDtos
{
    public class UserLoginDTO
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
