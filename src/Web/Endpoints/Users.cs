using SkillSphere.Web.Infrastructure;
using SkillSphere.Infrastructure.Identity;

namespace SkillSphere.Web.Endpoints;

public class Users : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapIdentityApi<ApplicationUser>();
    }
}

