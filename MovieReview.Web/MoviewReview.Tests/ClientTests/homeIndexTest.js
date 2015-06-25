/// <reference path="../scripts/jasmine.js" />
/// <reference path="../../moviereview.web/scripts/angular.min.js" />
/// <reference path="../../moviereview.web/scripts/angular-ui-bootstrap.min.js" />
/// <reference path="../../moviereview.web/scripts/angular-route.min.js" />
/// <reference path="../../moviereview.web/scripts/angular-mocks.js" />
/// <reference path="../../moviereview.web/js/homeindex.js" />
/// <reference path="../../moviereview.web/js/movie-review-edit.js" />

describe("home-Index Tests-->", function () {

    beforeEach(angular.mock.module('homeIndex'));

    //to test individual bits and bytes inside the home-Index
    describe("dataService-->", function () {

        it("can load movies", inject(function (dataServiceFactory) {
            //for the 1st Run
            expect(dataServiceFactory.movies.length).toEqual(0);
        }));
    });
});