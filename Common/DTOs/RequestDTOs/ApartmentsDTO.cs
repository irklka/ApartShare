using Common.DTOs.ApartmentDtos;

namespace Common.DTOs.RequestDtos
{
    public class ApartmentsDTO
    {
        public string? City { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? DueDate { get; set; }
        public IEnumerable<ApartmentDTO> Apartments { get; set; }
    }
}
