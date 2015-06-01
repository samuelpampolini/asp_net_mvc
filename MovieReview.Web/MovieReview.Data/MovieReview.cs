﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReview.Data
{
    public class MovieReview
    {
        public int Id { get; set; }
        public string ReviewerName { get; set; }
        public string ReviewerComments { get; set; }
        public int ReviewerRating { get; set; }
        public int MovieId { get; set; }
    }
}
