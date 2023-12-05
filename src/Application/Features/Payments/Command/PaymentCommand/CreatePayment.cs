using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Common.Models;

namespace SkillSphere.Application.Features.Payments.Command.PaymentCommand;


public class CreatePaymentCommandHandler : IRequestHandler<CreatePaymentCommand,PaymentResult>
{
    private readonly IPaymentGateway _paymentGateway;

    public CreatePaymentCommandHandler(IPaymentGateway paymentGateway)
    {
        _paymentGateway = paymentGateway;
    }

    public async Task<PaymentResult> Handle(CreatePaymentCommand request, CancellationToken cancellationToken)
    {
        var checkoutUrl = await 
            _paymentGateway
                .CreateCheckoutSession(
                    request.CourseToPurchase, 
                    request.Quantity,
                    request.Metadata,
                    request.SuccessRedirectUrl, 
                    request.CancelRedirectUrl
                    );

        return new PaymentResult() { CheckoutUrl = checkoutUrl };
    }
}

