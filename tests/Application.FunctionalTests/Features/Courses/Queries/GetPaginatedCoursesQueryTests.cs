using SkillSphere.Application.Features.Courses.Queries.GetPaginatedCourses;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.FunctionalTests.Features.Courses.Queries;

using static Testing;

public class GetPaginatedCoursesQueryTests : BaseTestFixture
{
    [Test]
    public async Task ShouldDenyAnonymousUser()
    {
        var query = new GetPaginatedCoursesQuery()
        {
            SortBy = "Title", SortOrder = "asc", PageNumber = 1, PageSize = 10
        };

        var action = () => SendAsync(query);

        await action.Should().ThrowAsync<UnauthorizedAccessException>();
    }

    [Test]
    public async Task ShouldSortByTitle()
    {
        await RunAsDefaultUserAsync();

        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course A", IsPublished = true });
        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course D", IsPublished = true });
        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course C", IsPublished = true });
        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course B", IsPublished = true });

        var query = new GetPaginatedCoursesQuery()
        {
            SortBy = "title", SortOrder = "asc", PageNumber = 1, PageSize = 8
        };

        var result = await SendAsync(query);

        var expectedSortedCourses = result.Items.OrderBy(c => c.Title);

        result.Items.Should().NotBeEmpty();
        result.Items.Should().HaveCount(4);
        result.Items.First().Title.Should().Be("Course A");
        result.Items.Last().Title.Should().Be("Course D");
        result.Items.Should().BeEquivalentTo(expectedSortedCourses);
    }


    [Test]
    public async Task ShouldUpdateChapterVisibilityWhenUserOwnsCourse()
    {
        var userId = await RunAsDefaultUserAsync();

        await AddAsync(new Course
        {
            Id = Guid.NewGuid(),
            Title = "Course A",
            IsPublished = true,
            Chapters = new List<Chapter>()
            {
                new Chapter()
                {
                    Id = Guid.NewGuid(),
                    Title = "My chapter",
                    VideoURL = "Some URL",
                    Description = "Some Description",
                    Position = 0,
                    IsFree = false,
                }
            },
            OwnedCourses = { new PurchasedCourse() { UserId = userId } }
        });

        var query = new GetPaginatedCoursesQuery { SortBy = "Title", SortOrder = "asc", PageNumber = 1, PageSize = 10 };

        var result = await SendAsync(query);

        result.Items.Should().NotBeEmpty();
        result.Items.Should().HaveCount(1);
        result.Items.First().Chapters.First().IsFree.Should().BeTrue();
        result.Items.First().Chapters.First().VideoURL.Should().Be("Some URL");
        result.Items.First().Chapters.First().Description.Should().Be("Some Description");
    }


    [Test]
    public async Task ShouldNotUpdateChapterVisibilityWhenUserDoesNotOwnCourse()
    {
        await RunAsDefaultUserAsync();

        await AddAsync(new Course
        {
            Id = Guid.NewGuid(),
            Title = "Course A",
            IsPublished = true,
            Chapters = new List<Chapter>()
            {
                new Chapter()
                {
                    Title = "My chapter",
                    VideoURL = "Some URL",
                    Description = "Some Description",
                    Position = 0,
                    IsFree = false,
                }
            },
        });

        var query = new GetPaginatedCoursesQuery { SortBy = "Title", SortOrder = "asc", PageNumber = 1, PageSize = 10 };

        var result = await SendAsync(query);

        result.Items.Should().NotBeEmpty();
        result.Items.Should().HaveCount(1);
        result.Items.First().Chapters.First().IsFree.Should().BeFalse();
        result.Items.First().Chapters.First().VideoURL.Should().BeNull();
        result.Items.First().Chapters.First().Description.Should().BeNull();
    }

    [Test]
    public async Task ShouldSortByTitleDesc()
    {
        await RunAsDefaultUserAsync();

        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course A", IsPublished = true });
        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course D", IsPublished = true });
        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course C", IsPublished = true });
        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course B", IsPublished = true });

        var query = new GetPaginatedCoursesQuery()
        {
            SortBy = "title", SortOrder = "desc", PageNumber = 1, PageSize = 8
        };

        var result = await SendAsync(query);


        result.Items.Should().NotBeEmpty();
        result.Items.Should().HaveCount(4);
        result.Items.First().Title.Should().Be("Course D");
        result.Items.Last().Title.Should().Be("Course A");
    }

    [Test]
    public async Task ShouldSortByPrice()
    {
        await RunAsDefaultUserAsync();

        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course D", IsPublished = true, Price = 29.99f });
        await AddAsync(new Course { Id = Guid.NewGuid(), Title = "Course A", IsPublished = true, Price = 19.99f });

        var query = new GetPaginatedCoursesQuery()
        {
            SortBy = "price", SortOrder = "asc", PageNumber = 1, PageSize = 2
        };

        var result = await SendAsync(query);

        result.Items.Should().NotBeEmpty();
        result.Items.Should().HaveCount(2);
        result.Items.First().Price.Should().Be(19.99f);
        result.Items.Last().Price.Should().Be(29.99f);
    }
}
