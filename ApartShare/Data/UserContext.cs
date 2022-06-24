using ApartShare.Models;
using Microsoft.EntityFrameworkCore;

namespace ApartShare.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<Request> Requests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(x => x.Email).IsUnique();

       //     modelBuilder
       //.Entity<Request>()
       //.HasOne(e => e.Owner)
       //.WithOne(e => e.OwnedBlog)
       //.OnDelete(DeleteBehavior.ClientCascade);
        }

    }
}
