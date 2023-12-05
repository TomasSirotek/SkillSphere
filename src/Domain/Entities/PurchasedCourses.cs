namespace SkillSphere.Domain.Entities;

public class PurchasedCourse
{
    public Guid UserId { get; set; }
    public ApplicationUser? User { get; set; }

    public Guid CourseId { get; set; }
    public Course? Course { get; set; }

    public DateTime PurchaseDate { get; set; }
}
