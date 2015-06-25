//appJSTest
//Created self executing function with one global variable
(function (myapp) {
    myapp.isLocale = true;

    //loggin message in console
    //if locale is true
    myapp.log = function (msg) {
        if (myapp.isLocale) {
            console.log(msg);
        }
    };
})(window.myapp = window.myapp || {});