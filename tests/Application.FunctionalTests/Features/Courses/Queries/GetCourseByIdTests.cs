using SkillSphere.Application.Features.Courses.Queries.GetCourseById;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.FunctionalTests.Features.Courses.Queries;

using static Testing;


public class GetCourseByIdTests : BaseTestFixture
{
    [Test]
    public async Task ShouldDenyAnonymousUser()
    {
        var query = new GetCourseByIdQuery(Guid.Empty);
     
        var action = () => SendAsync(query);
         
        await action.Should().ThrowAsync<UnauthorizedAccessException>();
    }
    
    [Test]
    public async Task ShouldReturnCourseByItsId()
    {
        await RunAsDefaultUserAsync();
        var courseId = Guid.NewGuid();
        
        var category = new Category
        {
            Id = Guid.NewGuid(),
            Name = "C#"
        };

        await AddAsync (new Course
        {
            Id = courseId,
            Title = "Advanced C#",
            Description = "Advanced C#",
            CoverImageRelativePath = "some path",
            Price = 19.99f,
            Categories = new List<CourseCategory>
            {
                new CourseCategory
                {
                    Category = category
                }
            },
        });

       
        var query = new GetCourseByIdQuery(courseId);

        var result = await SendAsync(query);

        result.Should().NotBeNull();
        result!.Title.Should().Be("Advanced C#");
        result!.Description.Should().Be("Advanced C#");
        result!.CoverImageRelativePath.Should().Be("some path");
        result!.Price.Should().Be(19.99f);
        result!.Categories.Should().HaveCount(1);
        result!.Categories.First().Name.Should().Be("C#");
        
    }

}
