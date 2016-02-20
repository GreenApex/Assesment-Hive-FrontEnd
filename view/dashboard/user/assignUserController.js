'use strict';

deskControllers.controller('assignUserController', ['$scope', '$window', '$location', 'getTeamMembers', 'assignUsers', 'getAllUser',
    function ($scope, $window , $location, getTeamMembers, assignUsers, getAllUser) {


        var members = $location.search();

        $scope.members = [];
        $scope.users = [];
        $scope.removeUser = [];
        $scope.selectedUser = [];

        if(members){
            getAllData(members);
        }
        else{
            $.toaster("Session Error", 'Alert', 'danger');
        }

        function getAllData(members) {

            getTeamMembers.get({teamID:members.teamID},function (response) {
                if (response.status == 0) {


                    angular.forEach(response.data.members, function(value, key){
                        $scope.members.push({
                            memberID: value.memberID,
                            memberName: value.memberName
                        })
                    });

                    getAllUser.get(function (response) {
                        if (response.status == 0) {
                            angular.forEach(response.data, function(value, key){
                                $scope.users.push({
                                    memberID: value.userID,
                                    memberName: value.name
                                })
                            });
                            $("#loader").fadeOut("fast");

                        }
                        else {
                            $("#loader").fadeOut("fast");

                            $.toaster(response.message, 'Alert', 'warning');
                        }
                    }, function () {
                        $.toaster("Connection Error", 'Alert', 'danger');
                    });
                }
                else {
                    $("#loader").fadeOut("fast");

                    $.toaster(response.message, 'Alert', 'warning');
                }
            }, function () {
                $.toaster("Connection Error", 'Alert', 'danger');
            });


        }

        $scope.dragoverCallback = function (event, index, external, type) {
            $scope.logListEvent('dragged over', event, index, external, type);
            // Disallow dropping in the third row. Could also be done with dnd-disable-if.
            return index;
        };

        $scope.dropCallback = function (event, index, item, external, type, allowedType) {
            $scope.logListEvent('dropped at', event, index, external, type);
            if (external) {
                if (allowedType === 'itemType' && !item.label) return false;
                if (allowedType === 'containerType' && !angular.isArray(item)) return false;
            }
            return item;
        };

        $scope.logEvent = function (message, event) {
            console.log(message, '(triggered by the following', event.type, 'event)');
            console.log(event);
        };

        $scope.logListEvent = function (action, event, index, external, type) {
            var message = external ? 'External ' : '';
            message += type + ' element is ' + action + ' position ' + index;
            $scope.logEvent(message, event);
        };

        $scope.saveTemplate = function(){
            assignUsers.save({teamID:members.teamID},$scope.members,function(response){
                if (response.status == 0) {
                    $.toaster(response.message, 'Alert', 'success');
                    $window.location.reload();
                }
                else {
                    $.toaster(response.message, 'Alert', 'warning');
                }
            }, function () {
                $.toaster("Connection Error", 'Alert', 'danger');
            });
        }

    }]);