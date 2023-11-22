using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Queries;

public class QueryDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? CoverImageRelativePath { get; set; }
    public bool IsPublished { get; set; }
    public float Price { get; set; }
    public IReadOnlyCollection<CategoryDto> Categories { get; set; }
    public IReadOnlyCollection<ChapterDto> Chapters { get; init; }
    
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
                .ForMember(dto => dto.Categories, 
                    c 
                        => c.MapFrom(c 
                            => c.Categories.Select(cs => cs.Category)));
        }
    }
}
