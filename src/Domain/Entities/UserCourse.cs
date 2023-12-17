

namespace SkillSphere.Domain.Entities;


public class UserCourse
{
    public Guid UserId { get; set; }
    
    public ApplicationUser? User { get; set; }
    public Guid CourseId { get; set; }
    
    public Course? Course { get; set; }
}

