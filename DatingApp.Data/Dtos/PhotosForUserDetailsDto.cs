using System;
using DatingApp.Data.Models;

namespace DatingApp.Data.Dtos
{
    public class PhotosForUserDetailsDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
    }
}