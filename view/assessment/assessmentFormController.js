'use strict';

deskControllers.controller('assessmentFormController', ['$scope', '$window', 'getMyTask', '$cookies', 'saveSurveyResult', 'getAllTemplates',
    function ($scope, $window, getMyTask, $cookies, saveSurveyResult, getAllTemplates) {

        $scope.categoriesTitle = [];
        $scope.principle = [];
        $scope.question = [];
        $scope.selectedCategories = [];

        $scope.usersData = [];
        $scope.userSelectedData = [];
        $scope.userSelectedQue = [];

        $scope.fileUploadData = "";


        $scope.transformForm = true;
        $scope.appendForm = true;


        var userData = $cookies.getObject('userData');

        if (userData) {
            getAllData();
        }
        else {
        }


        $scope.assesmentForm = function(data){
            $scope.transformForm = false;
            $scope.userSelectedData = data.principleList
            //$scope.userSelectedData.push({catergoryName:catergoryName});
        }

        $scope.selectedChange = function(data){
            $scope.appendForm = false;
            $scope.userSelectedQue = data
           // $scope.userSelectedQue.push({principleName:principleName});

        }

        $('body').on('change', '#image', function (e) {
            e.preventDefault();
            var formData = new FormData($(this).parents('form')[0]);
            $.ajax({
                url: 'php/uploadImages.php',
                type: 'POST',
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    return myXhr;
                },
                success: function (data) {
                    var obj = JSON.parse(data);
                    if (obj.error == 0) {
                        $scope.fileUploadData = "uploadedFiles/" + obj.fileName;
                    }
                    else {
                    }
                },
                error: function (data) {
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            });
            return false;
        });


        $scope.fileUpload = function(){
            if ($scope.fileUploadData != "") {
                $.toaster("File Uploaded", 'Congratulation', 'success');
                return "uploadedFiles/"+$scope.fileUploadData;
            }
            else {
                $.toaster("File Not Uploaded", 'Alert', 'danger');
            }
        }

        $scope.saveAssessment = function(){
            $("#loader").fadeIn("fast");
            saveSurveyResult.save({userid:userData.userID},$scope.userSelectedQue,function(response){
                if (response.status == 0) {
                    $("#loader").fadeOut("fast");
                    $.toaster(response.message, 'Congratulation', 'success');
                    //$window.location.reload();
                    $scope.transformForm = true;
                    $scope.appendForm = true;
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

        function getAllData() {
            getMyTask.get({userID:userData.userID},function (response) {
                $("#loader").fadeOut();
                if (response.status == 0) {
                    angular.forEach(response.data.categoryList, function (value, key) {
                        $scope.usersData.push({
                            catergoryID: value.catergoryID,
                            catergoryName: value.catergoryName,
                            templateName: value.templateName,
                            principleList: value.principleList
                        });
                    });

                }
                else {
                    $.toaster(response.message, 'Alert', 'warning');
                }
            }, function () {
                $("#loader").fadeOut();
                $.toaster("Connection Error", 'Alert', 'danger');
            });
        }

        $scope.$watch("fileUploadData", function(newValue) {
            $scope.fileUploadData = newValue;
            console.log("rvd" + JSON.stringify(newValue));
        });

        $scope.categoryColor = "primary";
        $scope.showModal = false;



    }]);