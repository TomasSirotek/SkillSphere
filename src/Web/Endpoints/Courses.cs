using SkillSphere.Application.Features.Courses.Commands.CreateCourse;
using SkillSphere.Application.Features.Courses.Queries;
using SkillSphere.Web.Infrastructure;

namespace SkillSphere.Web.Endpoints;


public class Courses : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateCourse)
            .MapGet(GetCourses);
    }
    
    public async Task<int> CreateCourse(ISender sender,CreateCourseCommand command)
    {
        return await sender.Send(command);
    }
    
    public async Task<GetCourseVm> GetCourses(ISender sender)
    {
        return await sender.Send(new GetCoursesQuery());
    }
}


