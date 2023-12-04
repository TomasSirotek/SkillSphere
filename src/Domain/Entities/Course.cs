namespace SkillSphere.Domain.Entities;

public class Course : BaseAuditableEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? CoverImageRelativePath { get; set; }

    public bool? IsPublished { get; set; } = false;
    public float Price { get; set; }

    public int Likes { get; set; } = 0;
    
    public IList<Chapter> Chapters { get; init; } = new List<Chapter>();

    public IList<CourseCategory> Categories { get; init; } = new List<CourseCategory>();
    
    public IList<UserCourse> UserCourses { get; init; } = new List<UserCourse>();
    
    public IList<WishListItem> WishList { get; init; } = new List<WishListItem>();
}
