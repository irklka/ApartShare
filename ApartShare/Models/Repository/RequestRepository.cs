using ApartShare.Data;
using ApartShare.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApartShare.Models.Repository
{
    public class RequestRepository : GenericRepository<Request>, IRequestRepository
    {
        public RequestRepository(UserContext context) : base(context) { }
    }
}