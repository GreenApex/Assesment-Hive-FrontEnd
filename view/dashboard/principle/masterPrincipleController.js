'use strict';

deskControllers.controller('masterPrincipleController', ['$scope', '$window', '$filter', '$http', 'addPrincipal', 'getAllPrincipal', 'updatePrincipal', 'getPrincipalByPrincipalID', 'deletePrinciple',
    function ($scope, $window, $filter, $http, addPrincipal, getAllPrincipal, updatePrincipal, getPrincipalByPrincipalID, deletePrinciple) {


        $scope.heading = "Landing Page...";

        $scope.users = [];

        getAllData();

        $scope.saveUser = function (data, id) {

            //$scope.user not updated yet
            angular.extend(data, {id: id});

            $("#loader").fadeIn();

            updatePrincipal.save({principalID: id}, {
                "principleName": data.name,
                "description": data.description
            }, function (response) {
                $.toaster("Update Data Successfully", 'Congratulation', 'success');
                getPrincipalByPrincipalID.get({principalID: id}, function (response) {
                    {
                        $("#loader").fadeOut();
                        return data = {
                            "id": response.data.principleID,
                            "name": response.data.principleName,
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
            deletePrinciple.get({principleid: index}, function (response) {
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
            addPrincipal.save({
                "principleName": $scope.userName,
                "description": $scope.description
            }, function (response) {
                if (response.status == 0) {
                    /*getAllPrincipal.get(function (response) {
                     angular.forEach(response.data, function(value,key){
                     $scope.users.push({
                     id: value.principleID,
                     name: value.principleName,
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

            getAllPrincipal.get(function (response) {
                $("#loader").fadeOut();
                angular.forEach(response.data, function (value, key) {
                    $scope.users.push({
                        id: value.principleID,
                        name: value.principleName,
                        description: value.description
                    });
                });
                console.log("user - " + JSON.stringify($scope.users));
            });
        }
    }]);