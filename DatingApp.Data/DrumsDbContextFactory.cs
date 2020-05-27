using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DatingApp.Data
{
    public class DatingDbContextFactory: IDesignTimeDbContextFactory<DatingDbContext>
    {
        public DatingDbContext CreateDbContext(string[] args)
        {
            // string datingAppDbConnectionString = "Data Source=datingapp.db";
            string datingAppDbConnectionString = "Server=localhost,1433; User=sa; Password=Webilize@2020; Database=datingapp; MultipleActiveResultSets=true;";
            var optionsBuilder = new DbContextOptionsBuilder<DatingDbContext>();
            optionsBuilder.UseSqlServer(datingAppDbConnectionString);

            return new DatingDbContext(optionsBuilder.Options);
        }
        
        // IConfiguration GetAppConfiguration()
        // {
        //     // var environmentName =
        //     //     Environment.GetEnvironmentVariable(
        //     //         "ASPNETCORE_ENVIRONMENT");
        //
        //     var dir = Directory.GetParent(AppContext.BaseDirectory);    
        //     do
        //         dir = dir.Parent;
        //     while (dir.Name != "bin");
        //     dir = dir.Parent;
        //     var solutionRoot = dir.FullName;
        //
        //     // To use SetBasePath you need to use a nuget package called 
        //     var builder = new ConfigurationBuilder()
        //         .SetBasePath(solutionRoot)
        //         .AddJsonFile("appsettings.json");
        //         // .AddJsonFile($"appsettings.{environmentName}.json", true)
        //         // .AddEnvironmentVariables();
        //
        //     return builder.Build();
        // }
    }
}