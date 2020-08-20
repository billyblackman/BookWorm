using System.Security.Claims;
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
        private readonly UserRepository _userRepository;
        public BookController(ApplicationDbContext context)
        {
            _bookRepository = new BookRepository(context);
            _userRepository = new UserRepository(context);
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            var currentUser = GetCurrentUser();

            return Ok(_bookRepository.GetBooks(currentUser.Id));
        }

        [HttpGet("getByGoogleId/{googleId}")]
        public IActionResult GetByGoogleId(string googleId)
        {
            var currentUser = GetCurrentUser();

            return Ok(_bookRepository.GetByGoogleId(googleId, currentUser.Id));
        }

        [HttpPost]
        public IActionResult Post(Book book)
        {
            var currentUser = GetCurrentUser();
            book.UserId = currentUser.Id;
            _bookRepository.Add(book);
            return CreatedAtAction("GetByGoogleId", new { googleId = book.GoogleId }, book);
        }

        [HttpPut("wishlistToCollection/{googleId}")]
        public IActionResult WishlistToCollection(string googleId)
        {
            var currentUser = GetCurrentUser();
            var book = _bookRepository.GetByGoogleId(googleId, currentUser.Id);
            book.Purchased = true;
            _bookRepository.Update(book);
            return Ok(book);
        }

        [HttpPut("addBookToQueue/{googleId}")]
        public IActionResult AddToQueue(string googleId)
        {
            User currentUser = GetCurrentUser();
            Book book = _bookRepository.GetByGoogleId(googleId, currentUser.Id);
            int highestPosition = _bookRepository.GetHighestQueuePosition(currentUser.Id);
            book.QueuePosition = (highestPosition + 1);
            _bookRepository.Update(book);
            return Ok(book);
        }

        [HttpPut("removeBookFromQueue/{googleId}")]
        public IActionResult RemoveFromQueue(string googleId)
        {
            User currentUser = GetCurrentUser();
            Book book = _bookRepository.GetByGoogleId(googleId, currentUser.Id);
            book.QueuePosition = 0;
            _bookRepository.Update(book);
            return Ok(book);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }
            _bookRepository.Update(book);
            return NoContent();
        }

        [HttpDelete("deleteByGoogleId/{googleId}")]
        public IActionResult Delete(string googleId)
        {
            var currentUser = GetCurrentUser();

            _bookRepository.DeleteByGoogleId(googleId, currentUser.Id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUser();

            _bookRepository.DeleteById(id, currentUser.Id);
            return NoContent();
        }
        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
