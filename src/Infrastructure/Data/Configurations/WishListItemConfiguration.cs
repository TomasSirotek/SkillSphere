using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Infrastructure.Data.Configurations;

public class WishListItemConfiguration : IEntityTypeConfiguration<WishListItem>
{
    public void Configure(EntityTypeBuilder<WishListItem> builder)
    {
        builder
            .HasKey(wi => new { wi.UserId, wi.CourseId });

        builder
            .HasOne(wi => wi.User)
            .WithMany(u => u.WishList)
            .HasForeignKey(wi => wi.UserId);

        builder
            .HasOne(wi => wi.Course)
            .WithMany(c => c.WishList)
            .HasForeignKey(wi => wi.CourseId);
    }
 
}




