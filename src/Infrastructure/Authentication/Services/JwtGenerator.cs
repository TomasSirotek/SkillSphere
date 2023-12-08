using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SkillSphere.Domain.Entities;


namespace SkillSphere.Infrastructure.Authentication.Services;

public class JwtGenerator : IJwtTokenGen
    {
        private readonly JwtTokenConfig _authSettings;

        public JwtGenerator(JwtTokenConfig authSettings)
        {
            _authSettings = authSettings;
        }

        public ValueTask<string> CreateToken(ApplicationUser user, CancellationToken cancellationToken = default)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            Debug.Assert(_authSettings.Secret != null, "_authSettings.Secret != null");
            var key = Encoding.UTF8.GetBytes(_authSettings.Secret);

            Debug.Assert(user.Email != null, "user.Email != null");
            Debug.Assert(user.UserName != null, "user.UserName != null");
            
            var claimList = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, user.UserName)
            };

            // claimList.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = null,
                Issuer = null,
                Subject = new ClaimsIdentity(claimList),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return new ValueTask<string>(jwtToken);
        }
    }

