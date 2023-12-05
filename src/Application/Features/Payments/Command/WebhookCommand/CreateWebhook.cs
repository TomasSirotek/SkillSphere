using System.Diagnostics;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Common.Models;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Payments.Command.WebhookCommand;

public class CreateWebhookCommandHandler : IRequestHandler<WebhookCommand,IResult>
{
    private readonly IPaymentGateway _paymentGateway;
    private readonly IApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CreateWebhookCommandHandler> _logger;

    public CreateWebhookCommandHandler(IPaymentGateway paymentGateway, IHttpContextAccessor httpContextAccessor, ILogger<CreateWebhookCommandHandler> logger, IApplicationDbContext context)
    {
        _paymentGateway = paymentGateway;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
        _context = context;
    }

    public async Task<IResult> Handle(WebhookCommand request, CancellationToken cancellationToken)
    {
        Guard.Against.Null(request, nameof(request));
        Guard.Against.Null(_httpContextAccessor.HttpContext, nameof(_httpContextAccessor.HttpContext));
        
        // read the body of the request
        using var reader = new StreamReader(_httpContextAccessor.HttpContext.Request.Body, Encoding.UTF8, true, 1024, true);
        // get the header value
        var headerValue = _httpContextAccessor.HttpContext.Request.Headers["Stripe-Signature"];
            
        _httpContextAccessor.HttpContext.Request.Body.Position = 0;
        var json = await reader.ReadToEndAsync(cancellationToken);
        
        // construct the event
        var paymentResult = _paymentGateway.ValidatePaymentEvent(json, headerValue);

        var userIdString = request.Data?.Object?.Metadata?.FirstOrDefault(x => x.Key == "userId").Value;
        var courseIdString = request.Data?.Object?.Metadata?.FirstOrDefault(x => x.Key == "courseId").Value;
        // if success then assign course to user and return Result of Created 
        if (paymentResult)
        {
            // add the course to the user's owned courses
            if (!string.IsNullOrEmpty(userIdString) && !string.IsNullOrEmpty(courseIdString) &&
                Guid.TryParse(userIdString, out Guid userId) && Guid.TryParse(courseIdString, out Guid courseId))
            {
                // check if the user already owns the course
                var alreadyOwnsCourse = await _context.OwnedCourses.AnyAsync(x => x.UserId == userId && x.CourseId == courseId, cancellationToken);

                if (alreadyOwnsCourse) return Results.BadRequest("User already owns this course");
                
                // add the course to the user's owned courses
                var newPurchasedCourse = new PurchasedCourse()
                {
                    UserId = userId,
                    CourseId = courseId,
                    PurchaseDate = DateTime.UtcNow
                };

                _context.OwnedCourses.Add(newPurchasedCourse);
                await _context.SaveChangesAsync(cancellationToken);
                return Results.Ok();
            }
        }

        return Results.NoContent();
    }
    
}