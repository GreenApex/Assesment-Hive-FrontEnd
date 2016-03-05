'use strict';

deskControllers.controller('assessmentFormController', ['$scope', '$window', 'getAllCategories', 'getAllPrincipal', 'getAllQuestionnarie', 'getAllTemplates',
    function ($scope, $window, getAllCategories, getAllPrincipal, getAllQuestionnarie, getAllTemplates) {

        getAllData();

        $scope.heading = "Landing Page...";

        $scope.categoriesTitle = [];
        $scope.principle = [];
        $scope.question = [];
        $scope.selectedCategories = [];

        $scope.usersData = [];


        $scope.transformForm = true;

        $scope.checkBoxSelection = true;

        function getAllData() {
            getAllTemplates.get(function (response) {
                $("#loader").fadeOut();
                if (response.status == 0) {
                    $scope.usersData = response.data
                }
                else {
                    $.toaster(response.message, 'Alert', 'warning');
                }
            }, function () {
                $("#loader").fadeOut();
                $.toaster("Connection Error", 'Alert', 'danger');
            });
        }


        $scope.categoryColor = "primary";
        $scope.showModal = false;


        /* $scope.categoryChange = function (value) {
         //alert(JSON.stringify(value));
         $scope.categories == "" ? $scope.categoryColor = "primary" : $scope.categoryColor = "danger";
         if(value[0].value !== undefined){
         $scope.subCategories = "";
         $scope.showModal = false
         }
         else{
         $scope.subCategories = value;
         $scope.showModal = true
         }
         $scope.categories = value
         };

         $scope.getCategoriesFunction =  function() {
         getCategories.get(function (response) {
         $scope.categories = response.data;
         $scope.categoryColor = "primary";
         $scope.subCategories = "";
         });
         };*/

        /*$scope.models = {
         selected: null,
         lists: {"A": [], "B": []}
         };

         // Generate initial model
         for (var i = 1; i <= 3; ++i) {
         $scope.models.lists.A.push({label: "Item A" + i});
         $scope.models.lists.B.push({label: "Item B" + i});
         }

         // Model to JSON for demo purpose
         */

        $scope.$watch('selectedCategories', function(selectedCategories) {
            $scope.modelAsJson = angular.toJson(selectedCategories, true);
        }, true);

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

        $scope.dataChange = function(data){
            $scope.usersData = data
        };

        $scope.saveTemplate = function(){
            createTemplate.save({
                "templateName": $scope.templateName,
                "categoryList": $scope.selectedCategories
            },function(response){
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