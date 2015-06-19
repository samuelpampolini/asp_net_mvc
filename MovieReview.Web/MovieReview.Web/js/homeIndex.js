var module = angular.module("homeIndex", ["ngRoute", "ui.bootstrap"]);


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

    //Default back to home page, if couldn't find the path specified
    $routeProvider.otherwise({ redirectoTo: "/" });
}]);

module.factory("dataServiceFactory", ["$http", "$q", function ($http, $q) {
    var _movies = [];

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

    //make available below properties for other parts of angular to use
    return {
        movies: _movies,
        getMovies: _getMovies
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

module.controller('homeIndexController', homeIndexController);
module.controller('newMovieController', newMovieController);