var module = angular.module("homeIndex", ["ngRoute"]);


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

var homeIndexController = ["$scope", "$http", function ($scope, $http) {
    $scope.count = 0;
    //empty collection
    $scope.data = [];

    //Making Spinner On
    $("#loader").show();

    //API Call
    $http.get("/api/movies")
        .then(function (result) {
            //Success
            //angular.copy copies the collection from source to destination
            angular.copy(result.data, $scope.data);
        }, function () {
            //Error
            //To Do: Will change logging technique later using toastr lib
            console.log("Couldn't Fetch the Data");
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