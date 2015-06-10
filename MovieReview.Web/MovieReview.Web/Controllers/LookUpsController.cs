using MovieReview.Data.Contracts;
using MovieReview.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MovieReview.Web.Controllers
{
    public class LookUpsController : ApiBaseController
    {
        public LookUpsController(IMovieReviewUow uow)
        {
            Uow = uow;
        }

        // GET: api/lookups/movies
        [ActionName("movies")]
        public IEnumerable<Movie> GetMovies()
        {
            return Uow.Movies.GetAll().OrderBy(m => m.Id);
        }

        // GET: api/lookups/movieReviews
        [ActionName("movieReviews")]
        public IEnumerable<MoviesReview> GetMoviesReviews()
        {
            return Uow.MovieReviews.GetAll().OrderBy(m => m.MovieId);
        }

        // /api/Lookups/getbyreviewerid?id=1
        [ActionName("getbyreviewerid")]
        public MoviesReview GetbyReviewerId(int id)
        {
            return Uow.MovieReviews.GetById(id);
        }

        #region OData Future: IQueryable<T>
        //[Queryable]
        // public IQueryable<Movie> Get()
        // public IQueryable<MovieReview> Get()
        #endregion
    }
}
