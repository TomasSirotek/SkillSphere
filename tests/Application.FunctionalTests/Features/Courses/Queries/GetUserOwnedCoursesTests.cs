using SkillSphere.Application.Features.Courses.Queries.GetUserCourse;


namespace SkillSphere.Application.FunctionalTests.Features.Courses.Queries;

using static Testing;
 
public class GetUserOwnedCoursesTests: BaseTestFixture
{
    [Test]
    public async Task ShouldDenyAnonymousUser()
    {
        var query = new GetUserOwnedCoursesQuery(Guid.Empty);

        var action = () => SendAsync(query);

        await action.Should().ThrowAsync<UnauthorizedAccessException>();
    }
    
    [Test]
    public async Task ShouldReturnEmptyUserPurchasedCourses()
    {
        var userId = await RunAsDefaultUserAsync();
        
        var query = new GetUserOwnedCoursesQuery(userId);
        
        var result = await SendAsync(query);
        result.Should().NotBeNull();
        result!.Courses.Should().BeEmpty();

    }
    
  
}

