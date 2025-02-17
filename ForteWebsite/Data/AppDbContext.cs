using Microsoft.EntityFrameworkCore;
using ForteWebsite.Models;

namespace ForteWebsite.Data // "Data" eklendi
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<SiteElement> SiteElements { get; set; }
        public DbSet<ElementChange> ElementChanges { get; set; }
        public DbSet<ContactForm> ContactForms { get; set; }

    }
}