namespace SkillSphere.Application.Features.Courses.Commands.CreateCourse;

public record CreateCourseCommand : IRequest<Guid>
{
    
    public Guid UserId { get; init; }
    public string? Title { get; init; }
}