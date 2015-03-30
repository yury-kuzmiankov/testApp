'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('UserCtrl', function ($scope, $modal, $rootScope, testFactory, authService, uiGridConstants) {
        $scope.departments = [];
        $scope.roles = [
            { id: 1, value: 'admin'},
            { id: 2, value: 'user'},
            { id: 3, value: 'manager'}
        ];
      $scope.gridOptions = {
          enableFiltering: true,
          onRegisterApi: function (gridApi) {
              $scope.gridApi = gridApi;
              gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
                  $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
                  $scope.$apply();
              });
          }
      };
      testFactory.getDepartments().then(function (data) {
          $scope.departments = data;
          $scope.gridOptions = {
              columnDefs: [
                  { name: 'Логин', field: 'Name' },
                  { name: 'Фамилия', field: 'LastName' },
                  { name: 'Имя', field: 'FirstName' },
                  { name: 'Отдел', field: 'department.Name', editableCellTemplate: 'ui-grid/dropdownEditor', width: '10%',
                      editDropdownIdLabel : 'Id', editDropdownValueLabel: 'Name', editDropdownOptionsArray:   $scope.departments
                  },
                  { name: 'Роль', field: 'Role.Name', editableCellTemplate: 'ui-grid/dropdownEditor', width: '10%',
                      editDropdownIdLabel: 'value', editDropdownOptionsArray:  $scope.roles
                  }
              ]
          };
          testFactory.getUsers().then(function (users) {
              $scope.gridOptions.data = users;
          });
      });
  });
