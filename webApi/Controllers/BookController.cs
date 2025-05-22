using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Data;
using webApi.Models;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BookController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Book>> GetBooks()
        {
            var Books = await _context.Books.AsNoTracking().ToListAsync();
            return Books;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.Books.AddAsync(book);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok();
            }

            return BadRequest("Failed to create book");
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _context.Books.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            var bookFormDb = await _context.Books.FindAsync(id);
            if (bookFormDb is null)
                return BadRequest("Book not found");

            bookFormDb.Title = book.Title;
            bookFormDb.Author = book.Author;
            bookFormDb.Isbn = book.Isbn;
            bookFormDb.PublicationDate = book.PublicationDate;

            var result = await _context.SaveChangesAsync();
            if (result > 0)
                return Ok("Book updated successfully");

            return BadRequest("Failed to update book");
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return NoContent();
            }

            return BadRequest("Failed to delete book");
        }

    }
}