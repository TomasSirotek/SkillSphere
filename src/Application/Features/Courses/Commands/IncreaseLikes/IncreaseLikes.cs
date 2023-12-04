using SkillSphere.Application.Common.Interfaces;

namespace SkillSphere.Application.Features.Courses.Commands.IncreaseLikes;

public record IncreaseLikesCommand(Guid CourseId) : IRequest;

public class IncreaseLikesCommandHandler : IRequestHandler<IncreaseLikesCommand>
{
    private readonly IApplicationDbContext _context;

    public IncreaseLikesCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(IncreaseLikesCommand request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses.FindAsync(request.CourseId);

        Guard.Against.NotFound(request.CourseId, course);

        course.Likes++;
        await _context.SaveChangesAsync(cancellationToken);
    }
}

