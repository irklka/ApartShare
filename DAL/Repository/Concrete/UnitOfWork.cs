using DAL.Context;
using DAL.Repository.Abstract;

namespace DAL.Repository.Concrete
{
    public class UnitOfWork : IUnitOfWork
    {
        private UserContext _context { get; set; }

        private IApartmentRepository _apartmentRepository;

        private IUserRepository _userRepository;

        private IRequestRepository _requestRepository;

        public UnitOfWork(UserContext context)
        {
            _context = context;
        }

        public IApartmentRepository Apartments
        {
            get
            {
                if (_apartmentRepository == null)
                    _apartmentRepository = new ApartmentRepository(_context);
                return _apartmentRepository;
            }
        }

        public IUserRepository Users
        {
            get
            {
                if (_userRepository == null)
                    _userRepository = new UserRepository(_context);
                return _userRepository;
            }
        }

        public IRequestRepository Requests
        {
            get
            {
                if (_requestRepository == null)
                    _requestRepository = new RequestRepository(_context);
                return _requestRepository;
            }
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}