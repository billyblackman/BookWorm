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
    public class SeriesBookController : ControllerBase
    {
        private readonly SeriesBookRepository _seriesBookRepository;
        private readonly UserRepository _userRepository;
        public SeriesBookController(ApplicationDbContext context)
        {
            _seriesBookRepository = new SeriesBookRepository(context);
            _userRepository = new UserRepository(context);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var currentUser = GetCurrentUser();
            return Ok(_seriesBookRepository.GetSeriesBooks(currentUser.Id));
        }

        [HttpPost]
        public IActionResult Post(SeriesBook seriesBook)
        {
            _seriesBookRepository.Add(seriesBook);
            return CreatedAtAction("Get", new { id = seriesBook.Id }, seriesBook);
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
