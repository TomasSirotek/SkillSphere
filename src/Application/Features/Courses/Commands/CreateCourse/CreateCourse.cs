using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Domain.Entities;
using SkillSphere.Domain.Events;

namespace SkillSphere.Application.Features.Courses.Commands.CreateCourse;

public record CreateCourseCommand : IRequest<int>
{
    public string? Title { get; init; }
}

public class CreateTodoItemCommandHandler : IRequestHandler<CreateCourseCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateTodoItemCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public Task<int> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
    {
        var entity = new Course()
        {
            Title = request.Title,
           
        };

        var test = _context.Courses.ToList();
        
        

        return Task.FromResult(1);
    }
}

