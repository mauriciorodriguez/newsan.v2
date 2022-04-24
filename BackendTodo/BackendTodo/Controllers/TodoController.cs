using BackendTodo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackendTodo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        public TodoController(AplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/<TodoController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listTodo = await _context.Todo.ToListAsync();
                return Ok(listTodo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<TodoController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var todoById = await _context.Todo.FindAsync(id);
                return Ok(todoById);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("descripcion/{desc}")]
        public async Task<IActionResult> Get(string desc)
        {
            try
            {
                var todosByDesc = await _context.Todo.Where(x => x.descripcion == desc).ToListAsync();
                return Ok(todosByDesc);
            } catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("estado/{state}")]
        public async Task<IActionResult> GetByState(string state)
        {
            try
            {
                var todosByState = await _context.Todo.Where(x => x.estado == state).ToListAsync();
                return Ok(todosByState);
            }
            catch(Exception e) 
            { 
                return BadRequest(e.Message); 
            }
        }

        // POST api/<TodoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Todo todo)
        {
            try
            {
                _context.Add(todo);
                await _context.SaveChangesAsync();
                return Ok(todo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<TodoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Todo todo)
        {
            try
            {
                if(id != todo.id)
                {
                    return NotFound();
                }

                _context.Update(todo);
                await _context.SaveChangesAsync();
                return Ok(new { message = "TODO actualizado" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE api/<TodoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var todo = await _context.Todo.FindAsync(id);
                if(todo == null)
                {
                    return NotFound();
                }
                _context.Todo.Remove(todo);
                await _context.SaveChangesAsync();
                return Ok(new { message = "TODO eliminado" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
