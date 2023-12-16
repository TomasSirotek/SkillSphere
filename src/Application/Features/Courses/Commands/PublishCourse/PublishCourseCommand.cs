using Microsoft.AspNetCore.Http;
using SkillSphere.Application.Common.Security;


namespace SkillSphere.Application.Features.Courses.Commands.PublishCourse;

[Authorize]
public class PublishCourseCommand : IRequest<IResult>
{
    public Guid? CourseId { get; set; }
    public bool IsPublished { get; set; }
}

