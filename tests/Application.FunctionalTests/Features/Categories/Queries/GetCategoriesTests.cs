using System.Net.Http.Headers;
using SkillSphere.Application.Features.Categories.Query.GetCategories;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.FunctionalTests.Features.Categories.Queries;

using static Testing;

public class GetCategoriesTests : BaseTestFixture
{
     
    [Test]
    public async Task ShouldDenyAnonymousUser()
    {
        var query = new GetCategoriesQuery();
     
        var action = () => SendAsync(query);
         
        await action.Should().ThrowAsync<UnauthorizedAccessException>();
    }
    
    [Test]
    public async Task ShouldReturnAListOfCreatedCategories()
    {
        await RunAsDefaultUserAsync();  // all user should be able to access the categories
        
        string[] categories = {"Programming", "Cooking", "Development"};
        
        await AddAsync(new Category() { Name = categories[0], });
        await AddAsync(new Category() { Name = categories[1], });
        await AddAsync(new Category() { Name = categories[2], });
        
        var query = new GetCategoriesQuery();
        
        var result = await SendAsync(query);

        result.Categories.Should().HaveCount(3);
    }
}
