using Microsoft.AspNetCore.Http;

namespace SkillSphere.Application.Features.Payments.Command.WebhookCommand;

public record WebhookObjectRequest : IRequest<IResult>
{
    public string? Id { get; set; }
    
    public Dictionary<string,string>? Metadata { get; init; } 
}

public record WebhookDataRequest : IRequest<IResult>
{
    public WebhookObjectRequest? Object { get; set; }
}

public record WebhookCommand : IRequest<IResult>
{
    public string? Id { get; set; }
    public string? Type { get; set; }
    public WebhookDataRequest? Data { get; set; }
    
}
