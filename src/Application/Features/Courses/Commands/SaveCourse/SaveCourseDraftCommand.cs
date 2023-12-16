using SkillSphere.Application.Common.Security;

namespace SkillSphere.Application.Features.Courses.Commands.SaveCourse;

[Authorize]
public class SaveCourseDraftCommand: IRequest
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? CoverImageRelativePath { get; set; }
    public float Price { get; set; }
    
    public IList<PutCategoryDto> Categories { get; init; } = new List<PutCategoryDto>();

    public IList<PutChapterDto> Chapters { get; init; } = new List<PutChapterDto>();
}
