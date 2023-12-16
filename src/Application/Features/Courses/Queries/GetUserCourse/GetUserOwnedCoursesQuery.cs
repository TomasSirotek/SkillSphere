using SkillSphere.Application.Common.Security;
using SkillSphere.Domain.Constants;

namespace SkillSphere.Application.Features.Courses.Queries.GetUserCourse;

[Authorize]
public record GetUserOwnedCoursesQuery(Guid UserId) : IRequest<GetCourseVm>;

