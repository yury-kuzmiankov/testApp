'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .controller('DepartmentCtrl', function ($scope, $modal, $rootScope, testFactory, authService, uiGridConstants) {
        $scope.gridOptions = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            columnDefs: [
                { name: 'Отдел', field: 'Name' }
            ]
        };
        testFactory.getDepartments().then(function (data) {
            $scope.gridOptions.data = data;
        });
    });
