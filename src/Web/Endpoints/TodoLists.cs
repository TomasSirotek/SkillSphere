using SkillSphere.Application.Features.TodoLists.Queries.GetTodos;
using SkillSphere.Web.Infrastructure;
using SkillSphere.Application.TodoLists.Commands.CreateTodoList;
using SkillSphere.Application.TodoLists.Commands.DeleteTodoList;
using SkillSphere.Application.TodoLists.Commands.UpdateTodoList;
using SkillSphere.Application.TodoLists.Queries.GetTodos;

namespace SkillSphere.Web.Endpoints;

public class TodoLists : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
           
            .MapGet(GetTodoLists)
            .MapPost(CreateTodoList)
            .MapPut(UpdateTodoList, "{id}")
            .MapDelete(DeleteTodoList, "{id}");
    }

    public async Task<TodosVm> GetTodoLists(ISender sender)
    {
        return await sender.Send(new GetTodosQuery());
    }

    public async Task<Guid> CreateTodoList(ISender sender, CreateTodoListCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<IResult> UpdateTodoList(ISender sender, Guid id, UpdateTodoListCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeleteTodoList(ISender sender, Guid id)
    {
        await sender.Send(new DeleteTodoListCommand(id));
        return Results.NoContent();
    }
}
