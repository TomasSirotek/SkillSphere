using System.Diagnostics;
using System.Runtime.InteropServices.JavaScript;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SkillSphere.Application.Auth;
using SkillSphere.Application.Auth.Commands;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Application.Common.Models;
using SkillSphere.Application.TodoLists.Commands.CreateTodoList;
using SkillSphere.Domain.Entities;
using SkillSphere.Infrastructure.Authentication.Services;
using SkillSphere.Web.Infrastructure;
using SkillSphere.Infrastructure.Identity;

namespace SkillSphere.Web.Endpoints;


public class Auth : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(Authenticate, "/authenticate")
            .MapPost(Register, "/register");
    }
    
    public async Task<AuthResult> Authenticate(ISender sender,AuthUserCommand command)
    {
        return await sender.Send(command);
    }
    
    public async Task<Result> Register(ISender sender,RegisterUserCommand command)
    {
        return await sender.Send(command);
    }
}


