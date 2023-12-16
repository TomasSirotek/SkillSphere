using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SkillSphere.Application.Common.Interfaces;
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
        
        using var reader = new StreamReader(_httpContextAccessor.HttpContext.Request.Body, Encoding.UTF8, true, 1024, true);
        var headerValue = _httpContextAccessor.HttpContext.Request.Headers["Stripe-Signature"];
            
        _httpContextAccessor.HttpContext.Request.Body.Position = 0;
        var json = await reader.ReadToEndAsync(cancellationToken);
        
        var paymentResult = _paymentGateway.ValidatePaymentEvent(json, headerValue);

        var userIdString = request.Data?.Object?.Metadata?.FirstOrDefault(x => x.Key == "userId").Value;
        var courseIdString = request.Data?.Object?.Metadata?.FirstOrDefault(x => x.Key == "courseId").Value;

        if (paymentResult)
        {
            if (!string.IsNullOrEmpty(userIdString) && !string.IsNullOrEmpty(courseIdString) &&
                Guid.TryParse(userIdString, out Guid userId) && Guid.TryParse(courseIdString, out Guid courseId))
            {
                var alreadyOwnsCourse = await _context.OwnedCourses.AnyAsync(x => x.UserId == userId && x.CourseId == courseId, cancellationToken);

                if (alreadyOwnsCourse) return Results.BadRequest("User already owns this course");
                
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