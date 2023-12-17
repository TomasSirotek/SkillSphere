using SkillSphere.Application.Common.Models;

namespace SkillSphere.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<string?> GetUserNameAsync(Guid userId);

    Task<bool> IsInRoleAsync(Guid userId, string role);

    Task<bool> AuthorizeAsync(Guid userId, string policyName,Guid? requestedUserId);

    Task<Result> CreateUserAsync(string userName, string password);

    Task<Result> DeleteUserAsync(Guid userId);
    
    Task<AuthResult> AuthenticateAsync(string requestEmail, string requestPassword);
}
