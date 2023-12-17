using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Domain.Entities;

namespace SkillSphere.Application.Features.Courses.Queries.GetAllCourses;




public class ChapterDto
{
    public Guid? Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? VideoURL { get; set; }
    public int? Position { get; set; }

    public bool? IsFree { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Chapter, ChapterDto>()
        
                .ForMember(d => d.Position,
                    opt => opt.MapFrom(s => (int)s.Position));
        }
    }
}
