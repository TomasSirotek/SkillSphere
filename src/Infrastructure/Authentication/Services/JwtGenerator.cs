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

        private const string SignatureAlgorithm = SecurityAlgorithms.HmacSha512;
        
        public JwtGenerator(JwtTokenConfig authSettings)
        {
            _authSettings = authSettings;
        }

        public ValueTask<string> CreateToken(ApplicationUser user, CancellationToken cancellationToken = default)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            Guard.Against.NullOrEmpty(_authSettings.Secret, nameof(_authSettings.Secret),message:"Secret is null or empty");
            
            var key = Encoding.UTF8.GetBytes(_authSettings.Secret);

            Guard.Against.NullOrEmpty(user.Email, nameof(user.Email),message:"Email is null or empty");
            Guard.Against.NullOrEmpty(user.UserName, nameof(user.UserName),message:"UserName is null or empty");

            
            var claimList = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, user.UserName)
            };
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = null,
                Issuer = null,
                Subject = new ClaimsIdentity(claimList),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = 
                    new SigningCredentials(
                    new SymmetricSecurityKey(key), 
                    SignatureAlgorithm)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return new ValueTask<string>(jwtToken);
        }
    }

