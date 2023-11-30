using SkillSphere.Application.Common.Models;
using SkillSphere.Application.Features.Courses.Commands;
using SkillSphere.Application.Features.Courses.Commands.CreateCourse;
using SkillSphere.Application.Features.Courses.Commands.PublishCourse;
using SkillSphere.Application.Features.Courses.Queries;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;
using SkillSphere.Application.Features.Courses.Queries.GetCoursesForUser;
using SkillSphere.Web.Infrastructure;

namespace SkillSphere.Web.Endpoints;


public class Courses : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetCoursesByUserId, "{userId}")
            .MapGet(GetCourses)
            .MapPut(PublishCourse,"{courseId}/publish")
            .MapPut(SaveCourseAsDraft, "{courseId}")
            .MapPost(CreateCourse);
    }
    
    public async Task<Guid> CreateCourse(ISender sender,CreateCourseCommand command)
    {
        return await sender.Send(command);
    }
    
    public async Task<GetCourseVm> GetCourses(ISender sender)
    {
        return await sender.Send(new GetCoursesQuery());
    }
    public async Task<GetCourseVm> GetCoursesByUserId(ISender sender,Guid userId)
    {
        return await sender.Send(new GetCourseByUsedIdQuery { UserId = userId });
    }
    public async Task<IResult> SaveCourseAsDraft(ISender sender,string courseId,SaveCourseDraftCommand command)
    {
        if (courseId != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }
    public async Task<IResult> PublishCourse(ISender sender,string courseId,PublishCourseCommand command)
    {
        if (courseId != command.CourseId.ToString()) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }
}


