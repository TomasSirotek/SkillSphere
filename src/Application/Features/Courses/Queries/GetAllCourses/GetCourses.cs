using SkillSphere.Application.Common.Interfaces;

namespace SkillSphere.Application.Features.Courses.Queries.GetAllCourses;


public record GetCoursesQuery : IRequest<GetCourseVm>;

public class GetCoursesQueryHandler : IRequestHandler<GetCoursesQuery, GetCourseVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUser _user;

    public GetCoursesQueryHandler(IApplicationDbContext context, IMapper mapper, IUser user)
    {
        _context = context;
        _mapper = mapper;
        _user = user;
    }

    public async Task<GetCourseVm> Handle(GetCoursesQuery request, CancellationToken cancellationToken)
    {
      
        var allCourses = await _context.Courses
            .Include(c => c.Chapters)
            .Where(c => c.IsPublished.Equals(true))
            .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken: cancellationToken);

        foreach (var course in allCourses)
        {
            var userOwnsCourse = await _context.OwnedCourses
                .AnyAsync(oc => oc.CourseId == course.Id && oc.UserId == _user.Id, cancellationToken);
            // Check if the user has purchased the course

            var userCreatedCourse = await _context.UsersCourses
                .AnyAsync(oc => oc.CourseId == course.Id && oc.UserId == _user.Id, cancellationToken);

            
            // If the user has purchased the course, update chapter visibility
            if (userOwnsCourse || userCreatedCourse)
            {
                foreach (var chapter in course.Chapters)
                {
                    chapter.IsFree = true;
                    chapter.VideoURL = chapter.VideoURL;
                    chapter.Description = chapter.Description;
                }
            }
            else
            {
                // If the user has not purchased the course, hide chapters
                foreach (var chapter in course.Chapters)
                {
                    if (chapter.IsFree == false)
                    {
                        chapter.VideoURL = null;
                        chapter.Description = null;
                    }
                }
            }
        }
        return new GetCourseVm() { Courses = allCourses };
        // return new GetCourseVm
        // {
        //     Courses = await _context.Courses
        //         .AsNoTracking()
        //         .Include(c => c.Categories)
        //         .Include(c => c.Chapters)
        //         .Include(c => c.UserCourses)
        //         .Where(c => c.IsPublished.Equals(true))
        //         .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
        //         .OrderBy(t => t.Title)
        //         .ToListAsync(cancellationToken)
        // };

    }

   
}
