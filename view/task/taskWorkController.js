'use strict';

deskControllers.controller('taskWorkController', ['$scope', '$window', 'getAllCategories',
    function ($scope, $window, getAllCategories) {

        $("#loader").fadeOut();

        $scope.categories = [];
        $scope.subCategories = "";
        $scope.categoryColor = "primary";
        $scope.showModal = false;


        getAllCategories.get(function (response) {
            $scope.categories = response.data
        });

        $scope.categoryChange = function (value) {
            //alert(JSON.stringify(value));
            //$scope.categories == "" ? $scope.categoryColor = "primary" : $scope.categoryColor = "danger";
           /* if(value[0].catrgoryName !== undefined){
                $scope.subCategories = "";
                $scope.showModal = false
            }
            else{
                $scope.subCategories = value;
                $scope.showModal = true
            }
            $scope.categories = value*/
            $scope.showModal = true
        };

        $scope.getCategoriesFunction =  function() {
            getAllCategories.get(function (response) {
                $scope.categories = response.data;
                $scope.categoryColor = "primary";
                $scope.subCategories = "";
            });
        };


    }]);