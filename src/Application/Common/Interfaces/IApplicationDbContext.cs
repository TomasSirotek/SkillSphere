using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Course> Courses { get; }
    
    DbSet<Category> Categories { get; }
    
    DbSet<CourseCategory> CourseCategories { get; }
    
    DbSet<Chapter> Chapters { get; }
    
    DbSet<UserCourse> UsersCourses { get; }
    DbSet<WishListItem> WishlistItems { get; }
    DbSet<PurchasedCourse> OwnedCourses { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
