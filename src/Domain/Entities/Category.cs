namespace SkillSphere.Domain.Entities;

public class Category : BaseEntity
{
    public string? Name { get; set; }
    
    public IList<CourseCategory> CourseCategories { get; private set; } = new List<CourseCategory>();
}
