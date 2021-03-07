using Microsoft.EntityFrameworkCore;

namespace app_webapi.models
{
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }

        // sobrescrevendo o método
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                        .HasKey(e => new { e.Id });
        }
    }
}