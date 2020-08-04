using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Models
{
    public class SeriesBook
    {
        public int Id { get; set; }
        [Required]
        public int SeriesId { get; set; }
        [Required]
        public int BookId { get; set; }
        public int? SeriesPosition { get; set; }
        public Series Series { get; set; }
        public Book Book { get; set; }
    }
}
