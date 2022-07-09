using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Tracking_task.Models
{
    public class Context : IdentityDbContext<ApplicationUser>
    {
        public Context()
        {
        }
        public Context(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Assignee> Assignees { get; set; }
        public DbSet<Task> Tasks { get; set; }
    }
}
