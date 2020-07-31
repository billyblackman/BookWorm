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
        public List<Book> GetCollection(int id)
        {
            return _context.Book
                            .Where(b => b.UserId == id && b.Purchased == true)
                            .ToList();
        }

        public List<Book> GetWishlist(int id)
        {
            return _context.Book
                            .Where(b => b.UserId == id && b.Purchased == false)
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

        public void Update(string googleId, int userId)
        {
            var book = GetByGoogleId(googleId, userId);
            _context.Entry(book).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
