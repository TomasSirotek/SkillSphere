using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Common.Interfaces;

public interface IJwtTokenGen
{
    ValueTask<string> CreateToken(ApplicationUser user, CancellationToken cancellationToken = default);
}
