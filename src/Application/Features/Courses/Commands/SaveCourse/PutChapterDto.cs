namespace SkillSphere.Application.Features.Courses.Commands;

public class PutChapterDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? VideoURL { get; set; }
    public int Position { get; set; }
    public bool? IsFree { get; set; } = false;
}
