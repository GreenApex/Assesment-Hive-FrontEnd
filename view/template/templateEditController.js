'use strict';

deskControllers.controller('templateEditController', ['$scope', '$window', 'getAllTemplates', 'getTemplateByTemplateID', 'getAllCategories', 'getAllPrincipal', 'getAllQuestionnarie', 'updateTemplate',
    function ($scope, $window, getAllTemplates, getTemplateByTemplateID, getAllCategories, getAllPrincipal, getAllQuestionnarie, updateTemplate) {



        $scope.categories = [];
        $scope.principle = [];
        $scope.question = [];

        $scope.templateName = "";
        $scope.templateID = "";

        $scope.removeCategories = [];
        $scope.removePrinciple = [];
        $scope.removeQuestion = [];

        $scope.selectedCategories = [];

        $scope.transformForm = true;

        getAllTemplates.get(function (response) {
            $("#loader").fadeOut();
            if(response.status == 0){
                $scope.templateData = response.data;
                getAllPrincipal.get(function (response) {

                    if (response.status == 0) {

                        angular.forEach(response.data, function(value, key){
                            $scope.principle.push({
                                principleID: value.principleID,
                                principleName: value.principleName,
                                questionnaireList: []
                            })
                        })

                        getAllQuestionnarie.get(function (response) {

                            if (response.status == 0) {
                                angular.forEach(response.data, function(value, key){
                                    $scope.question.push({
                                        qID: value.questionnaireID,
                                        name: value.questionnaire,
                                    })
                                })
                            }
                            else {
                                $.toaster(response.message, 'Alert', 'warning');
                            }
                        }, function () {
                            $.toaster("Connection Error", 'Alert', 'danger');
                        });


                    }
                    else {
                        $.toaster(response.message, 'Alert', 'warning');
                    }
                }, function () {
                    $.toaster("Connection Error", 'Alert', 'danger');
                });
            }
            else{
                $.toaster(response.message, 'Alert', 'warning');
            }
        },function () {
            $("#loader").fadeOut();
            $.toaster("Connection Error", 'Alert', 'danger');
        });


        $scope.getTemplateByTemplateID = function(tempId){
            $("#loader").fadeIn();
            getTemplateByTemplateID.save({templateID:tempId}, {

            },function(response){
                $("#loader").fadeOut();
                if (response.status == 0) {
                    $scope.templateName = response.data.templateName;
                    $scope.templateID = response.data.templateID;
                    $scope.transformForm = false;
                    $scope.selectedCategories = response.data.categoryList;
                    $.toaster(response.message, 'Alert', 'success');
                }
                else {
                    $.toaster(response.message, 'Alert', 'warning');
                }
            }, function () {
                $("#loader").fadeOut();
                $.toaster("Connection Error", 'Alert', 'danger');
            });
        }

        $scope.saveTemplate = function(){
            $("#loader").fadeIn();
            updateTemplate.save({"templateID":$scope.templateID},{
                "templateID":$scope.templateID,
                "templateName": $scope.templateName,
                "categoryList": $scope.selectedCategories
            },function(response){
                $("#loader").fadeOut();
                if (response.status == 0) {
                    $.toaster(response.message, 'Alert', 'success');
                    $window.location.reload();
                }
                else {
                    $.toaster(response.message, 'Alert', 'warning');
                }
            }, function () {
                $("#loader").fadeOut();
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


    }]);