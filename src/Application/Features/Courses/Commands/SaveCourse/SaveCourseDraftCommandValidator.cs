namespace SkillSphere.Application.Features.Courses.Commands.SaveCourse;

public class SaveCourseDraftCommandValidator : AbstractValidator<SaveCourseDraftCommand>
{
    public SaveCourseDraftCommandValidator()
    {
        RuleFor(v => v.Title)
            .MaximumLength(200)
            .NotEmpty();
        RuleFor(v => v.Categories)
            .NotEmpty();
        RuleFor(v => v.Price)
            .Must(x => new[] { 0f, 19.99f, 29.99f }.Contains(x));
    }
}
