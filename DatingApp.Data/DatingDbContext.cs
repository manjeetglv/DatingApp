using DatingApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data
{
    public class DatingDbContext: DbContext
    {
        public DatingDbContext(DbContextOptions<DatingDbContext> dbContextOptions): base(dbContextOptions)
        {
            
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }
        
    }
}