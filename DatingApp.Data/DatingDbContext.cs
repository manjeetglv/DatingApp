using DatingApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data
{
    public class DatingDbContext: DbContext
    {
        public DatingDbContext(DbContextOptions<DatingDbContext> dbContextOptions): base(dbContextOptions)
        {
            
        }

        public DbSet<Value> Values { get; set; }
    }
}