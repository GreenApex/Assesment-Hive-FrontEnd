'use strict';
//bootstrap ng-app="myApp"
angular.element(document).ready(function () {
    angular.bootstrap(document, ['myApp']);
});
//module for myApp decide route/controller/service/directive
var deskApp = angular.module('myApp', ['ngCookies','ngRoute', 'myControllers', 'myServices', 'dndLists', 'xeditable','high-chart']);

deskApp.constant('webAppConstant', 'http://192.168.0.107:8080/Asad/');

deskApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'view/home/home.html',
                controller: 'homeController',
                access: {
                    requiresBackground: true
                }/*,
                resolve: {
                    // I will cause a 1 second delay
                    delay: function ($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 1000);
                        return delay.promise;
                    }
                }*/
            })
            .when('/login', {
                templateUrl: 'view/login/login.html',
                controller: 'loginController',
                access: {
                    requiresBackground: true
                }
            })
            .when('/templateCreate', {
                templateUrl: 'view/template/templateCreate.html',
                controller: 'templateCreateController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/templateEdit', {
                templateUrl: 'view/template/templateEdit.html',
                controller: 'templateEditController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/assessmentForm', {
                templateUrl: 'view/assessment/assessmentForm.html',
                controller: 'assessmentFormController',
                access: {
                    requiresBackground: false,
                    //requiredPermissions: ['Admin', 'User'],
                    //permissionType: 'AtLeastOne'
                }
            })
            .when('/masterCategory', {
                templateUrl: 'view/dashboard/category/masterCategory.html',
                controller: 'masterCategoryController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/masterPrinciple', {
                templateUrl: 'view/dashboard/principle/masterPrinciple.html',
                controller: 'masterPrincipleController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/masterQues', {
                templateUrl: 'view/dashboard/questionnaire/masterQues.html',
                controller: 'masterQuesController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/masterTeam', {
                templateUrl: 'view/dashboard/team/masterTeam.html',
                controller: 'masterTeamController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/assignUser', {
                templateUrl: 'view/dashboard/user/assignUser.html',
                controller: 'assignUserController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/registerUser', {
                templateUrl: 'view/dashboard/user/registerUser.html',
                controller: 'registerUserController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/reports', {
                templateUrl: 'view/reports/reports.html',
                controller: 'reportsController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/rating', {
                templateUrl: 'view/reports/reating.html',
                controller: 'reatingController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/taskAssignment', {
                templateUrl: 'view/task/taskAssignment.html',
                controller: 'taskAssignmentController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/taskAssignments', {
                templateUrl: 'view/assessment/taskAssignments.html',
                controller: 'taskAssignmentsController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/taskWork', {
                templateUrl: 'view/task/taskWork.html',
                controller: 'taskWorkController',
                access: {
                    requiresBackground: false,
                }
            })
            .when('/dashboard', {
                templateUrl: 'view/dashboard/dashboard.html',
                controller: 'dashboardController',
                access: {
                    requiresBackground: false,
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
        //$locationProvider.html5Mode(true); //For Remove #
    }])
    .run(function ($rootScope, $location, editableOptions, $cookies) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        $rootScope.$on('$routeChangeStart', function (event, next) {

            $("#loader").fadeIn();
            var userData = $cookies.getObject('userData');

            $rootScope.authenticated = false;
            if (userData) {
                $rootScope.authenticated = true;

            }
            else {
                var nextUrl = next.$$route.originalPath;

                if (nextUrl == '/login' || nextUrl == '/home') {
                }
                else {
                    $location.path("/login");
                }
            }

            if (next.access.requiresBackground !== undefined) {
                if (next.access.requiresBackground === false) {
                    $("#pageWrapper").fadeOut();
                }
                else {
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
  
  
