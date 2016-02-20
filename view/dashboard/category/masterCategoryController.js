 'use strict';

deskControllers.controller('masterCategoryController', ['$scope', '$window','$filter','$http', 'addCategory', 'getAllCategories', 'updateCategory', 'getCategoryByCategoryID', 'deleteCategory',
    function ($scope, $window, $filter, $http, addCategory, getAllCategories, updateCategory, getCategoryByCategoryID, deleteCategory) {


        $scope.heading = "Landing Page...";

        $scope.users = [];

        getAllData();

        $scope.saveUser = function (data, id) {

            $("#loader").fadeIn();

            //$scope.user not updated yet
            angular.extend(data, {id: id});



            updateCategory.save({categoryID: id}, {
                "catrgoryName": data.name,
                "description": data.description
            }, function (response) {
                $.toaster("Update Data Successfully", 'Congratulation', 'success');
                getCategoryByCategoryID.get({categoryID: id}, function (response) {
                    {
                        $("#loader").fadeOut();
                        return data = {
                            "id": response.data.categoryID,
                            "name": response.data.catrgoryName,
                            "description": response.data.description
                        }
                    }
                })
            });

            //return $http.post('/saveUser', data);
            //return data = angular.fromJson(data);

        };

        $scope.checkName = function (data, id) {
            if (data == '') {
                return "This field is required";
            }
        };

        // remove user
        $scope.removeUser = function (index) {
            $("#loader").fadeIn();
            deleteCategory.get({categoryID: index}, function (response) {
                {
                    $("#loader").fadeOut();
                    getAllData();
                }
            })

        };

        // add user
        $scope.addUser = function () {
            /*$scope.inserted = {
             id: $scope.users.length+1,
             name: $scope.userName,
             description: $scope.description
             };
             $scope.users.push($scope.inserted);*/
            $("#loader").fadeIn();
            addCategory.save({
                "catrgoryName": $scope.userName,
                "description": $scope.description
            }, function (response) {
                if (response.status == 0) {
                    /*getAllCategories.get(function (response) {
                     angular.forEach(response.data, function(value,key){
                     $scope.users.push({
                     id: value.categoryID,
                     name: value.catrgoryName,
                     description: value.description
                     });
                     });
                     console.log("user - "+JSON.stringify($scope.users));
                     $.toaster("Add Data Successfully", 'Congratulation', 'success');
                     });*/

                    getAllData();
                    $.toaster("Add Data Successfully", 'Congratulation', 'success');

                }
                else {
                    $.toaster(response.message, 'Congratulation', 'success');
                }
            }, function () {
                $.toaster("Connection Error", 'Alert', 'danger');
            });
            $scope.userName = "";
            $scope.description = "";
        };


        function getAllData() {

            $scope.users = [];

            getAllCategories.get(function (response) {
                $("#loader").fadeOut();
                angular.forEach(response.data, function (value, key) {
                    $scope.users.push({
                        id: value.catrgoryID,
                        name: value.catrgoryName,
                        description: value.description
                    });
                });
                console.log("user - " + JSON.stringify($scope.users));
            });
        }
    }]);