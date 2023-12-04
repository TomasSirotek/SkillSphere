namespace SkillSphere.Application.Features.Courses.Commands.AddCourseUserWL;

public class CourseWishListCommand : IRequest
{
    public Guid CourseId { get; init; }
    public Guid UserId { get; init; }
}
