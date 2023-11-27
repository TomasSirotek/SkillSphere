using SkillSphere.Application.Common.Models;
using SkillSphere.Application.TodoLists.Queries.GetTodos;

namespace SkillSphere.Application.Features.TodoLists.Queries.GetTodos;

// viewModel
public class TodosVm
{
    public IReadOnlyCollection<LookupDto> PriorityLevels { get; init; } = Array.Empty<LookupDto>();

    public IReadOnlyCollection<TodoListDto> Lists { get; init; } = Array.Empty<TodoListDto>();
}
