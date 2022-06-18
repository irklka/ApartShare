using ApartShare.Data;

namespace ApartShare.Models.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IApartmentRepository Apartments { get; }
        IRequestRepository Requests { get; }

        void Commit();
    }
}