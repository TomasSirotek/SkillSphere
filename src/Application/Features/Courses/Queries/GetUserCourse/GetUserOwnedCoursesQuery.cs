namespace SkillSphere.Application.Features.Courses.Queries.GetUserCourse;

public class GetUserOwnedCoursesQuery : IRequest<GetCourseVm>
{
    public Guid UserId { get; set; }
}
