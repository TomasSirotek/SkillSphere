namespace SkillSphere.Infrastructure.Config;

public class StripeConfig
{
    public string ApiKey { get; set; } = Environment.GetEnvironmentVariable("stripeAPIKey")!;
    public string WhKey { get; set; } = Environment.GetEnvironmentVariable("stripeWhKey")!;
}
