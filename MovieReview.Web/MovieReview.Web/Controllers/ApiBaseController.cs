using MovieReview.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace MovieReview.Web.Controllers
{
    public class ApiBaseController : ApiController
    {
        protected IMovieReviewUow Uow { get; set; }
    }
}