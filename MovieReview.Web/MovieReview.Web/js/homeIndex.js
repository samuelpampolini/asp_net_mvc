var module = angular.module("homeIndex", ["ngRoute"]);


module.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        controller: "homeIndexController",
        templateUrl: "/templates/home.html"
    });

    //Default back to home page, if couldn't find the path specified
    $routeProvider.otherwise({ redirectoTo: "/" });
}]);

var homeIndexController = function ($scope, $http) {
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

}

module.controller('homeIndexController', homeIndexController)