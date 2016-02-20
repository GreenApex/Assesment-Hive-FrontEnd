'use strict';

deskControllers.controller('dashboardController', ['$scope', '$window', '$cookies',
    function ($scope, $window, $cookies) {

        $("#loader").fadeOut();

        $scope.heading = "Landing Page...";

        /*getKeyList.get(function(response){
         if(response.status == 0){
         $scope.keylist = response.data;
         }
         else{
         $.toaster(response.message, 'Alert', 'warning');
         }
         });*/



    }]);