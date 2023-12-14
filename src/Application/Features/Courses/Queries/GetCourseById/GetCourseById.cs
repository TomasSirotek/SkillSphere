using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Common.Security;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Queries.GetCourseById;

[Authorize]
public record GetCourseByIdQuery(Guid CourseId) : IRequest<QueryDto>;


public class GetCoursesQueryHandler : IRequestHandler<GetCourseByIdQuery, QueryDto>
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

    public async Task<QueryDto> Handle(GetCourseByIdQuery request, CancellationToken cancellationToken)
    {
       // get ccourse by id and return it
       // var test =  await  _context.Courses
       //     .AsNoTracking()
       //     .Include(c => c.Categories)
       //     .Include(c => c.Chapters)
       //     .Where(c => c.Id == request.CourseId)
       //     .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
       //     .FirstOrDefaultAsync(cancellationToken);
       //
       //  Guard.Against.Null(test, nameof(test));
       //  
       //  return test;
       

       var course = await _context.Courses
           .Include(c => c.Chapters)
           .Where(c => c.Id == request.CourseId)
           .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
           .FirstOrDefaultAsync(cancellationToken);
       
       Guard.Against.Null(course, nameof(course));
       
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
           
       return course;
       
    }
}
