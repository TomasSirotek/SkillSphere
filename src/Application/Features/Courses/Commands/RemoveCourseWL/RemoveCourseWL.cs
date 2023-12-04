using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.TodoLists.Commands.DeleteTodoList;

namespace SkillSphere.Application.Features.Courses.Commands.RemoveCourseWL;

public record RemoveCourseWLCommand(Guid CourseId,Guid UserId) : IRequest;

public class RemoveCourseWLCommandHandler : IRequestHandler<RemoveCourseWLCommand>
{
    private readonly IApplicationDbContext _context;

    public RemoveCourseWLCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(RemoveCourseWLCommand request, CancellationToken cancellationToken)
    {
        var wishlistItem = await _context.WishlistItems
            .Where(l => l.UserId == request.UserId && l.CourseId == request.CourseId)
            .SingleOrDefaultAsync(cancellationToken);
        
        Guard.Against.NotFound(request.CourseId, wishlistItem);

        _context.WishlistItems.Remove(wishlistItem);

        await _context.SaveChangesAsync(cancellationToken);
    }
}

