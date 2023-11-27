using Microsoft.AspNetCore.Identity;

namespace SkillSphere.Domain.Identity;

public class ApplicationUser : IdentityUser
{
     public IList<UserCourse>? UserCourses { get; set; }
}
