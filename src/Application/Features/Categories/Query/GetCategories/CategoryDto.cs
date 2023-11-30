using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Categories.Query.GetCategories;

public class CategoryDto
{
    public Guid Id { get; set; }
    
    public string? Name { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Category, CategoryDto>();
        }
    }
}
