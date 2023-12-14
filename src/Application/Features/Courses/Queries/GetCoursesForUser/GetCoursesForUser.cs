using SkillSphere.Application.Common.Exceptions;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;
using SkillSphere.Domain.Constants;
using SkillSphere.Application.Common.Security;


namespace SkillSphere.Application.Features.Courses.Queries.GetCoursesForUser;

[Authorize]
public record GetCourseByUsedIdQuery(Guid UserId) : IRequest<GetCourseVm>;
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
            Guid userId = request.UserId;
            
            var resultList = await _context.Courses
                .AsNoTracking()
                .Include(c => c.Categories)
                .Include(c => c.Chapters)
                .Where(c => c.UserCourses.Any(uc => uc.UserId == userId))
                .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
                .OrderBy(t => t.Title)
                .ToListAsync(cancellationToken);

            return new GetCourseVm
            {
                Courses = resultList
            };
        }
    }
