namespace SkillSphere.Domain.Entities;

public class Chapter :  BaseEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? VideoURL { get; set; }
    public int Position { get; set; }
    public bool? IsFree { get; set; }
    public Guid CourseId { get; set; }
    public Course? Course { get; set; }
}
