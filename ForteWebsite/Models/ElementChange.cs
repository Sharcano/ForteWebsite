namespace ForteWebsite.Models
{
    public class ElementChange
    {
        public int Id { get; set; }
        public int ElementId { get; set; }
        public string OldValue { get; set; } = string.Empty;
        public string NewValue { get; set; } = null!;
        public string ChangedByUserId { get; set; } = null!;
        public DateTime ChangedAt { get; set; }
        public string PageName { get; set; } = string.Empty;
    }
}