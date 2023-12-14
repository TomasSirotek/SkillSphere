using System.Linq.Expressions;
using Microsoft.AspNetCore.Authorization;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Common.Mappings;
using SkillSphere.Application.Common.Models;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;
using SkillSphere.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using SkillSphere.Domain.Constants;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Queries.GetPaginatedCourses;

[Authorize]
public record GetPaginatedCoursesQuery : IRequest<PaginatedList<QueryDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;

    public string SortBy { get; init; } = "id";
    public string SortOrder { get; init; } = "asc";
}

public class GetPaginatedCoursesQueryHandler : IRequestHandler<GetPaginatedCoursesQuery, PaginatedList<QueryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUser _user;
    
    public GetPaginatedCoursesQueryHandler(IApplicationDbContext context, IMapper mapper, IUser user)
    {
        _context = context;
        _mapper = mapper;
        _user = user;
    }

    public async Task<PaginatedList<QueryDto>> Handle(GetPaginatedCoursesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Courses.AsQueryable();

        // Add filter for published courses
        query = query.Where(x => x.IsPublished);

        // Apply sorting
        if (!string.IsNullOrEmpty(request.SortBy))
        {
            var propertyExpression = ExpressionUtils.GetPropertyExpression<Course>(request.SortBy);
    
            query = request.SortOrder.ToLower() == "asc"
                ? query.OrderBy(propertyExpression)
                : query.OrderByDescending(propertyExpression);
        }

        var paginatedList = await query
            .ProjectTo<QueryDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
        
        
        foreach (var course in paginatedList.Items)
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

        return paginatedList;
    }
    
    public static class ExpressionUtils
    {
        public static Expression<Func<T, object>> GetPropertyExpression<T>(string propertyName)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyName);
            var conversion = Expression.Convert(property, typeof(object));
            var lambda = Expression.Lambda<Func<T, object>>(conversion, parameter);

            return lambda;
        }
    }
}
