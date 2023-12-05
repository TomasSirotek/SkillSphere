using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Common.Models;
using SkillSphere.Infrastructure.Config;
using Stripe;
using Stripe.Checkout;


namespace SkillSphere.Infrastructure.PaymentGateway;

public class StripePaymentGateway : IPaymentGateway
{
    private readonly StripeConfig _stripeConfig;
    private readonly ILogger<StripePaymentGateway> _logger;


    public StripePaymentGateway(IOptions<StripeConfig> stripeConfiguration, ILogger<StripePaymentGateway> logger)
    {
        _stripeConfig = stripeConfiguration.Value;
        _logger = logger;

        StripeConfiguration.ApiKey = _stripeConfig.ApiKey;
    }

    public async Task<string?> CreateCheckoutSession(
        PurchasedItem? requestCoursesToPurchase, int? requestQuantity, Dictionary<string, string>? requestMetadata,
        string requestSuccessRedirectUrl, string requestCancelRedirectUrl)
    {
        var isFree = requestCoursesToPurchase?.Price == 0;

        var options = new SessionCreateOptions
        {
            Mode = "payment",
            Currency = "dkk",
            PaymentMethodTypes = new List<string> { "card" },
            SuccessUrl = requestSuccessRedirectUrl,
            CancelUrl = requestCancelRedirectUrl,
            Metadata = requestMetadata,
            LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    Quantity = requestQuantity,
                    PriceData = new SessionLineItemPriceDataOptions()
                    {
                        Currency = "dkk",
                        UnitAmount = !isFree
                            ? (long)(requestCoursesToPurchase?.Price * 100)!
                            : 0,
                        ProductData = new SessionLineItemPriceDataProductDataOptions()
                        {
                            Name = requestCoursesToPurchase?.Title,
                            Description = requestCoursesToPurchase?.Description,
                            Images = new List<string>() { requestCoursesToPurchase?.ImageUrl ?? String.Empty },
                        },
                    }
                },
            }.ToList(),
        };

        var checkoutSession = await new SessionService().CreateAsync(options);

        return checkoutSession.Url;
    }

    public bool ValidatePaymentEvent(string? json, StringValues headerValue)
    {
        try
        {
            var stripeEvent = EventUtility.ConstructEvent(json, headerValue, _stripeConfig.WhKey);

            switch (stripeEvent.Type)
            {
                case Events.ChargeSucceeded:
                    return true;
                case Events.CheckoutSessionCompleted:
                    return true;
                default:
                    return false;
            }
        }
        catch (StripeException e)
        {
            _logger.LogError(e, "Error validating payment event");
            return false;
        }
    }
}
