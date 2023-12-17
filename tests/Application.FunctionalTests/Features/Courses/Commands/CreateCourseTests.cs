using SkillSphere.Application.Features.Courses.Commands.CreateCourse;
using SkillSphere.Domain.Entities;
using SkillSphere.Application.Common.Exceptions;

namespace SkillSphere.Application.FunctionalTests.Features.Courses.Commands;

using static Testing;


public class CreateCourseTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireMinimumFields()
    {
        var userId = await RunAsDefaultUserAsync();
        
        var command = new CreateCourseCommand
        {
            UserId = userId,
            Title = ""
        };

        await FluentActions.Invoking(() => SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }
    
         
    [Test]
    public async Task ShouldDenyAnonymousUser()
    {
        var query = new CreateCourseCommand();
     
        var action = () => SendAsync(query);
         
        await action.Should().ThrowAsync<UnauthorizedAccessException>();
    }
    
    [Test]
    public async Task ShouldCreateCourse()
    {
        var userId = await RunAsDefaultUserAsync();

        var command = new CreateCourseCommand
        {
            UserId = userId,
            Title = "Advanced C#"
        };

        var id = await SendAsync(command);

        var course = await FindAsync<Course>(id);

        course.Should().NotBeNull();
        course!.Likes.Should().Be(0);
        course!.IsPublished.Should().BeFalse();
        course!.Created.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
    }
}
