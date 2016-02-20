'use strict';

deskControllers.controller('taskAssignmentsController', ['$scope', '$window', '$cookies', 'getMyTask',
    function ($scope, $window, $cookies, getMyTask) {
        $("#loader").fadeOut();
        var userData = $cookies.getObject('userData');
        $scope.users = [];
        $scope.subCategories = "";
        $scope.categoryColor = "primary";
        $scope.showModal = false;
        getMyTasks();
        function getMyTasks() {
            //$scope.user = [];
            getMyTask.get({userID:userData.userID}, function (response) {
                    if(response.status == 0){
                        angular.forEach(response.data.categories, function (value, key) {
                            $scope.users.push({
                                id: value.catrgoryID,
                                name: value.catrgoryName,
                                description: value.description,
                            });
                        });
                        /*angular.forEach(response.data.principles, function (value, key) {
                            $scope.user.push({
                                id: value.principleID,
                                name: value.principleName,
                                description: value.description,
                            });
                        });*/
                    }
                else{

                    }
                console.log("user - " + JSON.stringify(response));
            });
        }
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
      /*  $scope.getMyTaskFunction =  function() {
            getMyTask.get({userID:userData.userID}, function (response) {
                if(response.status == 0){
                    angular.forEach(response.data.categories, function (value, key) {
                        $scope.users.push({
                            id: value.catrgoryID,
                            name: value.catrgoryName,
                            description: value.description,
                        });
                    });
                    $scope.categoryColor = "primary";
                    $scope.subCategories = "";
                    /!*angular.forEach(response.data.principles, function (value, key) {
                     $scope.user.push({
                     id: value.principleID,
                     name: value.principleName,
                     description: value.description,
                     });
                     });*!/
                }
                else{

                }
                console.log("user - " + JSON.stringify(response));
            });
        };*/
    }]);
