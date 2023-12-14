using Microsoft.AspNetCore.Authorization;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;
using SkillSphere.Domain.Constants;

namespace SkillSphere.Application.Features.Courses.Queries;


public class GetCourseVm
{
    public IReadOnlyCollection<QueryDto> Courses { get; init; } = Array.Empty<QueryDto>();
}
