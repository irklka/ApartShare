using ApartShare.Data;
using ApartShare.Models.Interfaces;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

#pragma warning disable CS8603 // Possible null reference return.

namespace ApartShare.Models.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected UserContext Context { get; set; }

        public GenericRepository(UserContext context)
        {
            this.Context = context;
        }

        public void Create(T entity)
        {
            Context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            Context.Set<T>().Remove(entity);
        }

        public IEnumerable<T> FindAll()
        {
            return Context.Set<T>();
        }

        public async Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> expression)
        {
            return await Context.Set<T>().Where(expression).ToListAsync();
        }

        public T Get(Guid id)
        {
            return Context.Set<T>().Find(id);
        }

        public void Update(T entity)
        {
            Context.Set<T>().Update(entity);
        }
    }
}
