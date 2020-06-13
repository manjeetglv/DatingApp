using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DatingApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.Data.Repositories.Authentication
{
    public class AuthRepository: IAuthRepository
    {
        private readonly DatingDbContext _datingDbContext;

        public AuthRepository(DatingDbContext datingDbContext)
        {
            _datingDbContext = datingDbContext;
        }
        public async Task<User> Register(User user, string password)
        {
            CreatePasswordHash(password, out byte[] passwordSalt,out byte[] passwordHash);
            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;
            
            await _datingDbContext.Users.AddAsync(user);
            await _datingDbContext.SaveChangesAsync();
            
            return user;
        }

        public async Task<User> Login(string username, string password)
        {
            User user = await _datingDbContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return null;
            if (!VerifyPasswordHash(password, user.PasswordSalt, user.PasswordHash))
                return null;
            return user;
        }

       

        public async Task<bool> UserExists(string username)
        {
            if (await _datingDbContext.Users.AnyAsync(u => u.Username == username))
                return true;
            return false;
        }

        public dynamic GenerateToken(User user, string tokenSecretKey)
        {
            Claim[] claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
            };
            
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSecretKey));
            
            SecurityTokenDescriptor securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512)
            };
            
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(securityTokenDescriptor);
             
             tokenHandler.WriteToken(token);
             return new
             {
                 token = tokenHandler.WriteToken(token),
                 validUpTo = token.ValidTo
             };
        }


        private void CreatePasswordHash(string password, out byte[] passwordSalt, out byte[] passwordHash )
        {
            using HMACSHA512 hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        private bool VerifyPasswordHash(string password, byte[] passwordSalt, byte[] passwordHash)
        {
            using HMACSHA512 hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt);
            byte[] computedHash= hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            
            return !(computedHash.Where((t, i) => t != passwordHash[i]).Any());
        }
    }
}