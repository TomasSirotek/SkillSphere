﻿using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Domain.Constants;
using SkillSphere.Infrastructure.Authentication;
using SkillSphere.Infrastructure.Authentication.Services;
using skillSphere.Infrastructure.Data;
using SkillSphere.Infrastructure.Data;
using SkillSphere.Infrastructure.Data.Interceptors;
using SkillSphere.Infrastructure.Identity;
using testSphere.Infrastructure.Data.Interceptors;
using Roles = SkillSphere.Domain.Constants.Roles;

namespace SkillSphere.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        Guard.Against.Null(connectionString, message: "Connection string 'DefaultConnection' not found.");

        services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
        services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

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
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();
            
        // Set up Time
        services.AddSingleton(TimeProvider.System);
        
        // Register Identity Service and its Interfaces
        services.AddTransient<IIdentityService, IdentityService>();

        services.AddTransient<IJwtTokenGen, JwtGenerator>();
        
        // Add Authentication schema for JWT 

        var jwtOptions = new JwtTokenConfig(); 
        services.AddSingleton(jwtOptions);
        
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
