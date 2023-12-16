using SkillSphere.Application.Features.Courses.Commands;
using SkillSphere.Application.Common.Exceptions;
using SkillSphere.Application.Features.Courses.Commands.CreateCourse;
using SkillSphere.Application.Features.Courses.Commands.SaveCourse;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.FunctionalTests.Features.Courses.Commands;

using static Testing;

public class SaveCourseDraftTests : BaseTestFixture
{
    [Test]
    public async Task ShouldDenyAnonymousUser()
    {
        var query = new SaveCourseDraftCommand()
        {
            Id = Guid.NewGuid()
        };

        var action = () => SendAsync(query);

        await action.Should().ThrowAsync<UnauthorizedAccessException>();
    }

    [Test]
    public async Task ShouldRequireMinimumFieldsDraft()
    {
        var userId = await RunAsDefaultUserAsync();

        var command = new CreateCourseCommand { UserId = userId, Title = "Advanced C#" };

        var id = await SendAsync(command);
        var course = await FindAsync<Course>(id);

        var saveCourseCommand = new SaveCourseDraftCommand()
        {
            Id = course!.Id,
            Title = "",
            Description = "",
            Price = 300,
            CoverImageRelativePath = "",
            Categories = new List<PutCategoryDto>(),
        };

        await FluentActions.Invoking(() => SendAsync(saveCourseCommand)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldSaveCourseDraft()
    {
        var userId = await RunAsDefaultUserAsync();

        var command = new CreateCourseCommand { UserId = userId, Title = "Advanced C#" };

        var id = await SendAsync(command);
        var course = await FindAsync<Course>(id);

        var courseCommand = new SaveCourseDraftCommand()
        {
            Id = course!.Id, 
            Title = "New Title",
            Description = "New Description",
            Price = 19.99f,
            Categories = new List<PutCategoryDto>()
            {
                new PutCategoryDto()
                {
                    Id = new Guid(),
                    Name = "Web Development"
                }
            }
        };

        await SendAsync(courseCommand);

        var updatedCourse = await FindAsync<Course>(id);

        updatedCourse.Should().NotBeNull();
        updatedCourse!.Title.Should().Be(courseCommand.Title);
        updatedCourse.Description.Should().Be(courseCommand.Description);
        updatedCourse.Price.Should().Be(courseCommand.Price);
        updatedCourse.IsPublished.Should().BeFalse();
    }
}
