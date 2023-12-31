﻿using Azure.Identity;
using Microsoft.AspNetCore.Mvc;
using NSwag;
using NSwag.Generation.Processors.Security;
using SkillSphere.Application.Common.Interfaces;
using skillSphere.Infrastructure.Data;
using SkillSphere.Web.Infrastructure;
using SkillSphere.Web.Services;
using ZymLabs.NSwag.FluentValidation;

namespace SkillSphere.Web;

public static class DependencyInjection
{
    public static IServiceCollection AddWebServices(this IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();

        services.AddScoped<IUser, CurrentUser>();
        

        services.AddHttpContextAccessor();

        services.AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>();

        services.AddExceptionHandler<CustomExceptionHandler>();

        services.AddScoped(provider =>
        {
            var validationRules = provider.GetService<IEnumerable<FluentValidationRule>>();
            var loggerFactory = provider.GetService<ILoggerFactory>();

            return new FluentValidationSchemaProcessor(provider, validationRules, loggerFactory);
        });

        // Customise default API behaviour
        services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true);

        services.AddEndpointsApiExplorer();

        services.AddOpenApiDocument((configure, sp) =>
        {
            configure.Title = "SkillSphere API";
            configure.Description = "SkillSphere API";

            configure.Version = "v1";
            // Add the fluent validations schema processor
            var fluentValidationSchemaProcessor = 
                sp.CreateScope().ServiceProvider.GetRequiredService<FluentValidationSchemaProcessor>();

            // BUG: SchemaProcessors is missing in NSwag 14 (https://github.com/RicoSuter/NSwag/issues/4524#issuecomment-1811897079)
            // configure.SchemaProcessors.Add(fluentValidationSchemaProcessor);

            // Add JWT
            configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
            {
                Name = "Authorization",
                In = OpenApiSecurityApiKeyLocation.Header,
                Type = OpenApiSecuritySchemeType.ApiKey,
                Description = "Please insert token: Bearer {your JWT token}."
            });
            
            configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
        });
        
        return services;
    }

    public static IServiceCollection AddKeyVaultIfConfigured(this IServiceCollection services, ConfigurationManager configuration)
    {
        var keyVaultUri = configuration["KeyVaultUri"];
        if (!string.IsNullOrWhiteSpace(keyVaultUri))
        {
            configuration.AddAzureKeyVault(
                new Uri(keyVaultUri),
                new DefaultAzureCredential());
        }

        return services;
    }

}

