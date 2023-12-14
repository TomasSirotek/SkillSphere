using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Queries.GetAllCourses;



public class QueryDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? CoverImageRelativePath { get; set; }
    public bool IsPublished { get; set; }
    public float Price { get; set; }
    public int Likes { get; set; }
    public string? AuthorName { get; set; }
    public IReadOnlyCollection<CategoryDto> Categories { get; set; }
    public IReadOnlyCollection<ChapterDto> Chapters { get; set; }
    
    
    public QueryDto()
    {
        Categories = Array.Empty<CategoryDto>();
        Chapters = Array.Empty<ChapterDto>();
    }
    
   
    private class Mapping : Profile
    {
   
        public Mapping()
        {
            CreateMap<Course, QueryDto>()
                .ForMember(dto => dto.AuthorName, 
                    c => c.MapFrom(
                        c => c.UserCourses.FirstOrDefault()!.User!.UserName))
                
                .ForMember(dto => dto.Categories, 
                    c 
                        => c.MapFrom(c 
                            => c.Categories.Select(cs => cs.Category)));
            
            CreateMap<Course, GetCourseVm>();
        }
    }
}
