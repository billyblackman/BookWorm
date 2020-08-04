using BookWorm.Data;
using BookWorm.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Repositories
{
    public class SeriesBookRepository
    {
        private readonly ApplicationDbContext _context;
        public SeriesBookRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<SeriesBook> GetSeriesBooks(int userId)
        {
            return _context.SeriesBook
                            .Include(sb => sb.Series)
                            .Include(sb => sb.Book)
                            .Where(sb => sb.Book.Id == userId)
                            .ToList();
        }
        public void Add(SeriesBook seriesBook)
        {
            _context.Add(seriesBook);
            _context.SaveChanges();
        }
    }
}
