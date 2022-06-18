using ApartShare.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace ApartShare.Models.DTOs.RequestDtos
{
    public class CreateRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string City { get; set; }
        [Required]
        public DateTime FromDate { get; set; }
        [Required]
        public DateTime DueDate { get; set; }
    }
}
