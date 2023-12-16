using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Features.Courses.Commands.SaveCourse;
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
       

        var existingCourse = await _context.Courses
            .Include(c => c.Chapters) 
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        
        Guard.Against.NotFound(request.Id, existingCourse);
        Guard.Against.Null(existingCourse.IsPublished);

        existingCourse.Title = request.Title;
        existingCourse.Description = request.Description;
        existingCourse.CoverImageRelativePath = request.CoverImageRelativePath;
        existingCourse.Price = request.Price;

        await UpdateCategories(existingCourse, request.Categories, cancellationToken);
        await UpdateChapters(existingCourse, request.Chapters, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }

    private async Task UpdateChapters(Course existingCourse, IList<PutChapterDto> requestChapters, CancellationToken cancellationToken)
    {
        var chaptersToRemove = existingCourse.Chapters.ToList();

        foreach (var requestChapter in requestChapters)
        {
            
      
            var existingChapter = existingCourse.Chapters.FirstOrDefault(c => c.Id == requestChapter.Id);

            if (existingChapter != null)
            {
                // Update existing chapter
                existingChapter.Title = requestChapter.Title;
                existingChapter.Description = requestChapter.Description;
                existingChapter.VideoURL = requestChapter.VideoURL;
                existingChapter.Position = requestChapter.Position;
                existingChapter.IsFree = requestChapter.IsFree;
                
            }
            else
            {
                existingCourse.Chapters.Add(new Chapter
                {
                    // Set properties based on requestChapter
                    Title = requestChapter.Title,
                    Description = requestChapter.Description,
                    VideoURL = requestChapter.VideoURL,
                    Position = requestChapter.Position,
                    IsFree = requestChapter.IsFree,
                });
            }
        }

        // Remove any chapters that were not in the request
        foreach (var chapterToRemove in chaptersToRemove)
        {
            existingCourse.Chapters.Remove(chapterToRemove);
        }

        // Save changes to the database
        await _context.SaveChangesAsync(cancellationToken);
    }
    private async Task UpdateCategories(Course existingCourse, IList<PutCategoryDto> categoriesList,
        CancellationToken cancellationToken)
    {
        var existingCourseCategories = await _context.CourseCategories
            .Where(cc => cc.CourseId == existingCourse.Id)
            .ToListAsync(cancellationToken);

        _context.CourseCategories.RemoveRange(existingCourseCategories);

        if (categoriesList.Any())
        {
            foreach (var categoryDto in categoriesList)
            {
                var category = await _context.Categories
                    .FindAsync(new object[] { categoryDto.Id ?? Guid.Empty }, cancellationToken);

                if (category != null)
                {
                        var newCourseCategory = new CourseCategory
                        {
                            CourseId = existingCourse.Id, CategoryId = category.Id
                        };

                        _context.CourseCategories.Add(newCourseCategory);
                    
                }
            }
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}