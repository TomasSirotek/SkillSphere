
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SkillSphere.Infrastructure.Authentication
{
  
    public class JwtTokenConfig
    {
        public string Secret { get; init; } = "";
    }
}



