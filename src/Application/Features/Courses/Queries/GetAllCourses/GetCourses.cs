using SkillSphere.Application.Common.Interfaces;

namespace SkillSphere.Application.Features.Courses.Queries.GetAllCourses;

public record GetCoursesQuery : IRequest<GetCourseVm>;

public class GetCoursesQueryHandler : IRequestHandler<GetCoursesQuery, GetCourseVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCoursesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<GetCourseVm> Handle(GetCoursesQuery request, CancellationToken cancellationToken)
    {
      
        return new GetCourseVm
        {
            Courses = await _context.Courses
                .AsNoTracking()
                .Include(c => c.Categories)
                .Include(c => c.Chapters)
                .Where(c => c.IsPublished.Equals(true))
                .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
                .OrderBy(t => t.Title)
                .ToListAsync(cancellationToken)
        };
    }
}
