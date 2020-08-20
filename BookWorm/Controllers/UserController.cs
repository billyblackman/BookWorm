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
        public class UserController : ControllerBase
        {
            private readonly UserRepository _userRepository;
            public UserController(ApplicationDbContext context)
            {
                _userRepository = new UserRepository(context);
            }

            [HttpGet("{firebaseUserId}")]
            public IActionResult GetByFirebaseUserId(string firebaseUserId)
            {
                var user = _userRepository.GetByFirebaseUserId(firebaseUserId);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }

            [HttpPost]
            public IActionResult Register(User user)
            {
                _userRepository.Add(user);
                return CreatedAtAction(
                    nameof(GetByFirebaseUserId), new { firebaseUserId = user.FirebaseUserId }, user);
            }
        }
}
