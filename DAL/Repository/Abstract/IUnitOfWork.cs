namespace DAL.Repository.Abstract
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IApartmentRepository Apartments { get; }
        IRequestRepository Requests { get; }

        void Commit();
    }
}