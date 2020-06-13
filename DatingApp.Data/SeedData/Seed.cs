using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using DatingApp.Data.Models;
using Newtonsoft.Json;

namespace DatingApp.Data.SeedData
{
    public static class Seed
    {
        public static void SeedUsers(DatingDbContext datingDbContext)
        {
            if (!datingDbContext.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("../DatingApp.Data/SeedData/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    CreatePasswordHash("password", out byte[] passwordSalt, out byte[] passwordHash);
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                }
                datingDbContext.AddRange(users);
                datingDbContext.SaveChanges();
            }
        }
        
        private static void CreatePasswordHash(string password, out byte[] passwordSalt, out byte[] passwordHash )
        {
            using HMACSHA512 hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}