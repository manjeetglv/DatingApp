using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data.Repositories
{
    public class ValueRepository: IValueRepository
    {
        private readonly DatingDbContext _datingDbContext;

        public ValueRepository(DatingDbContext datingDbContext)
        {
            _datingDbContext = datingDbContext;
        }
        
        public  Task<List<Value>> GetValues()
        {
            return _datingDbContext.Values.ToListAsync();
        }

        public Task<Value> GetValue(int valueId)
        {
            return _datingDbContext.Values.FirstOrDefaultAsync(value => value.Id == valueId);
        }
    }
}