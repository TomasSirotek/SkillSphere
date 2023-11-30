namespace SkillSphere.Application.Features.Categories.Query.GetCategories;

public class GetCategoryVm
{
    public IReadOnlyCollection<CategoryDto> Categories { get; init; } = Array.Empty<CategoryDto>();
}
