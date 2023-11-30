using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Features.Courses.Queries;
using SkillSphere.Application.Features.Courses.Queries.GetAllCourses;

namespace SkillSphere.Application.Features.Categories.Query.GetCategories;

public record GetCategoriesQuery : IRequest<GetCategoryVm>;

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, GetCategoryVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<GetCategoryVm> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        return new GetCategoryVm
        {
            Categories = await _context.Categories
                .AsNoTracking()
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .OrderBy(t => t.Name)
                .ToListAsync(cancellationToken)
        }; 
    }
}
