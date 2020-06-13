using System;
using DatingApp.Data;
using DatingApp.Data.SeedData;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DatingApp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IHost host = CreateHostBuilder(args).Build();
            SeedData(host);
            host.Run();
        }

        
        private static void SeedData(IHost host)
        {
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<DatingDbContext>();
                // This line of code updates all the available pending migrations. Thus creates the database, if it does not exist. 
                context.Database.Migrate(); 
                Seed.SeedUsers(context);
            }
            catch (Exception e)
            {
                ILogger logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(e, "An error occured during migrations");
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
