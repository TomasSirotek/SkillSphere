using SkillSphere.Application.Features.Categories.Query.GetCategories;
using SkillSphere.Web.Infrastructure;

namespace SkillSphere.Web.Endpoints;

public class Categories : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetCategories);
    }
    public async Task<GetCategoryVm> GetCategories(ISender sender)
    {
        return await sender.Send(new GetCategoriesQuery());
    }
}