'use strict';

deskControllers.controller('taskAssignmentController', ['$scope', '$window', 'getAllTemplates',
    function ($scope, $window, getAllTemplates) {

        $("#loader").fadeOut();

        $scope.heading = "Landing Page...";
        $scope.roleList = [];
        getAllTemplates.get(function (response) {
            if(response.status == 0){
               // $scope.roleList = response.data;
                //alert(JSON.stringify($scope.roleList));
                angular.forEach(response.data, function (value, key) {
                    $scope.roleList.push(value);
                });
            }
            else{
                $.toaster(response.message, 'Alert', 'warning');
            }
        },function () {
            $.toaster("Connection Error", 'Alert', 'danger');
        });

        $('#tree').checktree();
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-36251023-1']);
        _gaq.push(['_setDomainName', 'jqueryscript.net']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

               /* $scope.roleList1 = [{
                                "roleName": "User", "roleId": "role1", "children": [{
                                    "roleName": "subUser2", "roleId": "role12", "children": [{
                                        "roleName": "subUser2-1-1", "roleId": "role1211", "children": []},
                                        {
                                            "roleName": "subUser2-1-2", "roleId": "role1212", "children": []
                                        }]}]}];

                //roleList1 to treeview
                $scope.roleList = $scope.roleList1;*/
    }]);