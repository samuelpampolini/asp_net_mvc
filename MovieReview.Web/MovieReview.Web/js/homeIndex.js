var myApp = angular.module('myApp', []);

var homeIndexController = function ($scope, $http) {
    $scope.count = 0;
    //empty collection
    $scope.data = [];

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
        });
}

myApp.controller("homeIndexController", homeIndexController)