/**
 * Created by TP on 2/8/2016.
 */

'use strict';

deskControllers.controller('reatingController', ['$scope', '$window', '$http',
    function ($scope, $window, $http) {

        $("#loader").fadeOut();

        $scope.heading = "Landing Page...";

        $('.input-daterange').datepicker({
            todayBtn: "linked"
        });

        $scope.chartData = [{
            name: '2006',
            y: 4,
            drilldown: '2006'
        }, {
            name: '2007',
            y: 5,
            drilldown: '2007'
        }, {
            name: '2008',
            y: 3,
            drilldown: '2008'
        }, {
            name: '2009',
            y: 2,
            drilldown: '2009'
        }, {
            name: '2010',
            y: 4,
            drilldown: '2010'
        }, {
            name: '2011',
            y: 3,
            drilldown: '2011'
        }];

        $scope.drillData = [{
            name: '2006',
            id: '2006',
            data: [
                [
                    4
                ]
            ]
        }, {
            name: '2007',
            id: '2007',
            data: [
                [
                    5
                ]
            ]
        }, {
            name: '2008',
            id: '2008',
            data: [
                [
                    3
                ]
            ]
        }, {
            name: '2009',
            id: '2009',
            data: [
                [
                    2
                ],
            ]
        }, {
            name: '2010',
            id: '2010',
            data: [
                [
                    4
                ]
            ]
        }, {
            name: '2011',
            id: '2011',
            data: [
                [
                    3
                ]
            ]
        }]


        /* $scope.getReating = function(){

         Highcharts.chart('container', {

         chart: {
         type: 'column'
         },
         title: {
         text: 'Rating of Year'
         },
         xAxis: {
         type: 'category'
         },
         yAxis: {
         title: {
         text: 'Rate of Year'
         }

         },
         legend: {
         enabled: false
         },
         plotOptions: {
         series: {
         borderWidth: 0,
         }
         },

         series: [{
         name: 'Rate',
         colorByPoint: true,
         data: [{
         name: '2006',
         y: 4,
         drilldown: '2006'
         }, {
         name: '2007',
         y: 5,
         drilldown: '2007'
         }, {
         name: '2008',
         y: 3,
         drilldown: '2008'
         }, {
         name: '2009',
         y: 2,
         drilldown: '2009'
         }, {
         name: '2010',
         y: 4,
         drilldown: '2010'
         },{
         name: '2011',
         y: 3,
         drilldown: '2011'
         }]
         }],
         drilldown: {
         series: [{
         name: '2006',
         id: '2006',
         data: [
         [
         4
         ]
         ]
         }, {
         name: '2007',
         id: '2007',
         data: [
         [
         5
         ]
         ]
         }, {
         name: '2008',
         id: '2008',
         data: [
         [
         3
         ]
         ]
         }, {
         name: '2009',
         id: '2009',
         data: [
         [
         2
         ],
         ]
         }, {
         name: '2010',
         id: '2010',
         data: [
         [
         4
         ]
         ]
         }, {
         name: '2011',
         id: '2011',
         data: [
         [
         3
         ]
         ]
         }]
         }
         });

         /!*$http({
         url: "json/rating.json",
         dataType: 'json',
         method: 'GET',
         data: '',
         headers: {
         "Content-Type": "application/json"
         }
         }).success(function (response) {
         /!*$scope.value = response.data;*!/
         //alert(JSON.stringify($scope.value));
         $('#container').highcharts({

         })
         })
         .error(function (error) {
         alert(error);
         });*!/
         }*/

        /*getKeyList.get(function(response){
         if(response.status == 0){
         $scope.keylist = response.data;
         }
         else{
         $.toaster(response.message, 'Alert', 'warning');
         }
         });*/


    }]);