using System.Linq.Expressions;

namespace DAL.Repository.Abstract
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
