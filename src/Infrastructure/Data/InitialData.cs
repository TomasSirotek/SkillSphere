using SkillSphere.Infrastructure.Identity;

namespace SkillSphere.Infrastructure.Data;

public class InitialData
{
    public static List<ApplicationUser> Users { get; }

    static InitialData()
    {
        Users = new List<ApplicationUser>
        {
            new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "admin",
                Email = "admin@gmail.com",
                SecurityStamp = Guid.NewGuid().ToString()
            },
            new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "developer",
                Email = "developer@gmail.com",
                SecurityStamp = Guid.NewGuid().ToString()
            }
        };
    }
}
