using ApartShare.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ApartShare.Models
{
    public class Request
    {
        public Guid Id { get; set; }
        public RequestStatus Status { get; set; }
        public string City { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime DueDate { get; set; }

        [ForeignKey("FK_Requests_Users_GuestId")]
        public Guid GuestId { get; set; }
        [ForeignKey("FK_Requests_Users_HostId")]
        public Guid HostId { get; set; }
        public User Guest { get; set; }
        public User Host { get; set; }
        public DateTime CreationDate { get; set; }
    }
}