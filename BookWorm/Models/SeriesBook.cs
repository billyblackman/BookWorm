using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Models
{
    public class SeriesBook
    {
        public int Id { get; set; }
        public int SeriesId { get; set; }
        public int BookId { get; set; }
        public int SeriesPosition { get; set; }
        public Book Book { get; set; }
        public Series Series { get; set; }
    }
}
