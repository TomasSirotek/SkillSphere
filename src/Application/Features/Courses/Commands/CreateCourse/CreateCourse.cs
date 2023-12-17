using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Commands.CreateCourse;


public class CreateTodoItemCommandHandler : IRequestHandler<CreateCourseCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _userService;


    public CreateTodoItemCommandHandler(IApplicationDbContext context, IIdentityService userService)
    {
        _context = context;
        _userService = userService;
    }
    
    public async Task<Guid> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
    {
        // create new course
        var entity = new Course()
        {
            Title = request.Title
        };
        
        // add and saves it 
        var newCourse = _context.Courses.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        
        // create new joining table
        var userCourse = new UserCourse
        {
            UserId = request.UserId,
            CourseId = newCourse.Entity.Id
        };

        // add it and saves it 
        _context.UsersCourses.Add(userCourse);
        await _context.SaveChangesAsync(cancellationToken);
        
        // create initial one chapter introduction
        var coursesChapter = new Chapter()
        {
            Title = "Introduction",
            Description = "Here is your description", 
            VideoURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
            Position = 0,
            IsFree = true,
            CourseId = newCourse.Entity.Id
        };

        _context.Chapters.Add(coursesChapter);
        await _context.SaveChangesAsync(cancellationToken);

        // returns the course Id 
        return newCourse.Entity.Id;
    }
}

