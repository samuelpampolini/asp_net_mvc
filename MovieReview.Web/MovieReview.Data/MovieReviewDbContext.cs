using MovieReview.Data.SampleData;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReview.Data
{
    public class MovieReviewDbContext: DbContext
    {
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieReview> MovieReviews { get; set; }

        public MovieReviewDbContext() : base(nameOrConnectionString: "MoviesReviewProd") { }

        //invoke this to seed defailt values for the 1st run
        //comment the initializer code in production
        static MovieReviewDbContext()
        {
            Database.SetInitializer(new MovieReviewDatabaseInitializer());
        }

        //setting EF Conventions
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //use singular table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
