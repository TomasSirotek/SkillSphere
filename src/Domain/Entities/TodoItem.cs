namespace SkillSphere.Domain.Entities;

public class TodoItem : BaseAuditableEntity
{
    public Guid ListId { get; set; }

    public string? Title { get; set; }

    public string? Note { get; set; }


    public DateTime? Reminder { get; set; }

    

    public TodoList List { get; set; } = null!;
}
