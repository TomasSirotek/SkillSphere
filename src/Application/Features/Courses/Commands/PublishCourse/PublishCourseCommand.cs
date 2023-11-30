using Microsoft.AspNetCore.Http;

namespace SkillSphere.Application.Features.Courses.Commands.PublishCourse;

public class PublishCourseCommand : IRequest<IResult>
{
    public Guid? CourseId { get; set; }
    public bool IsPublished { get; set; }
}

