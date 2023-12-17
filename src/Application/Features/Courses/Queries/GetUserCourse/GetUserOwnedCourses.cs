using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;

namespace SkillSphere.Application.Features.Courses.Queries.GetUserCourse;

public class GetUserOwnedCoursesHandler : IRequestHandler<GetUserOwnedCoursesQuery, GetCourseVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetUserOwnedCoursesHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<GetCourseVm> Handle(GetUserOwnedCoursesQuery request, CancellationToken cancellationToken)
    {
        Guid userId = request.UserId;

        return new GetCourseVm
        {
            Courses = await _context.Courses
                .AsNoTracking()
                .Include(c => c.Categories)
                .Include(c => c.Chapters)
                .Where(c => c.OwnedCourses.Any(uc => uc.UserId == userId)) 
                .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
                .OrderBy(t => t.Title)
                .ToListAsync(cancellationToken)
        };
    }
}