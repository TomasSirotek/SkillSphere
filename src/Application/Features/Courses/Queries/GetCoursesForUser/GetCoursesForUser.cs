using SkillSphere.Application.Common.Interfaces;

namespace SkillSphere.Application.Features.Courses.Queries.GetCoursesForUser;


// public record GetCourseByUsedIdQuery : IRequest<GetCourseVm>;


public record GetCourseByUsedIdQuery : IRequest<GetCourseVm>
{
    public Guid UserId { get; init; }
}


public class GetCoursesForUser
{
    public class GetCoursesQueryHandler : IRequestHandler<GetCourseByUsedIdQuery, GetCourseVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCoursesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GetCourseVm> Handle(GetCourseByUsedIdQuery request, CancellationToken cancellationToken)
        {
            var courses = await _context.UsersCourses
                .Where(uc => uc.UserId == request.UserId)
                .Select(uc => uc.Course)
                .Include(c => c!.Categories)
                .Include(c => c!.Chapters)
                .AsQueryable()
                .AsNoTracking()
                .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
                .OrderBy(t => t.Title)
                .ToListAsync(cancellationToken);

            return new GetCourseVm
            {
                Courses = courses
            };
        }
    }
}
