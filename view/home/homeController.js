'use strict';

deskControllers.controller('homeController', ['$scope', '$window',
    function ($scope, $window) {

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