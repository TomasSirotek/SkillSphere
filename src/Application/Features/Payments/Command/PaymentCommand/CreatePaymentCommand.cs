using SkillSphere.Application.Common.Models;

namespace SkillSphere.Application.Features.Payments.Command.PaymentCommand;

public class CreatePaymentCommand : IRequest<PaymentResult>
{
    public PurchasedItem? CourseToPurchase { get; set; }
    public int Quantity { get; set; } = 1;
    public Dictionary<string,string>? Metadata { get; set; }
    public string SuccessRedirectUrl { get; set; } = string.Empty;
    public string CancelRedirectUrl { get; set; } = string.Empty;
}
