namespace ApartShare.Models.DTOs.ApartmentDTOs
{
    public class UserApartmentDTO
    {
        public string City { get; set; }
        public string Address { get; set; }
        public int? BedsNumber { get; set; }
        public string ImageBase64 { get; set; }
        public double DistanceToCenter { get; set; }
        public Guid OwnerId { get; set; }
    }
}
