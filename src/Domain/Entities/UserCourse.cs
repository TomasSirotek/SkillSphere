
namespace SkillSphere.Domain.Entities;


public class UserCourse : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    
    public Course Course { get; set; } = new Course();
}

// STUFF I HAVE TO DO AND WHAT IS WRONG

// STRUCTURE
// - appUser is in infrastructure
// - userCourse is in Domain 
// - appUser cannot be referenced from Domain/Entity
// - cannot use interface and implement it into appUser class in order to 
// use it inside the Domain 
// - clean architecture
// - vertical slices
// - dbContext
// - Application layer for having the interface of email sender and send it from infrastructure

