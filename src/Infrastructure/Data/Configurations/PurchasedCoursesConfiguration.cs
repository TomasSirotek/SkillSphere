using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Infrastructure.Data.Configurations;

public class PurchasedCoursesConfiguration: IEntityTypeConfiguration<PurchasedCourse>
{
    public void Configure(EntityTypeBuilder<PurchasedCourse> builder)
    {
        builder
            .HasKey(pc => new { pc.UserId, pc.CourseId });

        builder
            .HasOne(pc => pc.User)
            .WithMany(u => u.OwnedCourses)
            .HasForeignKey(pc => pc.UserId);

        builder
            .HasOne(pc => pc.Course)
            .WithMany(c => c.OwnedCourses)
            .HasForeignKey(pc => pc.CourseId);
    }
 
}