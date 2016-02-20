'use strict';

deskControllers.controller('reportsController', ['$scope', '$window',
    function ($scope, $window) {

        $("#loader").fadeOut();

        $scope.heading = "Landing Page...";

        $('.input-daterange').datepicker({
            todayBtn: "linked"
        });

        /*getKeyList.get(function(response){
         if(response.status == 0){
         $scope.keylist = response.data;
         }
         else{
         $.toaster(response.message, 'Alert', 'warning');
         }
         });*/



    }]);