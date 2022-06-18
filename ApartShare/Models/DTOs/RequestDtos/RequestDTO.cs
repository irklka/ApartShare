using ApartShare.Models.Enums;
using System.Text.Json.Serialization;

namespace ApartShare.Models.DTOs.RequestDtos
{
    public class RequestDTO
    {
        public Guid Id { get; set; }
        public RequestStatus Status { get; set; }
        public string City { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        [JsonIgnore]
        public User Guest { get; set; }
        [JsonIgnore]
        public User Host { get; set; }

        public Guid GuestId { get; set; }
        public Guid HostId { get; set; }

    }
}
