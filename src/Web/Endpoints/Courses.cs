using Microsoft.AspNetCore.Authorization;
using SkillSphere.Application.Common.Models;
using SkillSphere.Application.Features.Courses.Commands;
using SkillSphere.Application.Features.Courses.Commands.AddCourseUserWL;
using SkillSphere.Application.Features.Courses.Commands.CreateCourse;
using SkillSphere.Application.Features.Courses.Commands.DecreaseLike;
using SkillSphere.Application.Features.Courses.Commands.IncreaseLikes;
using SkillSphere.Application.Features.Courses.Commands.PublishCourse;
using SkillSphere.Application.Features.Courses.Commands.RemoveCourseWL;
using SkillSphere.Application.Features.Courses.Commands.SaveCourse;
using SkillSphere.Application.Features.Courses.Queries;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;
using SkillSphere.Application.Features.Courses.Queries.GetCourseById;
using SkillSphere.Application.Features.Courses.Queries.GetCoursesForUser;
using SkillSphere.Application.Features.Courses.Queries.GetPaginatedCourses;
using SkillSphere.Application.Features.Courses.Queries.GetUserCourse;
using SkillSphere.Application.Features.Courses.Queries.GetUserWishList;
using SkillSphere.Domain.Constants;
using SkillSphere.Web.Infrastructure;

namespace SkillSphere.Web.Endpoints;


public class Courses : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetCoursesByUserId, "{userId}/created")
            .MapGet(GetCourses)
            .MapGet(GetCourseById, "{courseId}")
            .MapGet(GetCoursesForUser, "{userId}/owned")
            .MapGet(GetUserWishList, "{userId}/wishlist")
            .MapPut(PublishCourse, "{courseId}/publish")
            .MapGet(GetCoursesWithPagination, "paginated")
            .MapPut(SaveCourseAsDraft, "{courseId}")
            .MapPost(CreateCourse)
            .MapPost(AddCourseToWishList, "wishlist")
            .MapDelete(RemoveCourseFromWishList, "{userId}/wishlist/{courseId}");
    }
    
    public async Task<Guid> CreateCourse(ISender sender,CreateCourseCommand command)
    {
        return await sender.Send(command);
    }

    
    public async Task<QueryDto> GetCourseById(ISender sender,Guid courseId)
    {
        return await sender.Send(new GetCourseByIdQuery(courseId));
    }
    public async Task<GetCourseVm> GetCoursesForUser(ISender sender,Guid userId)
    {
        return await sender.Send(new GetUserOwnedCoursesQuery( userId ));
    }
    public async Task<GetCourseVm> GetUserWishList(ISender sender,Guid userId)
    {
        return await sender.Send(new GetUserWishListQuery (userId));
    }
    
    public async Task<GetCourseVm> GetCourses(ISender sender)
    {
        return await sender.Send(new GetCoursesQuery());
    }
    
    public async Task<IResult> AddCourseToWishList(ISender sender,AddCourseUserWLCommand command)
    {
        await sender.Send(command);
        await sender.Send(new IncreaseLikesCommand(command.CourseId));

        return Results.NoContent();
    }
    public async Task<GetCourseVm> GetCoursesByUserId(ISender sender,Guid userId)
    {
        return await sender.Send(new GetCourseByUsedIdQuery(userId));
    }
    public async Task<IResult> SaveCourseAsDraft(ISender sender,Guid courseId,SaveCourseDraftCommand command)
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

    public async Task<IResult> RemoveCourseFromWishList(ISender sender,Guid courseId, Guid userId)
    {
        await sender.Send(new RemoveCourseWLCommand(courseId,userId));
        await sender.Send(new DecreaseLikeCountCommand(courseId));
        return Results.NoContent();
    }
    
    public async Task<PaginatedList<QueryDto>> GetCoursesWithPagination(ISender sender, [AsParameters] GetPaginatedCoursesQuery query)
    {
        return await sender.Send(query);
    }
    
  

}


