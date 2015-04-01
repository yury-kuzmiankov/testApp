'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .controller('DepartmentCtrl', function ($scope, $modal, $rootScope, testFactory, authService) {
        $scope.departments = [],
        $scope.newDepartment = "";

        $scope.addDepartment = function(){
            testFactory.insertDepartment({
                Name : $scope.newDepartment
            }).then(function () {
                testFactory.getDepartments().then(function (data) {
                    $scope.gridOptions.data = data;
                });
            });
        };

        $scope.gridOptions = {
            enableFiltering: true,
            columnDefs : [
                { name: 'Отдел', field: 'Name'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
                    $scope.updateObject(colDef, rowEntity, newValue);
                });
            }
        };

        $scope.updateObject = function(colDef, rowEntity, newValue){
            testFactory.updateDepartment({
                Id : rowEntity.Id,
                Name : newValue
            });
        };
        var init = function() {
            var user = authService.getUserData();
            if (user.Role.Id != 2) {
                testFactory.getDepartments().then(function (data) {
                    $scope.gridOptions.data = data;
                });
            }else{
                authService.rootRedirect();
            }
        }();
    });
