namespace ForteWebsite.Models
{
    public class ElementChangeDto
    {
        public int ElementId { get; set; } 
        public string OldValue { get; set; } = string.Empty;
        public string NewValue { get; set; } = string.Empty;
        public string PageName { get; set; } = string.Empty;               
    }   
}
