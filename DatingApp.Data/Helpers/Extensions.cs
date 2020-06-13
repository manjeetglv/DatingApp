using System;

namespace DatingApp.Data.Helpers
{
    public static class Extensions
    {
        public static int CalculateAge(this DateTime fromDateTime)
        {
            var age =  DateTime.UtcNow.Year - fromDateTime.Year;
            
            return fromDateTime.AddYears(age) > DateTime.Today ? --age : age;
        }
    }
}