using SkillSphere.Application.Auth.Commands;
using SkillSphere.Application.Common.Models;
using SkillSphere.Web.Infrastructure;

namespace SkillSphere.Web.Endpoints;


public class Auth : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(Authenticate, "/authenticate")
            .MapPost(Register, "/register");
    }
    
    public async Task<AuthResult> Authenticate(ISender sender,AuthUserCommand command)
    {
        return await sender.Send(command);
    }
    
    public async Task<Result> Register(ISender sender,RegisterUserCommand command)
    {
        return await sender.Send(command);
    }
}


