'use strict';
//bootstrap ng-app="myApp"
angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
});
//module for myApp decide route/controller/service/directive
var deskApp = angular.module('myApp', ['ngRoute', 'myControllers', 'myServices', 'dndLists']);

deskApp.constant('webAppConstant', 'http://54.172.65.114:8080/PrjMRI/filter/');

deskApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'view/home/home.html',
                controller: 'homeController',
                access: {
                    requiresBackground: true
                },
                resolve: {
                    // I will cause a 1 second delay
                    delay: function($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 1000);
                        return delay.promise;
                    }
                }
            }).
            when('/login', {
                templateUrl: 'view/login/login.html',
                controller: 'loginController'
            }).
            when('/templateForm', {
                templateUrl: 'view/templateForm/templateForm.html',
                controller: 'templateFormController',
                access: {
                    requiresBackground: false,
                    //requiredPermissions: ['Admin', 'User'],
                    //permissionType: 'AtLeastOne'
                }
            }).
            otherwise({
                redirectTo: '/home'
            });
        //$locationProvider.html5Mode(true); //For Remove #
    }])
    .run(function ($rootScope, $location) {
            $rootScope.$on('$routeChangeStart', function (event, next) {

                if (next.access.requiresBackground !== undefined) {
                    if (next.access.requiresBackground === false) {
                        $("#pageWrapper").fadeOut();
                    }
                    else{
                        $("#pageWrapper").fadeIn();
                    }
                }
                /*var authorised;
                if (next.access !== undefined) {
                    authorised = authorization.authorize(next.access.loginRequired,
                        next.access.permissions,
                        next.access.permissionCheckType);
                    if (authorised === jcs.modules.auth.enums.authorised.loginRequired) {
                        $location.path(jcs.modules.auth.routes.login);
                    } else if (authorised === jcs.modules.auth.enums.authorised.notAuthorised) {
                        $location.path(jcs.modules.auth.routes.notAuthorised).replace();
                    }
                }*/
            });
        });


    /*.run(function ($rootScope, $location, getSession, removeSession) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            getSession.get(function (results) {
                if (results.userName) {
                    $rootScope.authenticated = true;

                    if(results.userType == "user"){
                        var currentUrl = next.$$route.originalPath;
                        if (currentUrl == '/addEditEvent') {
                            $location.path("/home");
                        }
                        else if (currentUrl == '/addEditProduct') {
                            $location.path("/home");
                        }
                        if (currentUrl == '/login') {
                            $location.path("/home");
                        }
                    }
                    else if(results.userType == "vendor"){
                        /!*var currentUrl = next.$$route.originalPath;
                        if (currentUrl == '/productList') {
                            $location.path("/home");
                        }
                        else if (currentUrl == '/productDetail') {
                            $location.path("/home");
                        }
                        if (currentUrl == '/login') {
                            $location.path("/home");
                        }*!/

						removeSession.get(function (response) {
							$.toaster('Vandor not allow Try with user', 'Alert', 'danger');
							$location.path("/login");
							$("#loader").fadeOut();
						});
                    }

                    /!*if (results.lattitude != "" && results.longitude != "") {
                        var currentUrl = next.$$route.originalPath;
                        if (currentUrl == '/userProfile') {
                            $location.path("/productList?searchkey=&cuisine=&ingredient=&type=&nearBy=");
                        }
                    }
                    else {
                        $location.path("/productList?searchkey=&cuisine=&ingredient=&type=&nearBy=");
                    }*!/
                }
                else {
                    var nextUrl = next.$$route.originalPath;

                    if (nextUrl == '/login' || nextUrl == '/home') {
                    }
                    else {
                        $location.path("/login");
                    }
                }
            });
        });
    });*/

/*deskApp.animation('.repeat-animation', [function () {
    return {
        // make note that other events (like addClass/removeClass)
        // have different function input parameters
        enter: function (element, doneFn) {
            jQuery(element).fadeIn(5000, doneFn);

            // remember to call doneFn so that angular
            // knows that the animation has concluded
        },

        move: function (element, doneFn) {
            jQuery(element).fadeIn(5000, doneFn);
        },

        leave: function (element, doneFn) {
            jQuery(element).fadeOut(5000, doneFn);
        }
    }
}]);*/


var deskControllers = angular.module('myControllers', []);

var deskServices = angular.module('myServices', ['ngResource']);
  
  
