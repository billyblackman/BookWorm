using Microsoft.EntityFrameworkCore;
using BookWorm.Data;
using BookWorm.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Repositories
{
    public class BookRepository
    {
        private readonly ApplicationDbContext _context;
        public BookRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Book> GetAllByUserId(int id)
        {
            return _context.Book
                            .Where(b => b.UserId == id)
                            .ToList();
        }
        public void Add(Book book)
        {
            _context.Add(book);
            _context.SaveChanges();
        }

        public Book GetByGoogleId(string googleId, int userId)
        {
            return _context.Book
                            .FirstOrDefault(b => b.GoogleId == googleId && b.UserId == userId);
        }
        public void DeleteByGoogleId(string googleId, int userId)
        {
            var book = GetByGoogleId(googleId, userId);
            _context.Book.Remove(book);
            _context.SaveChanges();
        }
    }
}
