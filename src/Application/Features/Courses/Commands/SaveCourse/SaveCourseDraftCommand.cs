using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Commands;

public class SaveCourseDraftCommand: IRequest
{
    public string? Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? CoverImageRelativePath { get; set; }

    public bool? IsPublished { get; set; }
    public float Price { get; set; }
    
    public IList<PostCategoryDto> Categories { get; init; } = new List<PostCategoryDto>();

    public IList<PostChapterDto> Chapters { get; init; } = new List<PostChapterDto>();
}
