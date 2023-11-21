using System.Diagnostics;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Common.Models;

namespace SkillSphere.Application.Auth.Commands;

public record AuthUserCommand : IRequest<AuthResult>
{
    public string? Email { get; init; }
    public string? Password { get; init; }
}

public class AuthenticateCommandHandler : IRequestHandler<AuthUserCommand,AuthResult>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _userService;

    public AuthenticateCommandHandler(IApplicationDbContext context,IIdentityService userService)
    {
        _context = context;
        _userService = userService;
    }
    public async Task<AuthResult> Handle(AuthUserCommand request, CancellationToken cancellationToken)
        {
            // Assuming request.Email and request.Password are provided

            Guard.Against.NullOrEmpty(request.Email, nameof(request.Email));
            Guard.Against.NullOrEmpty(request.Password, nameof(request.Password));
            
            return await _userService.AuthenticateAsync(request.Email, request.Password);
            //return  await _userService.AuthenticateAsync(request.Email, request.Password);


        }

 
}



