'use strict';

deskControllers.controller('registerUserController', ['$scope', '$window','$filter','$http', 'registerUser', 'getAllRegisterUser','deleteUsers',
    function ($scope, $window, $filter, $http, registerUser, getAllRegisterUser, deleteUsers)  {

        $scope.heading = "Landing Page...";

        $scope.users = [];

        getAllRegisterUsers();

        // Register user
        $scope.registerUser = function () {
            $("#loader").fadeIn();
            registerUser.save({
                "name": $scope.userName,
                "email": $scope.userEmail,
                "password": $scope.userPassword
            }, function (response) {
                $("#loader").fadeOut();
                if (response.status == 0) {
                    getAllRegisterUsers();
                    $.toaster("Register User Successfully", 'Congratulation', 'success');
                }
                else {
                    $.toaster(response.message, 'Alert', 'warning');
                }
            }, function () {
                $("#loader").fadeOut();
                $.toaster("Connection Error", 'Alert', 'danger');
            });
            $scope.userName = "";
            $scope.userEmail = "";
            $scope.userPassword = "";
        };

        $scope.removeUser = function (email) {
            $("#loader").fadeIn();
            deleteUsers.get({
                "email": email,
            }, function (response) {
                $("#loader").fadeOut();
                if (response.status == 0) {
                    getAllRegisterUsers();
                    $.toaster("Delete User Successfully", 'Congratulation', 'success');
                }
                else {
                    $.toaster(response.message, 'Alert', 'warning');
                }
            }, function () {
                $("#loader").fadeOut();
                $.toaster("Connection Error", 'Alert', 'danger');
            });

        };


        function  getAllRegisterUsers() {

            $scope.users = [];

            getAllRegisterUser.get(function (response) {
                $("#loader").fadeOut();
                angular.forEach(response.data, function (value, key) {
                    $scope.users.push({
                        userID: value.userID,
                        name: value.name,
                        email: value.email,
                        password: value.password,
                        acitve: value.acitve
                    });
                });
                console.log("user - " + JSON.stringify($scope.users));
            });
        }
    }]);
