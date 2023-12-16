using SkillSphere.Application.Features.Courses.Queries.GetUserWishList;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.FunctionalTests.Features.Courses.Queries;


using static Testing;


public class GetUserWishListTests : BaseTestFixture
{
    [Test]
    public async Task ShouldDenyAnonymousUser()
    {
        var query = new GetUserWishListQuery(Guid.Empty);

        var action = () => SendAsync(query);

        await action.Should().ThrowAsync<UnauthorizedAccessException>();
    }
    
    [Test]
    public async Task ShouldReturnEmptyUserWishList()
    {
        var userId = await RunAsDefaultUserAsync();
        
        var query = new GetUserWishListQuery(userId);
        
        var result = await SendAsync(query);
        result.Should().NotBeNull();
        result!.Courses.Should().BeEmpty();
        
    }
    
    [Test]
    public async Task ShouldReturnAddedCourseFromUserWishlistWhenPublished()
    {
        var userId = await RunAsDefaultUserAsync();
        var courseId = Guid.NewGuid();
        
        await AddAsync (new Course
        {
            Id = courseId,
            Title = "Advanced C#",
            Description = "Advanced C#",
            CoverImageRelativePath = "some path",
            Price = 19.99f,
            IsPublished = true,
            WishList = new List<WishListItem>()
            {
                new WishListItem()
                {
                    UserId = userId,
                    CourseId = courseId
                }
            }
        });
        
        
        var query = new GetUserWishListQuery(userId);
        
        var result = await SendAsync(query);
        result.Should().NotBeNull();
        result!.Courses.Should().HaveCount(1);
        result!.Courses.First().Title.Should().Be("Advanced C#");
    }

}

