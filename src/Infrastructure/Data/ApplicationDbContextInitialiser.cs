using System.Runtime.InteropServices;
using SkillSphere.Domain.Constants;
using SkillSphere.Domain.Entities;
using SkillSphere.Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SkillSphere.Domain.Identity;
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
        var administratorRole = new ApplicationRole();
        administratorRole.Name = Roles.Administrator;

        var roles = _roleManager.Roles.All(r => r.Name != administratorRole.Name);
        
        
        if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
        {
            await _roleManager.CreateAsync(administratorRole);
        }

        // Default users
        var administrator = new ApplicationUser { UserName = "administrator", Email = "administrator@localhost.com" };

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
                Title = "Course 3",
                Description = "Course 1 Description",
                CoverImageRelativePath = "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Price = 9.99f,
                Likes = 0,
                Categories = new List<CourseCategory>
                {
                    new CourseCategory
                    {
                        Category = new Category { Name = "Web development" }
                    },
                    new CourseCategory
                    {
                        Category = new Category { Name = "Drawing" }
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


        if (!_context.TodoLists.Any())
        {
            _context.TodoLists.Add(new TodoList
            {
                Title = "Todo List",
                Items =
                {
                    new TodoItem { Title = "Make a todo list 📃" },
                    new TodoItem { Title = "Check off the first item ✅" },
                    new TodoItem { Title = "Realise you've already done two things on the list! 🤯"},
                    new TodoItem { Title = "Reward yourself with a nice, long nap 🏆" },
                }
            });

            await _context.SaveChangesAsync();
        }
    }
}
