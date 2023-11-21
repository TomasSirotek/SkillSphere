using System.Diagnostics;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Common.Models;

namespace SkillSphere.Application.Auth.Commands;

public record RegisterUserCommand : IRequest<Result>
{
    public string? Email { get; init; }
    public string? Password { get; init; }
}

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand,Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _userService;

    public RegisterUserCommandHandler(IApplicationDbContext context,IIdentityService userService)
    {
        _context = context;
        _userService = userService;
    }
    public async Task<Result> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            Guard.Against.NullOrEmpty(request.Email, nameof(request.Email));
            Guard.Against.NullOrEmpty(request.Password, nameof(request.Password));
            
            var result = await _userService.CreateUserAsync(request.Email, request.Password);
            return result;
        }
 
}



