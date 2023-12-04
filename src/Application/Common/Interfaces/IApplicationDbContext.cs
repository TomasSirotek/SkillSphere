using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }
    
    DbSet<Course> Courses { get; }
    
    DbSet<Category> Categories { get; }
    
    DbSet<CourseCategory> CourseCategories { get; }
    
    DbSet<Chapter> Chapters { get; }
    
    DbSet<UserCourse> UsersCourses { get; }
    DbSet<WishListItem> WishlistItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
