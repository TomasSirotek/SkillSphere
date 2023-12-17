using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SkillSphere.Domain.Entities;
using SkillSphere.Application.Common.Interfaces;

namespace skillSphere.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {}
    public DbSet<Course> Courses => Set<Course>();
    
    public DbSet<Category> Categories => Set<Category>();
    
    public DbSet<CourseCategory> CourseCategories => Set<CourseCategory>();
    
    public DbSet<Chapter> Chapters => Set<Chapter>();
    
    public DbSet<UserCourse> UsersCourses => Set<UserCourse>();
    public DbSet<WishListItem> WishlistItems => Set<WishListItem>();
    public DbSet<PurchasedCourse> OwnedCourses => Set<PurchasedCourse>();

    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
}
