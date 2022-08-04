using Common.Enums;
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.RequestDtos
{
    public class CreateRequestDTO
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string City { get; set; }

        [Required]
        public DateTime FromDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public Guid HostId { get; set; }
    }
}
