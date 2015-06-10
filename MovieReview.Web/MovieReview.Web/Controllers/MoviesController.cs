using MovieReview.Data.Contracts;
using MovieReview.Model;
using MoviewReview.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MovieReview.Web.Controllers
{
    public class MoviesController : ApiBaseController
    {
        public MoviesController(IMovieReviewUow uow)
        {
            Uow = uow;
        }

        // GET: api/Movies
        public IQueryable Get()
        {
            var model = Uow.Movies.GetAll().OrderByDescending(m => m.Reviews.Count()).Select(m => new MovieViewModel
            {
                Id = m.Id,
                MovieName = m.MovieName,
                DirectorName = m.DirectorName,
                ReleaseYear = m.ReleaseYear,
                NoOfReviews = m.Reviews.Count()
            });
            return model;
        }

        // GET: api/Movies/5
        public Movie Get(int id)
        {
            var movie = Uow.Movies.GetById(id);
            if (movie != null) return movie;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // POST: api/Movies
        public HttpResponseMessage Post([FromBody]Movie movie)
        {
            Uow.Movies.Add(movie);
            Uow.Commit();

            return Request.CreateResponse(HttpStatusCode.Created, movie);
        }

        // PUT: api/Movies/5
        public HttpResponseMessage Put([FromBody]Movie movie)
        {
            Uow.Movies.Update(movie);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE: api/Movies/5
        public HttpResponseMessage Delete(int id)
        {
            Uow.Movies.Delete(id);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
