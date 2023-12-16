using SkillSphere.Application.Common.Security;

namespace SkillSphere.Application.Features.Courses.Commands.CreateCourse;

[Authorize]
public record CreateCourseCommand : IRequest<Guid>
{
    
    public Guid UserId { get; init; }
    public string? Title { get; init; }
}