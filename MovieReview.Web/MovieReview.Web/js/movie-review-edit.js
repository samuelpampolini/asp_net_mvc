//movie-review-edit.js

//Defined Module
var module = angular.module("movieReviewEdit", []);

//Defined Routes
module.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/editMovie/:Id", {
        controller: "movieEditController",
        templateUrl: "/templates/editMovie.html"
    });

    $routeProvider.otherwise({redirectTo: "/movies"})
}]);

var movieEditController = ["$scope", "dataServiceFactory", "$window", "$routeParams", function ($scope, dataServiceFactory, $window, $routeParams) {
    //Initialize movie and movie id
    $scope.movie = null;
    $scope.MovieId = null;

    //Fetch the Movie by id
    dataServiceFactory.getMovieById($routeParams.Id)
        .then(function (result) {
            //Success
            $scope.movie = result;
        }, function () {
            //Error
            toastr.error("Error Fetching Movie with Id:", $routeParams.Id);
        });

    $scope.editMovie = function () {
        dataServiceFactory.movieEdit($scope.movie)
            .then(function () {
                //Success
                toastr.success("Filme atualizado com sucesso.");
                $window.location = "#/movies";
            }, function () {
                //Error
                toastr.error("Erro ao atualizar o filme.")
            });
    };
}];

module.controller("movieEditController", movieEditController);