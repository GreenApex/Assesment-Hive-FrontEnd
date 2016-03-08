'use strict';

deskControllers.controller('taskAssignmentController', ['$scope', '$window', 'getAllTemplates', 'getAllPrincipal', 'getAllQuestionnarie', 'getAllUser', 'assignTask',
    function ($scope, $window, getAllTemplates, getAllPrincipal, getAllQuestionnarie, getAllUser, assignTask) {

        $scope.taskList = [];
        $scope.users = [];

        $scope.categories = [];
        $scope.principle = [];
        $scope.question = [];
        $scope.templateData = [];

        $scope.removeUser = [];
        $scope.selectedCategories = [];
        $scope.selectedPrinciple = [];
        $scope.selectedQuestion = [];

        getAllTemplates.get(function (response) {
            //$("#loader").fadeIn();
            if (response.status == 0) {
                //$scope.templateData = response.data;
                angular.forEach(response.data, function (templateValue, templateKey) {
                    $scope.categories = [];
                    angular.forEach(templateValue.categoryList, function (categoryValue, categoryKey) {
                        $scope.principle = [];
                        angular.forEach(categoryValue.principleList, function (principleValue, principleKey) {
                            $scope.question = [];
                            angular.forEach(principleValue.questionnaireList, function (QueValue, QueKey) {
                                $scope.question.push({
                                    qID: QueValue.qID,
                                    name: QueValue.name,
                                    comment: QueValue.comment,
                                    rating: QueValue.rating,
                                    principleName: principleValue.principleName,
                                    categoryName: categoryValue.catergoryName,
                                    templateName: templateValue.templateName
                                });
                            });
                            $scope.principle.push({
                                principleID: principleValue.principleID,
                                principleName: principleValue.principleName,
                                catergoryName: categoryValue.catergoryName,
                                templateName: templateValue.templateName,
                                questionnaireList: $scope.question

                            });
                        });
                        $scope.categories.push({
                            catergoryID: categoryValue.catergoryID,
                            catergoryName: categoryValue.catergoryName,
                            templateName: templateValue.templateName,
                            principleList: $scope.principle

                        });
                    });
                    $scope.templateData.push({
                        templateID: templateValue.templateID,
                        templateName: templateValue.templateName,
                        categoryList: $scope.categories
                    });
                });
                console.log(JSON.stringify($scope.templateData));
                getAllUser.get(function (response) {
                    $("#loader").fadeOut("fast");
                    if (response.status == 0) {
                        angular.forEach(response.data, function (value, key) {
                            $scope.users.push({
                                userID: value.userID,
                                username: value.name,
                                principleList: [],
                                categoryList: []
                            })
                        });
                    }
                    else {
                        $.toaster(response.message, 'Alert', 'warning');
                    }
                }, function () {
                    $("#loader").fadeOut("fast");
                    $.toaster("Connection Error", 'Alert', 'danger');
                });
            }
            else {
                $.toaster(response.message, 'Alert', 'warning');
            }
        }, function () {
            $.toaster("Connection Error", 'Alert', 'danger');
        });

        $scope.assignTask = function(){
            $("#loader").fadeIn("fast");
            assignTask.save($scope.users,function(response){
                if (response.status == 0) {
                    $("#loader").fadeOut("fast");
                    $window.location.reload();
                    $.toaster(response.message, 'Congratulation', 'success');
                }
                else {
                    $("#loader").fadeOut("fast");
                    $.toaster(response.message, 'Alert', 'warning');
                }
            },function(){
                $("#loader").fadeOut("fast");
                $.toaster("Connection Error", 'Alert', 'danger');
            })
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