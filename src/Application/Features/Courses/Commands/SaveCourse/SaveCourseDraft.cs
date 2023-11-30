using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Commands;


public class SaveCourseDraftCommandHandler : IRequestHandler<SaveCourseDraftCommand>
{
    private readonly IApplicationDbContext _context;

    public SaveCourseDraftCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(SaveCourseDraftCommand request, CancellationToken cancellationToken)
    {
        // string to guid 
        var guidString = Guid.Parse(request.Id ?? String.Empty);

        var existingCourse = await _context.Courses
            .FindAsync(new object[] { guidString }, cancellationToken);


        Guard.Against.NotFound(guidString, existingCourse);

        // update entity depending on the values recieved 
        existingCourse.Title = request.Title;
        existingCourse.Description = request.Description;
        existingCourse.CoverImageRelativePath = request.CoverImageRelativePath;
        existingCourse.IsPublished = request.IsPublished;
        existingCourse.Price = request.Price;

        await UpdateCategories(existingCourse, request.Categories, cancellationToken);
        // update chapters

        await _context.SaveChangesAsync(cancellationToken);
    }

    private async Task UpdateCategories(Course existingCourse, IList<PostCategoryDto> categoriesList,
        CancellationToken cancellationToken)
    {
        // STEP 1: Find all categories for this course and delete them from the joining table (CourseCategories)
        var existingCourseCategories = await _context.CourseCategories
            .Where(cc => cc.CourseId == existingCourse.Id)
            .ToListAsync(cancellationToken);

        _context.CourseCategories.RemoveRange(existingCourseCategories);

        // STEP 2: Check if the new categories exist, and if yes, assign them to the correct course category
        if (categoriesList.Any())
        {
            foreach (var categoryDto in categoriesList)
            {
                var category = await _context.Categories
                    .FindAsync(new object[] { categoryDto.Id ?? Guid.Empty }, cancellationToken);

                if (category != null)
                {
                    // Check if the category already exists in the CourseCategories
                    var existingCourseCategory = await _context.CourseCategories
                        .FirstOrDefaultAsync(cc => cc.CourseId == existingCourse.Id && cc.CategoryId == category.Id,
                            cancellationToken);

                    if (existingCourseCategory == null)
                    {
                        // If not, create a new CourseCategory entry
                        var newCourseCategory = new CourseCategory
                        {
                            CourseId = existingCourse.Id, CategoryId = category.Id
                        };

                        _context.CourseCategories.Add(newCourseCategory);
                    }
                }
            }
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}