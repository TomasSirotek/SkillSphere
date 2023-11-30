using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Queries;

public class CategoryDto
{
    public CategoryDto()
    {
        Name = string.Empty;
    }

    public Guid Id { get; init; }
    public string Name { get; init; }
    
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<CourseCategory, CategoryDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.CategoryId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Category!.Name));
        }
    }
}