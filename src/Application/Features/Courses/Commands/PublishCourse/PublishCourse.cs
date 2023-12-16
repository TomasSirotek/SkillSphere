using Microsoft.AspNetCore.Http;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Features.Courses.Commands.CreateCourse;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Commands.PublishCourse;

public class PublishCourseCommandHandler : IRequestHandler<PublishCourseCommand, IResult>
{
    private readonly IApplicationDbContext _context;


    public PublishCourseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<IResult> Handle(PublishCourseCommand request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses.FindAsync(request.CourseId);

        if (course == null)
        {
            return Results.NotFound();
        }
        if (string.IsNullOrWhiteSpace(course.Title) ||
            string.IsNullOrWhiteSpace(course.Description) ||
            string.IsNullOrWhiteSpace(course.CoverImageRelativePath) ||
             !course.Categories.Any() ||
            !course.Chapters.Any())
        {
            return Results.BadRequest("Course is missing required fields. Cannot publish");
        }

        course.IsPublished = request.IsPublished;
        
        await _context.SaveChangesAsync(cancellationToken);

        return Results.Ok();
    }
}

