using MovieReview.Data.Contracts;
using MovieReview.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReview.Data
{
    /// <summary>
    /// The Movie revie "Unit of Work"
    ///     1) decouples the repos from the controllers
    ///     2) decouples the DbContext and EF from the controllers
    ///     3) manages the UO
    /// </summary>
    /// <remarks>
    /// This class implements the "Unit of Work" pattern in which
    /// the "UoW" serves as a facade for querying and saving to the database.
    /// Querying is delegated to "repositories"
    /// </remarks>
    public class MovieReviewUow: IMovieReviewUow, IDisposable
    {
        public MovieReviewUow(IRepositoryProvider repositoryProvider)
        {
            CreateDbContext();
            repositoryProvider.DbContext = DbContext;
            RepositoryProvider = repositoryProvider;
        }

        public IRepository<Movie> Movies { get { return GetStandardRepo<Movie>(); } }
        public IRepository<MoviesReview> MovieReviews { get { return GetStandardRepo<MoviesReview>(); } }
        protected IRepositoryProvider RepositoryProvider { get; set; }
        private MovieReviewDbContext DbContext { get; set; }

        public void Commit()
        {
            DbContext.SaveChanges();
        }

        protected void CreateDbContext()
        {
            DbContext = new MovieReviewDbContext();

            //Do not enable proxy entities
            DbContext.Configuration.ProxyCreationEnabled = false;

            //Load navigation property explicitly
            DbContext.Configuration.LazyLoadingEnabled = false;
            DbContext.Configuration.ValidateOnSaveEnabled = false;
        }

        private IRepository<T> GetStandardRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepositoryForEntityType<T>();
        }

        private T GetRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepository<T>();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbContext != null)
                {
                    DbContext.Dispose();
                }
            }
        }
    }
}
