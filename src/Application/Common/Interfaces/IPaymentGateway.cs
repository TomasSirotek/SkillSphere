using Microsoft.Extensions.Primitives;
using SkillSphere.Application.Common.Models;
using SkillSphere.Application.Features.Payments.Command;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Common.Interfaces;

public interface IPaymentGateway
{

    Task<string?> CreateCheckoutSession( PurchasedItem? requestCoursesToPurchase,
        int? requestQuantity, Dictionary<string, string>? requestMetadata, string requestSuccessRedirectUrl,
        string requestCancelRedirectUrl);
    bool ValidatePaymentEvent(string? json, StringValues headerValue);
}
