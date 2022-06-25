using System.ComponentModel.DataAnnotations;

namespace ApartShare.Models.DTOs.ApartmentDtos
{
    public class ApartmentCreationDTO
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string City { get; set; }

        [Required]
        [StringLength(70, MinimumLength = 2)]
        public string Address { get; set; }

        [Required]
        [Range(0,50)]
        public int? BedsNumber { get; set; }

        [Required]
        public string ImageBase64 { get; set; }

        [Range(5,10000)]
        public double DistanceToCenter { get; set; }
    }
}
