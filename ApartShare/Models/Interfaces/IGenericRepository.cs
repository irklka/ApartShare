using System.Linq.Expressions;

namespace ApartShare.Models.Interfaces
{
    public interface IGenericRepository<T>
    {
        IEnumerable<T> FindAll();

        Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> expression);

        T Get(Guid id);

        void Create(T entity);

        void Update(T entity);

        void Delete(T entity);
    }
}
