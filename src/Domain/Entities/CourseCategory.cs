namespace SkillSphere.Domain.Entities;

public class CourseCategory : BaseEntity
{
    public Guid CourseId { get; set; }
    public Guid CategoryId { get; set; }
    
    
    
    public Course? Course { get; set; }
    public Category? Category { get; set; }
}