'use strict';

deskControllers.controller('loginController', ['$scope', '$window', 'login', '$cookies',
    function ($scope, $window, login, $cookies) {

        $("#loader").fadeOut();

        $scope.loginFunction = function(){
            $("#loader").fadeIn();
            login.get({email: $scope.userID, password: $scope.password},function(response){
                if(response.status == 0){
                    $("#loader").fadeOut();
                    $cookies.putObject('userData',response.data);
                    $.toaster("Login Successfully", 'Congratulation', 'success');
                    $window.location.href = "#/dashboard"
                }
                else{
                    $("#loader").fadeOut();
                    $.toaster("Authentication Problem", 'Alert', 'warning');
                }
            },function(){
                $("#loader").fadeOut();
                $.toaster("Connection Problem ", 'Alert', 'danger');
            });
        }
    }]);