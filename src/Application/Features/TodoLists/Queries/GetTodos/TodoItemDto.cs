using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.TodoLists.Queries.GetTodos;

public class TodoItemDto
{
    public Guid Id { get; init; }

    public Guid ListId { get; init; }

    public string? Title { get; init; }

    public bool Done { get; init; }

    public int Priority { get; init; }

    public string? Note { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<TodoItem, TodoItemDto>().ForMember(d => d.Priority, 
                opt => opt.MapFrom(s => (int)s.Priority));
        }
    }
}
