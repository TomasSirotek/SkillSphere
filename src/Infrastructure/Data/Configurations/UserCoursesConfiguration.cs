using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillSphere.Domain.Entities;
using SkillSphere.Infrastructure.Identity;

namespace SkillSphere.Infrastructure.Data.Configurations;


public class UserCoursesConfiguration : IEntityTypeConfiguration<UserCourse>
{
    public void Configure(EntityTypeBuilder<UserCourse> builder)
    {

        builder
            .HasKey(uc => new { uc.UserId, uc.CourseId });
        
        builder
            .HasOne(uc => uc.Course)
            .WithMany(c => c.UserCourses)
            .HasForeignKey(uc => uc.CourseId);
    }
    //     builder
    //         .HasKey(cc => new { cc.UserId, cc.CourseId });
    //
    //     builder
    //         .HasOne<ApplicationUser>() 
    //         .WithMany()
    //         .HasForeignKey(cc => cc.UserId)
    //         .OnDelete(DeleteBehavior.Cascade);
    //
    //     builder
    //         .HasOne(cc => cc.Course)
    //         .WithMany(c => c.UserCourses)
    //         .HasForeignKey(cc => cc.CourseId)
    //         .OnDelete(DeleteBehavior.Cascade);
    // }
}

