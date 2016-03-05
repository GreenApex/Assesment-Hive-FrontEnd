'use strict';

deskControllers.controller('dashboardController', ['$scope', '$window', '$cookies', 'getCounts',
    function ($scope, $window, $cookies, getCounts) {

        var userData = $cookies.getObject('userData');

        if (userData) {
            console.log(JSON.stringify(userData));
            getAllData();
        }
        else {
            $.toaster('User ID Not Found', 'Alert', 'danger');
        }

        function getAllData() {
            getCounts.get({userID:userData.userID},function (response) {
                $("#loader").fadeOut();
                if (response.status == 0) {
                    $scope.counterData = response.data
                }
                else {
                    $.toaster(response.message, 'Alert', 'danger');
                }
            });
        }
    }]);