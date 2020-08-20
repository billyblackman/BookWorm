using BookWorm.Models;
using Microsoft.EntityFrameworkCore;

namespace BookWorm.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> User { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<Series> Series { get; set; }
        public DbSet<SeriesBook> SeriesBook { get; set; }

    }
}
