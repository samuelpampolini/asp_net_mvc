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
    public class MoviesController : ApiBaseController
    {
        public MoviesController(IMovieReviewUow uow)
        {
            Uow = uow;
        }

        // GET: api/Movies
        public IEnumerable<Movie> Get()
        {
            return Uow.Movies.GetAll().OrderBy(s => s.MovieName);
        }

        // GET: api/Movies/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Movies
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Movies/5
        public HttpResponseMessage Put([FromBody]Movie movie)
        {
            Uow.Movies.Update(movie);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE: api/Movies/5
        public void Delete(int id)
        {
        }
    }
}
