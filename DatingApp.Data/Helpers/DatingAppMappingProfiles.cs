using System.Linq;
using AutoMapper;
using DatingApp.Data.Dtos;
using DatingApp.Data.Models;

namespace DatingApp.Data.Helpers
{
    public class DatingAppMappingProfiles: Profile
    {
        public DatingAppMappingProfiles()
        {
            CreateMap<User, UserForListsDto>()
                .ForMember(
                    userForListDto => userForListDto.PhotoUrl, 
                option => option
                    .MapFrom(user => user.Photos.FirstOrDefault(photo => photo.IsMain).Url))
                .ForMember(userForListsDto => userForListsDto.Age,
                    opt => opt.MapFrom(
                        user => user.DateOfBirth.CalculateAge()));
            
            CreateMap<User, UserForDetailsDto>().ForMember(userDetailsDto => userDetailsDto.PhotoUrl,
                option => option.MapFrom(
                    user => user.Photos.FirstOrDefault(photo => photo.IsMain).Url))
                .ForMember(userForDetailsDto => userForDetailsDto.Age,
                    opt => opt.MapFrom(
                        user => user.DateOfBirth.CalculateAge()));
            
            CreateMap<Photo, PhotosForUserDetailsDto>();

            CreateMap<UserForUpdateDto, User>();
        }
    }
}