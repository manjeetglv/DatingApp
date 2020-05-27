using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Data.Models;

namespace DatingApp.Data.Repositories
{
    public interface IValueRepository
    {
      Task<List<Value>> GetValues();

      Task<Value> GetValue(int valueId);
    }
}