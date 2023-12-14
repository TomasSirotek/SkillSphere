using Microsoft.AspNetCore.Authorization;
using SkillSphere.Domain.Constants;

namespace SkillSphere.Application.Features.Courses.Queries.GetUserCourse;

[Authorize]
public class GetUserOwnedCoursesQuery : IRequest<GetCourseVm>
{
    public Guid UserId { get; set; }
}
