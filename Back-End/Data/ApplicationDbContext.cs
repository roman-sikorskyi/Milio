using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Milio.Models;

public class ApplicationDbContext : IdentityDbContext<User, IdentityRole, string>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    // DbSets for the tables
    public DbSet<Offer> Offers { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuring Offer-Category relationship
        modelBuilder.Entity<Offer>()
            .HasOne(o => o.Category)
            .WithMany(c => c.Offers)
            .HasForeignKey(o => o.CategoryId)
            .OnDelete(DeleteBehavior.SetNull); // Adjust based on your business rules

        // Configuring Offer-User relationship
        modelBuilder.Entity<Offer>()
            .HasOne(o => o.User)
            .WithMany(u => u.Offers)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.SetNull); // Adjust based on your business rules

        // Configuring Feedback-Offer relationship
        modelBuilder.Entity<Feedback>()
            .HasOne(f => f.Offer)
            .WithMany(o => o.Feedbacks)
            .HasForeignKey(f => f.OfferId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configuring Feedback-User relationship
        modelBuilder.Entity<Feedback>()
            .HasOne(f => f.User)
            .WithMany(u => u.Feedbacks)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.SetNull); // Adjust as necessary

        // Correctly configuring the IdentityUserRole and automatic value generation
        modelBuilder.Entity<IdentityUserRole<string>>()
            .HasKey(r => new { r.UserId, r.RoleId }); // Primary key consists of UserId and RoleId, no Id field necessary
        modelBuilder.Entity<IdentityUserRole<string>>()
            .ToTable("AspNetUserRoles");

        // Ensuring automatic value generation for roles and users in Identity tables
        modelBuilder.Entity<User>().ToTable("AspNetUsers");
        modelBuilder.Entity<IdentityRole>().ToTable("AspNetRoles");
    }
}
