using System.ComponentModel.DataAnnotations;

namespace ApartShare.Models.DTOs.UserDtos
{
    public class UserRegistrationDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string Password { get; set; }

        [Required]
        [StringLength(25,MinimumLength =2)]
        public string LoginName { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string FullName { get; set; }
        public string? ImageBase64 { get; set; }
    }
}