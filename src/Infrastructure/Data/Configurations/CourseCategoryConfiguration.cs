using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Infrastructure.Data.Configurations;

public class CourseCategoryConfiguration : IEntityTypeConfiguration<CourseCategory>
{
    public void Configure(EntityTypeBuilder<CourseCategory> builder)
    {
        builder.HasKey(cc => new { cc.CourseId, cc.CategoryId });

        builder
            .HasOne(cc => cc.Course)
            .WithMany(c => c.Categories)
            .OnDelete(DeleteBehavior.Cascade)
            .HasForeignKey(cc => cc.CourseId);

        builder
            .HasOne(cc => cc.Category)
            .WithMany(c => c.CourseCategories)
            .OnDelete(DeleteBehavior.Cascade)
            .HasForeignKey(cc => cc.CategoryId);     
    }
}