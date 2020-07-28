using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookWorm.Data;
using BookWorm.Models;
using BookWorm.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookWorm.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookRepository _bookRepository;
        public BookController(ApplicationDbContext context)
        {
            _bookRepository = new BookRepository(context);
        }
        [HttpPost]
        public IActionResult Post(Book book)
        {
            _bookRepository.Add(book);
            return CreatedAtAction("Get", new { id = book.Id }, book);
        }
    }
}
