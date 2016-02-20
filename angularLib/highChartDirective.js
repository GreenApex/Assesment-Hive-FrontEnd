angular.module("high-chart",[]).directive('highChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,

        link: function (scope, element, attrs) {

            var chartName = attrs.chart;

            chartName = {
                chart: {
                    type: attrs.chartType  || "pie"
                },
                title: {
                    text: attrs.titleText || "No Title"
                },
                xAxis: {
                    type: attrs.xAxisType,
                    title: {
                        text: attrs.xAxisType
                    }
                },
                yAxis: {
                    title: {
                        text: attrs.yAxisType
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
                    data: scope.$eval(attrs.seriesData) || "No Data"
                }],
                drilldown: {
                    series: scope.$eval(attrs.drillDownData) || "No Information"
                }
            }


            scope.$watch(function () {
                return attrs.chart;
            }, function () {

                if (!attrs.chart) return;

                var chart = chartName;

                element.highcharts(chart);
            });
        }
    }
});

