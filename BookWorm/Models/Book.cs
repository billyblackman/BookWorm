using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string GoogleId { get; set; }
        public int UserId { get; set; }
        public string ImageLink { get; set; }
        public bool Purchased { get; set; }
        public int CompletionPercentage { get; set; }
        public int Rating { get; set; }
        public int QueuePosition { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
