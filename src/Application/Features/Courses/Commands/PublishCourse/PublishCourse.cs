using Microsoft.AspNetCore.Http;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Features.Courses.Commands.CreateCourse;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Commands.PublishCourse;

public class PublishCourseCommandHandler : IRequestHandler<PublishCourseCommand, IResult>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;


    public PublishCourseCommandHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<IResult> Handle(PublishCourseCommand request, CancellationToken cancellationToken)
    {
        
        var course = await _context.Courses
            .Include(c => c.Chapters)
            .Include(ca => ca.Categories)
            .Where(c => c.Id == request.CourseId)
            .FirstOrDefaultAsync(cancellationToken);
        

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

