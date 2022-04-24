using System.ComponentModel.DataAnnotations;

namespace BackendTodo.Models
{
    public class Todo
    {
        public int id { get; set; }
        [Required]
        public string descripcion { get; set; }
        [Required]
        public string estado { get; set; }
        public Byte[]? archivo { get; set; }
    }
}
