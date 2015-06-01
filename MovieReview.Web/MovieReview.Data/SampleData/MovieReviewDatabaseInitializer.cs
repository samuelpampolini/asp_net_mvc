﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReview.Data.SampleData
{
    public class MovieReviewDatabaseInitializer : DropCreateDatabaseIfModelChanges<MovieReviewDbContext>
    {
        protected override void Seed(MovieReviewDbContext context)
        {
            context.Movies.AddOrUpdate(r => r.MovieName,
                new Movie { MovieName = "Avatar", DirectorName = "James Cameron", ReleaseYear = "2009" },
                new Movie { MovieName = "Titanic", DirectorName = "James Cameron", ReleaseYear = "1997" },
                new Movie { MovieName = "Die Another Day", DirectorName = "Lee Tamahori", ReleaseYear = "2002" },
                new Movie
                {
                    MovieName = "Godzilla",
                    DirectorName = "Gareth Edwards",
                    ReleaseYear = "2004",
                    Reviews = new List<MovieReview> {
                    new MovieReview {ReviewerRating=5,ReviewerComments="Excellent", ReviewerName="Rahul Sahay"}
                }
                });
        }
    }
}