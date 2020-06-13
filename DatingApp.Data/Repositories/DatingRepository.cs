using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data.Repositories
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DatingDbContext _datingDbContext;

        public DatingRepository(DatingDbContext datingDbContext)
        {
            _datingDbContext = datingDbContext;
        }
        public void Add<T>(T entity) where T : class
        {
            _datingDbContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _datingDbContext.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            return await _datingDbContext.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _datingDbContext.Users.Include(u => u.Photos).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _datingDbContext.SaveChangesAsync() > 0;
        }
    }
}