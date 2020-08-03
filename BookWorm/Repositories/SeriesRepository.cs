using BookWorm.Data;
using BookWorm.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Repositories
{
    public class SeriesRepository
    {
        private readonly ApplicationDbContext _context;
        public SeriesRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Series> GetSeries(int id)
        {
            return _context.Series
                            .Where(s => s.UserId == id)
                            .ToList();
        }
        public void Add(Series series)
        {
            _context.Add(series);
            _context.SaveChanges();
        }
    }
}
