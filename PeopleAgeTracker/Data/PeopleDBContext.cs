using Microsoft.EntityFrameworkCore;
using PeopleAgeTracker.Models;

namespace PeopleAgeTracker.Data
{
    public class PeopleDBContext : DbContext
    {
        public PeopleDBContext(DbContextOptions<PeopleDBContext> options)
       : base(options)
        { }
        public DbSet<Person> People { get; set; } = null!;
        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            
            OnBeforeSaving();
            var result = base.SaveChanges(acceptAllChangesOnSuccess);
            
            return result;
        }
        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            OnBeforeSaving();
            var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
            
            return result;
        }
        private void OnBeforeSaving()
        {

            
            ChangeTracker.DetectChanges();
            
            foreach (var entry in ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["DateCreated"] = DateTime.Now.ToUniversalTime();
                        break;

                    case EntityState.Modified:
                        entry.CurrentValues["DateModified"] = DateTime.Now.ToUniversalTime();
                        break;

                }

            }
            
        }
    }

}
