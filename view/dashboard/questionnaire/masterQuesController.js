'use strict';

deskControllers.controller('masterQuesController', ['$scope', '$window', '$filter', '$http', 'addQuestionnaire', 'getAllQuestionnarie', 'updateQuestionnaire', 'getQuestionnarieID', 'deleteQuestionnaire',
    function ($scope, $window, $filter, $http, addQuestionnaire, getAllQuestionnarie, updateQuestionnaire, getQuestionnarieID, deleteQuestionnaire) {

        $scope.heading = "Landing Page...";
        $scope.users = [];

        getAllData();

        $scope.saveUser = function (data, id) {
            angular.extend(data, {id: id});
            $("#loader").fadeIn();
            updateQuestionnaire.save({questionnaireID: id}, {
                "questionnaireID": id,
                "questionnaire": data.name,
                "description": data.description
            }, function (response) {
                $.toaster("Update Data Successfully", 'Congratulation', 'success');
                getQuestionnarieID.get({questionnaireID: id}, function (response) {
                    {
                        $("#loader").fadeOut();
                        return data = {
                            "id": response.data.questionnaireID,
                            "name": response.data.questionnaire,
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
            deleteQuestionnaire.get({qid: index}, function (response) {
                {
                    $("#loader").fadeOut();
                    getAllData();
                }
            })
        };

        // add user
        $scope.addUser = function () {
            $("#loader").fadeIn();
            addQuestionnaire.save({
                "questionnaire": $scope.userName,
                "description": $scope.description
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
            getAllQuestionnarie.get(function (response) {
                $("#loader").fadeOut();
                angular.forEach(response.data, function (value, key) {
                    $scope.users.push({
                        id: value.questionnaireID,
                        name: value.questionnaire,
                        description: value.description
                    });
                });
                console.log("user - " + JSON.stringify($scope.users));
            });
        }
    }]);