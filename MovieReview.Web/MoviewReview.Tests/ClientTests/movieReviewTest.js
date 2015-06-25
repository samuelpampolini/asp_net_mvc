/// <reference path="../scripts/jasmine.js" />
/// <reference path="../../moviereview.web/scripts/angular.min.js" />
/// <reference path="../../moviereview.web/scripts/angular-ui-bootstrap.min.js" />
/// <reference path="../../moviereview.web/scripts/angular-route.min.js" />
/// <reference path="../../moviereview.web/scripts/angular-mocks.js" />
/// <reference path="../../moviereview.web/js/homeindex.js" />
/// <reference path="../../moviereview.web/js/movie-review-edit.js" />

describe("Movie Review Tests-->", function () {

    beforeEach(angular.mock.module('homeIndex'));

    //to test individual bits and bytes inside the movie-review-edit
    describe("dataService", function () {
        it("can load movie reviews", inject(function (dataServiceFactory) {
            //for the 1st Run
            expect(dataServiceFactory.reviews.length).toEqual(0);
        }));
    });

    var $httpBackend;
    var url = "/api/MovieReviews/1";

    var fakedMovieReviewsResponse = [{
            Id: 1,
            ReviewerName: "Rahul Sahay",
            ReviewerComments: "Awesome Movie. Looks very Nice!",
            ReviewerRating: 5,
            MovieId: 1
        },
        {
            Id: 2,
            ReviewerName: "Nivedita",
            ReviewerComments: "Looking Good. Nice One.Review Updated again",
            ReviewerRating: 4,
            MovieId: 1
        },
        {
            Id: 4,
            ReviewerName: "Tester",
            ReviewerComments: "Checking",
            ReviewerRating: 5,
            MovieId: 1
        },
        {
            Id: 5,
            ReviewerName: "Tester again",
            ReviewerComments: "testing",
            ReviewerRating: 5,
            MovieId: 1
        },
        {
            Id: 6,
            ReviewerName: "Tester Again",
            ReviewerComments: "Testing",
            ReviewerRating: 4,
            MovieId: 1
        }
    ];

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get("$httpBackend");
        $httpBackend.whenGET(url)
            .respond(fakedMovieReviewsResponse);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("Testing Movie Reviews GET Call", function () {
        it("Loaded Movie Reviews", inject(function (dataServiceFactory) {
            $httpBackend.expectGET(url);
            dataServiceFactory.getReviews(1);
            $httpBackend.flush();
            expect(dataServiceFactory.reviews.length).toEqual(5);
        }));
    });
});