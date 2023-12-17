namespace SkillSphere.Application.Common.Models;

public class PurchasedItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    public float Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}
