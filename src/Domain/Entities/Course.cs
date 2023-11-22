namespace SkillSphere.Domain.Entities;

public class Course : BaseAuditableEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? CoverImageRelativePath { get; set; }

    public bool? IsPublished { get; set; } = false;
    
    public float Price { get; set; }
    
    public IList<Chapter> Chapters { get; init; } = new List<Chapter>();

    public IList<CourseCategory> Categories { get; init; } = new List<CourseCategory>();
}
