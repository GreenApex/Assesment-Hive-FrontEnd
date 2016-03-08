'use strict';
//bootstrap ng-app="myApp"
angular.element(document).ready(function () {
    angular.bootstrap(document, ['myApp']);
});
//module for myApp decide route/controller/service/directive
var deskApp = angular.module('myApp', ['ngCookies','ngRoute', 'myControllers', 'myServices', 'dndLists', 'xeditable', 'high-chart', 'angularTreeview']);

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
            /*.when('/templateAllDisplay', {
                templateUrl: 'view/template/templateAllDisplay.html',
                controller: 'templateAllDisplayController',
                access: {
                    requiresBackground: false,
                }
            })*/
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
        });

    });

var deskControllers = angular.module('myControllers', []);

var deskServices = angular.module('myServices', ['ngResource']);
  
  
