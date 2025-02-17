using System.ComponentModel.DataAnnotations;

namespace ForteWebsite.Models
{

    public class SiteElement
    {
        
        public int Id { get; set; }
        public string ElementKey { get; set; } = null!;
        public string ElementType { get; set; } = null!;
        public string DefaultValue { get; set; } = null!;  // Ana içerik (asla değişmez)
        public string PageName { get; set; } = string.Empty;
    }
}