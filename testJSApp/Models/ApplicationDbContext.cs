using Microsoft.EntityFrameworkCore;

namespace testJSApp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<QuestionEntity> QuestionEntities { get; set; }
    }
}
