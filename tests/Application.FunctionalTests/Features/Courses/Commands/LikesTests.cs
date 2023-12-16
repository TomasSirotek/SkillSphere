using SkillSphere.Application.Features.Courses.Commands.CreateCourse;
using SkillSphere.Application.Features.Courses.Commands.DecreaseLike;
using SkillSphere.Application.Features.Courses.Commands.IncreaseLikes;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.FunctionalTests.Features.Courses.Commands;

using static Testing;

public class LikesTests : BaseTestFixture

{

    [Test]
    public async Task ShouldIncreaseLike()
    {
        var userId = await RunAsDefaultUserAsync();

        var commandCourse = new CreateCourseCommand() { UserId = userId, Title = "Advanced C#" };

        var id = await SendAsync(commandCourse);
        var course = await FindAsync<Course>(id);

        var command = new IncreaseLikesCommand(course!.Id);
        await SendAsync(command);

        var updatedLikedCourse = await FindAsync<Course>(id);
        updatedLikedCourse.Should().NotBeNull();
        updatedLikedCourse!.Likes.Should().Be(1);
    }

    [Test]
    public async Task ShouldDecreaseLikeWhenBiggerThenZero()
    {
        var userId = await RunAsDefaultUserAsync();
        var commandCourse = new CreateCourseCommand() { UserId = userId, Title = "Advanced C#" };

        var id = await SendAsync(commandCourse);
        var course = await FindAsync<Course>(id);
        var command = new IncreaseLikesCommand(course!.Id);
        await SendAsync(command);

        var commandDecrease = new DecreaseLikeCountCommand(course!.Id);
        await SendAsync(commandDecrease);

        var updatedLikedCourse = await FindAsync<Course>(id);
        updatedLikedCourse.Should().NotBeNull();
        updatedLikedCourse!.Likes.Should().Be(0);
    }

    [Test]
    public async Task ShouldNotDecreaseIfLikesAreZero()
    {
        var userId = await RunAsDefaultUserAsync();
        var commandCourse = new CreateCourseCommand() { UserId = userId, Title = "Advanced C#" };

        var id = await SendAsync(commandCourse);
        var course = await FindAsync<Course>(id);

        var command = new DecreaseLikeCountCommand(course!.Id);

        var action = () => SendAsync(command);

        await action.Should().ThrowAsync<Exception>();
    }
}
