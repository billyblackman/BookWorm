using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BookWorm.Data;
using BookWorm.Models;
using BookWorm.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;

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

        [HttpGet("collection")]
        public IActionResult GetCollection()
        {
            var currentUser = GetCurrentUser();

            return Ok(_bookRepository.GetCollection(currentUser.Id));
        }

        [HttpGet("wishlist")]
        public IActionResult GetWishlist()
        {
            var currentUser = GetCurrentUser();

            return Ok(_bookRepository.GetWishlist(currentUser.Id));
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
            _bookRepository.Add(book);
            Console.WriteLine(book);
            return CreatedAtAction("Get", new { id = book.Id }, book);
        }

        [HttpPut("{googleId}")]
        public IActionResult Update(string googleId)
        {
            var currentUser = GetCurrentUser();
            var book = _bookRepository.GetByGoogleId(googleId, currentUser.Id);
            _bookRepository.Update(book);
            return NoContent();
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

        [HttpDelete("deleteByGoogleId/{googleId}")]
        public IActionResult Delete(string googleId)
        {
            var currentUser = GetCurrentUser();

            _bookRepository.DeleteByGoogleId(googleId, currentUser.Id);
            return NoContent();
        }
        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
