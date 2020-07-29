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
    }
}
