using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Commands.AddCourseUserWL;

public record AddCourseUserWLCommand(Guid UserId, Guid CourseId) : IRequest;

public class AddCourseUserWLCommandHandler : IRequestHandler<AddCourseUserWLCommand>
{
    private readonly IApplicationDbContext _context;

    public AddCourseUserWLCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(AddCourseUserWLCommand request, CancellationToken cancellationToken)
    {
        var newWishlistItem = new WishListItem { UserId = request.UserId, CourseId = request.CourseId, };

        _context.WishlistItems.Add(newWishlistItem);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
