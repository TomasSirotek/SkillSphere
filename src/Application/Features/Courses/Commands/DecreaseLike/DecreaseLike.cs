using Microsoft.AspNetCore.Authorization;
using SkillSphere.Application.Common.Interfaces;

namespace SkillSphere.Application.Features.Courses.Commands.DecreaseLike;

[Authorize]
public record DecreaseLikeCountCommand(Guid CourseId) : IRequest;

public class DecreaseLikeCountCommandHandler : IRequestHandler<DecreaseLikeCountCommand>
{
    private readonly IApplicationDbContext _context;

    public DecreaseLikeCountCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DecreaseLikeCountCommand request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses.FindAsync(request.CourseId);

        Guard.Against.NotFound(request.CourseId, course);

        if (course.Likes > 0)
        {
            course.Likes--; 
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
