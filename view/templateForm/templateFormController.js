'use strict';

deskControllers.controller('templateFormController', ['$scope', '$window', 'getCategories',
    function ($scope, $window, getCategories) {

        $("#loader").fadeOut();

        $scope.categories = [];
        $scope.subCategories = "";
        $scope.categoryColor = "primary";
        $scope.showModal = false;


        getCategories.get(function (response) {
            $scope.categories = response.data
        });

        $scope.categoryChange = function (value) {
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
        };

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
        $scope.$watch('models', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);*/

        $scope.dragoverCallback = function(event, index, external, type) {
            $scope.logListEvent('dragged over', event, index, external, type);
            // Disallow dropping in the third row. Could also be done with dnd-disable-if.
            return index;
        };

        $scope.dropCallback = function(event, index, item, external, type, allowedType) {
            $scope.logListEvent('dropped at', event, index, external, type);
            if (external) {
                if (allowedType === 'itemType' && !item.label) return false;
                if (allowedType === 'containerType' && !angular.isArray(item)) return false;
            }
            return item;
        };

        $scope.logEvent = function(message, event) {
            console.log(message, '(triggered by the following', event.type, 'event)');
            console.log(event);
        };

        $scope.logListEvent = function(action, event, index, external, type) {
            var message = external ? 'External ' : '';
            message += type + ' element is ' + action + ' position ' + index;
            $scope.logEvent(message, event);
        };

       /* $scope.model = [];

        // Initialize model
        var id = 10;
        for (var i = 0; i < 3; ++i) {
            $scope.model.push([]);
            for (var j = 0; j < 2; ++j) {
                $scope.model[i].push([]);
                for (var k = 0; k < 7; ++k) {
                    $scope.model[i][j].push({label: 'Item ' + id++});
                }
            }
        }

        $scope.$watch('model', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);*/

        $scope.$watch('categories', function(categories) {
            $scope.modelAsJson = angular.toJson(categories, true);
        }, true);
        //$scope.heading = "Landing Page...";
    }]);