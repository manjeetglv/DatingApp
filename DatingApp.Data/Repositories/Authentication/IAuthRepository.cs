using System.Threading.Tasks;
using DatingApp.Data.Models;

namespace DatingApp.Data.Repositories.Authentication
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
        dynamic GenerateToken(User user, string tokenSecretKey);
    }
}