using ApartShare.Models.Enums;

namespace ApartShare.Models.DTOs.RequestDTOs
{
    public class MyRequestDTO
    {
        public Guid Id { get; set; }
        public RequestStatus Status { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public int? BedsNumber { get; set; }
        public string ImageBase64 { get; set; }
        public double DistanceToCenter { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public Guid GuestId { get; set; }
        public Guid HostId { get; set; }
    }
}
