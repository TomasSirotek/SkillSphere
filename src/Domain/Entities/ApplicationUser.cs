using Microsoft.AspNetCore.Identity;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Domain.Identity;

public class ApplicationUser : IdentityUser
{
     public IList<UserCourse>? UserCourses { get; set; }
}
