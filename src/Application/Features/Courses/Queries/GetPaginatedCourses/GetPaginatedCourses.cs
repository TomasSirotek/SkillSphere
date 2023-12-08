using System.Linq.Expressions;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Common.Mappings;
using SkillSphere.Application.Common.Models;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;
using SkillSphere.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Queries.GetPaginatedCourses;


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

    public GetPaginatedCoursesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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
