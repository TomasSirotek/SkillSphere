
namespace SkillSphere.Application.Common.Models;

public class AuthResult
{
    public string? Token { get; init; }
    public int ExpiresIn { get; init; }
    public Guid UserId { get; init; }
    public string? Email { get; init; }

}
