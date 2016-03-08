'use strict';

deskControllers.controller('reportsController', ['$scope', '$window', 'getReport', 'getAllCategories', 'getAllPrincipal', '$rootScope',
    function ($scope, $window, getReport, getAllCategories, getAllPrincipal, $rootScope) {


        $scope.categories = "";
        $scope.principle = "";

        $scope.transformForm = true;

        $scope.chartData = [];

        $scope.drillData = []

        getAllCategories.get(function (response) {

            if (response.status == 0) {
                $scope.categories = response.data

                getAllPrincipal.get(function (response) {
                    if (response.status == 0) {
                        $("#loader").fadeOut("fast");
                        $scope.principle = response.data
                    }
                    else {
                        $("#loader").fadeOut("fast");
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
            $("#loader").fadeOut();
            $.toaster("Connection Error", 'Alert', 'danger');
        });


        $scope.getReports = function () {
            $("#loader").fadeIn("fast");
            getReport.get({
                categoryName: $scope.categoryName.catrgoryName || "",
                principleName: $scope.principleName.principleName || "",
                startDate: $scope.startDate,
                endDate: $scope.endDate
            }, function (response) {
                if (response.status == 0) {
                    $("#loader").fadeOut("fast");
                    $scope.transformForm = false;
                    angular.forEach(response.data, function (value, key) {

                        var a = parseInt(value.rating);
                        $scope.chartData.push({
                            name: value.qaName,
                            y: a
                        });
                    });


                    $rootScope.$broadcast('changeData', {});
                    $scope.categoryName = "ok";
                    $scope.principleName = "ok";
                    $scope.startDate = "";
                    $scope.endDate = "";
                }
                else {
                    $.toaster(response.message, 'Alert', 'warning');
                }
            });
        }

        $('.input-daterange').datepicker({
            todayBtn: "linked",
            format: 'yyyy-mm-dd'
        });


    }]);