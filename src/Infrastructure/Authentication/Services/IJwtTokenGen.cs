using SkillSphere.Domain.Entities;

namespace SkillSphere.Infrastructure.Authentication.Services;

public interface IJwtTokenGen
{
    ValueTask<string> CreateToken(ApplicationUser user, CancellationToken cancellationToken = default);
}
