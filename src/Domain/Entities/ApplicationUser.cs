using Microsoft.AspNetCore.Identity;

namespace SkillSphere.Domain.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
     public IList<UserCourse> UserCourses { get; set; } = new List<UserCourse>();
     public IList<WishListItem> WishList { get; init; } = new List<WishListItem>();

     public IList<PurchasedCourse> OwnedCourses { get; private set; } = new List<PurchasedCourse>();
}
