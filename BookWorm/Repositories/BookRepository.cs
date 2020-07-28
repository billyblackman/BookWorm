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
        public void Add(Book book)
        {
            _context.Add(book);
            _context.SaveChanges();
        }
    }
}
