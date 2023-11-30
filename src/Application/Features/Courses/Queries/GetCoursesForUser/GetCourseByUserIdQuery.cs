using Microsoft.AspNetCore.Authorization;
using SkillSphere.Domain.Constants;

namespace SkillSphere.Application.Features.Courses.Queries.GetCoursesForUser;


public record GetCourseByUsedIdQuery : IRequest<GetCourseVm>
{
    public Guid UserId { get; init; }
}
