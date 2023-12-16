using SkillSphere.Domain.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using skillSphere.Infrastructure.Data;
using Roles = SkillSphere.Domain.Constants.Roles;

namespace SkillSphere.Infrastructure.Data;

public static class InitialiserExtensions
{
    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var initialiser =  scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();
        
        await initialiser.InitialiseAsync();
        
        await initialiser.SeedAsync();
    }
}

public class ApplicationDbContextInitialiser
{
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;

    public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            await _context.Database.MigrateAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default roles
        // Default roles
        var administratorRole = new ApplicationRole();
        administratorRole.Name = Roles.Administrator;
        
        if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
        {
            await _roleManager.CreateAsync(administratorRole);
        }

        // Default users
        var administrator = new ApplicationUser { UserName = "administrator@localhost", Email = "administrator@localhost" };

        if (_userManager.Users.All(u => u.UserName != administrator.UserName))
        {
            await _userManager.CreateAsync(administrator, "Administrator1!");
            if (!string.IsNullOrWhiteSpace(administratorRole.Name))
            {
                await _userManager.AddToRolesAsync(administrator, new [] { administratorRole.Name });
            }
        }

            // SEED DATA
        if (!_context.Courses.Any())
        {
            var course1 = new Course
            {
                Title = "Extreme web development",
                Description = "This is a course about web development",
                CoverImageRelativePath = "https://ipfs.io/ipfs/QmW1MBApm4XvwgoSKf45ZtsqJU5cDYdcsW2GBSEUqXWE3T",
                Price = 19.99f,
                Likes = 0,
                Categories = new List<CourseCategory>
                {
                    new CourseCategory
                    {
                        Category = new Category { Name = "Web development" }
                    },
                    new CourseCategory
                    {
                        Category = new Category { Name = "Machine Learning" }
                    },
                   
                },
                Chapters =
                {
                    new Chapter { Title = "Chapter 1", Description = "Chapter 1 Description",Position = 0,IsFree = true,},
                    new Chapter { Title = "Chapter 2", Description = "Chapter 2 Description",Position = 1,IsFree = false,},
                    new Chapter { Title = "Chapter 3", Description = "Chapter 3 Description",Position = 2,IsFree = false,},
                    new Chapter { Title = "Chapter 4", Description = "Chapter 4 Description",Position = 3,IsFree = false,},
                }
                
            };

            _context.Courses.Add(course1);
            await _context.SaveChangesAsync();
        }
    }
}
