using Common.Enums;

namespace Common.DTOs.RequestDTOs
{
    public class MyGuestDTO
    {
        public Guid Id { get; set; }
        public RequestStatus Status { get; set; }
        public string City { get; set; }
        public string Name { get; set; }
        public string? ImageBase64 { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime DueDate { get; set; }
        public Guid GuestId { get; set; }
        public Guid HostId { get; set; }
    }
}
