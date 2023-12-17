using System.Text;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillSphere.Application.Auth.Commands;
using SkillSphere.Application.Common.Models;
using SkillSphere.Application.Features.Payments.Command;
using SkillSphere.Application.Features.Payments.Command.WebhookCommand;
using SkillSphere.Web.Infrastructure;
using Stripe;

namespace SkillSphere.Web.Endpoints;

public class Payments : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreatePayment)
            .MapPost(Webhook,"/webhook");
    }
    
    public async Task<PaymentResult> CreatePayment(ISender sender,CreatePaymentCommand command)
    {
        return await sender.Send(command);
    }
    
    public async Task<IResult> Webhook(ISender sender,[FromBody] WebhookCommand command)
    {
        await sender.Send(command);
        return Results.Ok();
    }
}
