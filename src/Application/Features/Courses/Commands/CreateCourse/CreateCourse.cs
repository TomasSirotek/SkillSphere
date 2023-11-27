using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Domain.Entities;
using SkillSphere.Domain.Events;

namespace SkillSphere.Application.Features.Courses.Commands.CreateCourse;

public record CreateCourseCommand : IRequest<Guid>
{
    
    public Guid UserId { get; init; }
    public string? Title { get; init; }
}

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
        var entity = new Course()
        {
            Title = request.Title
        };
        
        var newCourse = _context.Courses.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        
        var userCourse = new UserCourse
        {
            UserId = request.UserId,
            CourseId = newCourse.Entity.Id
        };

        _context.UsersCourses.Add(userCourse);
        
        await _context.SaveChangesAsync(cancellationToken);
        
        return newCourse.Entity.Id;
    }
}

