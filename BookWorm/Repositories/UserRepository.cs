using BookWorm.Data;
using BookWorm.Models;
using System.Linq;

namespace BookWorm.Repositories
{
    public class UserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.User
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }
    }
}
