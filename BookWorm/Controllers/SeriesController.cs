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
    public class SeriesController : ControllerBase
    {
        private readonly SeriesRepository _seriesRepository;
        private readonly UserRepository _userRepository;
        public SeriesController(ApplicationDbContext context)
        {
            _seriesRepository = new SeriesRepository(context);
            _userRepository = new UserRepository(context);
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            var currentUser = GetCurrentUser();

            return Ok(_seriesRepository.GetSeries(currentUser.Id));
        }

        [HttpPost]
        public IActionResult Post(Series series)
        {
            var currentUser = GetCurrentUser();
            series.UserId = currentUser.Id;
            _seriesRepository.Add(series);
            return CreatedAtAction("Get", new { id = series.Id }, series);
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
