using BackendTodo.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendTodo
{
    public class AplicationDbContext: DbContext
    {
        public DbSet<Todo> Todo { get; set; }
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options):base(options) 
        {

        }
    }
}
