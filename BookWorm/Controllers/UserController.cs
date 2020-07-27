using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookWorm.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookWorm.Controllers
{
    public class UserController : ControllerBase
    {
        [Authorize]
        [Route("api/[controller]")]
        [ApiController]
        public class UserController : ControllerBase
        {
            private readonly UserRepository _userProfileRepository;
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
                _userProfileRepository.Add(user);
                return CreatedAtAction(
                    nameof(GetByFirebaseUserId), new { firebaseUserId = user.FirebaseUserId }, user);
            }
        }
    }
}
