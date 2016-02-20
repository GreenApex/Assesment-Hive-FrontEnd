'use strict';

deskControllers.controller('masterTeamController', ['$scope', '$window', 'addTeam', 'getAllTeam', 'updateTeam', 'getTeamByID', 'deleteTeam', '$cookies',
    function ($scope, $window, addTeam, getAllTeam, updateTeam, getTeamByID, deleteTeam, $cookies) {

        $scope.users = [];

        var userData = $cookies.getObject('userData');

        if (userData) {
            getAllData();
            $scope.teamOwner = userData.name
        }
        else {
            $scope.userData = true;
        }




        $scope.saveUser = function (data, id) {
            $("#loader").fadeIn();
            angular.extend(data, {id: id});
            updateTeam.save({teamID: id}, {
                "teamName": data.name,
                "description": data.description
            }, function (response) {
                $.toaster("Update Data Successfully", 'Congratulation', 'success');
                getTeamByID.get({teamID: id}, function (response) {
                    {
                        $("#loader").fadeOut();
                        return data = {
                            "id": response.data.teamID,
                            "name": response.data.teamName,
                            "description": response.data.description
                        }
                    }
                })
            });
        };

        $scope.checkName = function (data, id) {
            if (data == '') {
                return "This field is required";
            }
        };

        // remove user
        $scope.removeUser = function (index) {
            $("#loader").fadeIn();
            deleteTeam.get({teamID: index}, function (response) {
                {
                    $("#loader").fadeOut();
                    getAllData();
                }
            })
        };

        $scope.assignUser = function (index) {


        };

        // add user
        $scope.addUser = function () {
            $("#loader").fadeIn();
            addTeam.save({
                "teamName": $scope.userName,
                "teamOwnerID": userData.userID
            }, function (response) {
                if (response.status == 0) {
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

            getAllTeam.get(function (response) {
                $("#loader").fadeOut();
                angular.forEach(response.data, function (value, key) {
                    $scope.users.push({
                        id: value.teamID,
                        name: value.teamName,
                        teamOwnerID: value.teamOwnerID,
                        membersID: value.membersID
                    });
                });
                console.log("user - " + JSON.stringify($scope.users));
            });
        }
    }]);