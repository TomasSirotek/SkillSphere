namespace SkillSphere.Application.Features.Courses.Queries;

public class GetCourseVm
{
    public IReadOnlyCollection<QueryDto> Courses { get; init; } = Array.Empty<QueryDto>();
}
