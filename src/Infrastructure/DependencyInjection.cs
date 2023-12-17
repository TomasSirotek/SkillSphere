using System.Security.Claims;
using System.Text;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Domain.Constants;
using SkillSphere.Domain.Entities;
using SkillSphere.Domain.Identity;
using SkillSphere.Infrastructure.Authentication;
using SkillSphere.Infrastructure.Authentication.Services;
using SkillSphere.Infrastructure.Config;
using skillSphere.Infrastructure.Data;
using SkillSphere.Infrastructure.Data;
using SkillSphere.Infrastructure.PaymentGateway;
using Roles = SkillSphere.Domain.Constants.Roles;
using Microsoft.AspNetCore.Mvc;
using SkillSphere.Infrastructure.Data.Interceptors;

namespace SkillSphere.Infrastructure;

public static class DependencyInjection
{
    
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        Guard.Against.Null(connectionString, message: "Connection string 'DefaultConnection' not found.");
        
        var url = configuration["AzureKeyVaultUrl"];
        
        var secretClient = new SecretClient(new Uri(url!), new DefaultAzureCredential());
        
        var stripeApiKey = secretClient.GetSecret("Stripe--ApiKey").Value;
        var stripeWhKey = secretClient.GetSecret("Stripe--WHKey").Value;

       // Guard.Against.Null(stripeApiKey, message: "Connection string 'ApiKey' not found.");
       // Guard.Against.Null(stripeWhKey, message: "Connection string 'WHKey' not found.");

        var stripeConfig = new StripeConfig
        {
            ApiKey = stripeApiKey.Value,
            WhKey = stripeWhKey.Value
        };

        services.AddSingleton(stripeConfig);

        services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();

        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());

            options.UseSqlServer(connectionString);
        });

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitialiser>();
        
        // Setting up Identity
        services
            .AddDefaultIdentity<ApplicationUser>()
            .AddRoles<ApplicationRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddApiEndpoints();
            
        // Set up Time
        services.AddSingleton(TimeProvider.System);
        
        // Set up Stripe 
        services.AddOptions<StripeConfig>().BindConfiguration(nameof(StripeConfig));
        services.AddTransient<IPaymentGateway, StripePaymentGateway>();
        
        // Register Identity Service and its Interfaces
        services.AddTransient<IIdentityService, IdentityService>();

        services.AddTransient<IJwtTokenGen, JwtGenerator>();
        
        // Add Authentication schema for JWT 

        var jwtOptions = new JwtTokenConfig(); 
        services.AddSingleton(jwtOptions);
        services.AddAuthorizationBuilder();

        // Setting up API JWT Authentication
        services.AddAuthorization().AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret)),
                    ClockSkew = TimeSpan.Zero
                };
            });

        
        // => Adding policy for role Administrator
        services.AddAuthorization(options =>
            options.AddPolicy(Policies.CanPurge, policy => policy.RequireRole(Roles.Administrator)));

     
        return services;
    }
}


