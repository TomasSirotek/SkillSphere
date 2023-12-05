namespace SkillSphere.Infrastructure.Config;

public class StripeConfig
{
    public string ApiKey { get; set; } = Environment.GetEnvironmentVariable("STRIPE_API") ?? throw new Exception("STRIPE_KEY is not set");
    public string WhKey { get; set; } = Environment.GetEnvironmentVariable("STRIPE_WH") ?? throw new Exception("WH_KEY is not set");
}
