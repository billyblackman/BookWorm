using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class SeriesBookController : ControllerBase
    {
        private readonly SeriesBookRepository _seriesBookRepository;
        private readonly UserRepository _userRepository;
        public SeriesBookController(ApplicationDbContext context)
        {
            _seriesBookRepository = new SeriesBookRepository(context);
            _userRepository = new UserRepository(context);
        }

        [HttpGet("seriesId")]
        public IActionResult GetSeriesBooks(int seriesId)
        {
            return Ok(_seriesBookRepository.GetSeriesBooks(seriesId));
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
