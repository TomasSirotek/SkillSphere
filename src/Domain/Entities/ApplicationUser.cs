using Microsoft.AspNetCore.Identity;

namespace SkillSphere.Domain.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
     public IList<UserCourse>? UserCourses { get; set; }
}
