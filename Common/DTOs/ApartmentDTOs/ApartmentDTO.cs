using Common.Enums;

namespace Common.DTOs.ApartmentDtos
{
    public class ApartmentDTO
    {
        public string City { get; set; }
        public string Address { get; set; }
        public int? BedsNumber { get; set; }
        public string ImageBase64 { get; set; }
        public double DistanceToCenter { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime DueDate { get; set; }
        public RequestStatus Status { get; set; }
        public Guid OwnerId { get; set; }
    }
}