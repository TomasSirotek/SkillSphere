using Microsoft.AspNetCore.Identity;

namespace SkillSphere.Domain.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
     public IList<UserCourse>? UserCourses { get; set; }
     public IList<WishListItem>? WishList { get; init; } = new List<WishListItem>();
}
