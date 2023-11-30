using Microsoft.AspNetCore.Authorization;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;
using SkillSphere.Domain.Constants;

namespace SkillSphere.Application.Features.Courses.Queries.GetCoursesForUser;


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

            return new GetCourseVm
            {
                Courses = await _context.Courses
                    .AsNoTracking()
                    .Include(c => c.Categories)
                    .Include(c => c.Chapters)
                    .Where(c => c.UserCourses.Any(uc => uc.UserId == userId)) // Filter courses for the specified user
                    .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.Title)
                    .ToListAsync(cancellationToken)
            };
        }
    }
