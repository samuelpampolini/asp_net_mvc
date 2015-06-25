/// <reference path="../scripts/jasmine.js" />
/// <reference path="../../MovieReview.Web/js/appJSTest.js" />

describe("myapp tests -->", function () {
    //it is sub grouping or group of tests
    it("isDebug", function () {
        expect(myapp.isLocale).toEqual(true);
    });

    it("log", function () {
        expect(myapp.log).toBeDefined();
    });
});