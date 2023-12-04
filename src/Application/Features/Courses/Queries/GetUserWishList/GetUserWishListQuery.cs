using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;

namespace SkillSphere.Application.Features.Courses.Queries;

public class GetUserWishListQuery : IRequest<GetCourseVm>
{
    public Guid UserId { get; init; }
}


public class GetUserWishListQueryHandler : IRequestHandler<GetUserWishListQuery, GetCourseVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetUserWishListQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<GetCourseVm> Handle(GetUserWishListQuery request, CancellationToken cancellationToken)
    {
      
        Guid userId = request.UserId;
        
        

        return new GetCourseVm
        {
            Courses = await _context.Courses
                .AsNoTracking()
                .Include(c => c.Categories)
                .Include(c => c.Chapters)
                .Where(c => c.WishList.Any(wi => wi.UserId == userId))
                .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
                .OrderBy(t => t.Title)
                .ToListAsync(cancellationToken)
        };

    }
}


