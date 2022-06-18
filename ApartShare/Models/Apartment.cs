using System.Text.Json.Serialization;

namespace ApartShare.Models
{
    public class Apartment
    {
        public Guid Id { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public int? BedsNumber { get; set; }
        public string ImageBase64 { get; set; }
        public double DistanceToCenter { get; set; }
        public Guid OwnerId { get; set; }
        public User Owner { get; set; }
    }
}