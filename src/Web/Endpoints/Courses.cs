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
            .MapGet(GetCoursesByUserId, "{id}")
            .MapGet(GetCourses);
    }
    
    public async Task<Guid> CreateCourse(ISender sender,CreateCourseCommand command)
    {
        return await sender.Send(command);
    }
    
    public async Task<GetCourseVm> GetCourses(ISender sender)
    {
        return await sender.Send(new GetCoursesQuery());
    }
    public async Task<GetCourseVm> GetCoursesByUserId(ISender sender,Guid id)
    {
        return await sender.Send(new GetCoursesQuery());
    }
}


