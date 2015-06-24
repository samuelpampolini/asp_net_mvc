var module = angular.module("homeIndex", ["ngRoute", "ui.bootstrap", "movieReviewEdit"]);


module.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        controller: "homeIndexController",
        templateUrl: "/templates/home.html"
    });

    $routeProvider.when("/movies", {
        controller: "homeIndexController",
        templateUrl: "/templates/movies.html"
    });

    $routeProvider.when("/newMovie", {
        controller: "newMovieController",
        templateUrl: "/templates/newMovie.html"
    });

    $routeProvider.when("/reviews/:Id", {
        controller: "reviewsController",
        templateUrl: "/templates/reviews.html"
    });

    $routeProvider.when("/newReview/:Id", {
        controller: "newReviewController",
        templateUrl: "/templates/newReview.html"
    });

    $routeProvider.when("/editReview/:Id", {
        controller: "reviewEditController",
        templateUrl: "/templates/editReview.html"
    });

    //Default back to home page, if couldn't find the path specified
    $routeProvider.otherwise({ redirectoTo: "/" });
}]);

module.factory("dataServiceFactory", ["$http", "$q", function ($http, $q) {
    var _movies = [];
    var _reviews = [];

    var _getMovies = function () {
        var deferred = $q.defer();
        $http.get("/api/movies")
        .then(function (result) {
            //Success
            //angular.copy copies the collection from source to destination
            angular.copy(result.data, _movies);
            deferred.resolve();
        }, function () {
            //Error
            deferred.reject();
        });

        return deferred.promise;
    };

    var _getMovieById = function (Id) {
        var deferred = $q.defer();
        $http.get("/api/movies/" + Id)
            .then(function (result) {
                //Success
                //result.data will return the data back to the caller
                deferred.resolve(result.data);
            }, function () {
                //Error
                deferrer.reject();
            })

        return deferred.promise;
    };

    var _movieEdit = function (movie) {
        var deferred = $q.defer();
        $http.put("/api/movies", movie)
            .then(function () {
                //Success
                deferred.resolve();
            }, function () {
                //Error
                deferred.reject();
            });

        return deferred.promise;
    };

    var _removeMovie = function (Id) {
        var deferred = $q.defer();
        $http.delete("/api/movies/" + Id)
            .then(function () {
                //Success
                deferred.resolve();
            }, function () {
                //Error;
                deferred.reject();
            });
        return deferred.promise;
    };

    var _getReviews = function (Id) {
        var deferred = $q.defer();

        $http.get("/api/MovieReviews/" + Id)
            .then(function (result) {
                //Success
                angular.copy(result.data, _reviews);
                deferred.resolve();
            }, function () {
                //Error
                deferred.reject();
            });

        return deferred.promise;
    };

    var _getReviewById = function (Id) {
        var deferred = $q.defer();
        _getReviews(Id)
            .then(function () {
                //success
                if (_reviews) {
                    deferred.resolve(_reviews);
                } else {
                    deferred.reject();
                }
            }, function () {
                //Error
                deferred.reject();
            });

        return deferred.promise;
    };

    var _addReview = function (MovieId, newReview) {
        var deferred = $q.defer();

        $http.post("/api/MovieReviews/" + MovieId, newReview)
            .then(function () {
                //Success
                deferred.resolve();
            }, function () {
                //Error
                deferred.reject();
            });

        return deferred.promise;
    };

    var _getReviewByReviewerId = function (Id) {
        var deferred = $q.defer();

        $http.get("/api/Lookups/getbyreviewerid?id=" + Id)
            .then(function (result) {
                deferred.resolve(result.data);
            }, function () {
                deferred.reject();
            });

        return deferred.promise;
    };

    var _updateReview = function (review) {
        var deferred = $q.defer();

        $http.put("/api/MovieReviews/", review)
            .then(function () {
                //Success
                deferred.resolve();
            }, function () {
                //Error
                deferred.reject();
            });

        return deferred.promise;
    };

    var _removeReview = function (Id) {
        var deferred = $q.defer();

        $http.delete("/api/MovieReviews/" + Id)
            .then(function () {
                //Success
                deferred.resolve();
            }, function () {
                //Error
                deferred.reject();
            });

        return deferred.promise;
    };

    //make available below properties for other parts of angular to use
    return {
        movies: _movies,
        getMovies: _getMovies,
        getMovieById: _getMovieById,
        movieEdit: _movieEdit,
        removeMovie: _removeMovie,
        getReviews: _getReviews,
        getReviewById: _getReviewById,
        addReview: _addReview,
        getReviewByReviewerId: _getReviewByReviewerId,
        updateReview: _updateReview,
        removeReview: _removeReview
    };
}]);

var homeIndexController = ["$scope", "$http", "dataServiceFactory", function ($scope, $http, dataServiceFactory) {
    $scope.count = 0;
    //empty collection
    $scope.data = dataServiceFactory;

    //Making Spinner On
    $("#loader").show();

    dataServiceFactory.getMovies()
        .then(function (result) {
            //Success
            toastr.success("Filmes carregados com sucesso.")
        }, function () {
            //Error
            //To Do: Will change logging technique later using toastr lib
            toastr.success("Erro ao carregar os filmes")
        }).then(function () {
            $("#loader").hide();
        });
}];

var newMovieController = ["$scope", "$http", "$window", function ($scope, $http, $window) {
    $scope.newMovie = {};
    $scope.save = function () {

        $http.post("/api/movies", $scope.newMovie)
            .then(function (result) {
                var newMovie = result.data;
                toastr.success("Filme salvo com sucesso!");

                //once saved succssfully return tothe movies page
                $window.location = "#/movies";
            }, function () {
                toastr.error("Não foi possível salvar o filme.")
            });

        toastr.success("Filme salvo com sucesso!");
    };
}];

var reviewsController = ["$scope", "$routeParams", "$window", "dataServiceFactory", function ($scope, $routeParams, $window, dataServiceFactory) {
    $scope.reviews = null;
    $scope.MovieId = null;

    $("#loader").show();

    dataServiceFactory.getReviewById($routeParams.Id)
        .then(function (review) {
            //Success
            //For pagination
            $scope.currentPage = 1;
            $scope.numPerPage = 4;
            $scope.maxSize = 5;

            $scope.numPages = function () {
                return Math.ceil(review.length / $scope.numPerPage);
            };

            $scope.$watch("currentPage + numPerPage", function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;
                $scope.filteredReviews = review.slice(begin, end);
            });

            $scope.reviews = review;
            $scope.MovieId = $routeParams.Id;
            toastr.success("Reviews carregados com sucesso.")
        }, function () {
            //Error
            toastr.error("Erro ao carregar os reviews.");
        })
        .then(function () {
            $("#loader").hide();
        });
}];

var newReviewController = ["$scope", "$routeParams", "$window", "dataServiceFactory", function ($scope, $routeParams, $window, dataServiceFactory) {
    $scope.ReviewerRating = 3;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.MovieId = null;
    $scope.newReview = {};

    $scope.cancelReview = function () {
        $window.history.back();
    };

    $scope.saveReview = function () {
        dataServiceFactory.addReview($routeParams.Id, $scope.newReview)
            .then(function () {
                //Success
                toastr.success("Obrigado pelo seu feedback!");
                $window.location = "#/movies";
            }, function () {
                //Error
                toastr.error("Não foi possível savar o novo review.");
            });
    };
}];

var reviewEditController = ["$scope", "dataServiceFactory", "$window", "$routeParams", function ($scope, dataServiceFactory, $window, $routeParams) {
    $scope.review = null;
    $scope.newReview = {};

    //Fetching the Review by id and setting $scope.review
    dataServiceFactory.getReviewByReviewerId($routeParams.Id)
        .then(function (result) {
            $scope.review = result;
        }, function () {
            toastr.error("Não foi possível recuperar o review.")
        });

    //Edditing the Review
    $scope.editReview = function () {
        dataServiceFactory.updateReview($scope.review)
            .then(function () {
                //success
                toastr.success("Review atualizado com sucesso.");
                $window.location = "#/movies";
            }, function () {
                //error
                toastr.error("Erro ao salvar o review.");
            });
    };

    //Deleting the review
    $scope.deleteReview = function () {
        dataServiceFactory.removeReview($scope.review.Id)
            .then(function () {
                //Success
                toastr.success("Review excluído com sucesso.");
                $window.location = "#/movies";
            }, function () {
                //Error
                toastr.error("Erro ao excluir o review de Id: " + $scope.review.Id);
            });
    };
}];

module.controller('homeIndexController', homeIndexController);
module.controller('newMovieController', newMovieController);
module.controller('reviewsController', reviewsController);
module.controller('newReviewController', newReviewController);
module.controller('reviewEditController', reviewEditController);