'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('UserCtrl', function ($scope, $modal, $rootScope, testFactory, authService) {
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
                    $scope.updateObject(colDef, rowEntity, newValue);
                });
            }
        };
        var init = function() {
            var user = authService.getUserData();
            if (user && user.Role.Id == 1) {
                testFactory.getDepartments().then(function (data) {
                    $scope.prepareDepartments(data);
                    $scope.gridOptions = {
                        columnDefs: [
                            { name: 'Логин', field: 'Name', enableCellEdit: false},
                            { name: 'Фамилия', field: 'LastName' },
                            { name: 'Имя', field: 'FirstName' },
                            { name: 'Отдел', field: 'department.Name', editableCellTemplate: 'ui-grid/dropdownEditor', width: '10%',
                                editDropdownIdLabel : 'value', editDropdownOptionsArray:   $scope.departments
                            },
                            { name: 'Роль', field: 'Role.Name', editableCellTemplate: 'ui-grid/dropdownEditor', width: '10%',
                                editDropdownIdLabel : 'value', editDropdownOptionsArray:  $scope.roles
                            }
                        ]
                    };
                    testFactory.getUsers().then(function (users) {
                        $scope.gridOptions.data = users;
                    });
                });
            }else{
                authService.rootRedirect();
            }
        }();

      $scope.prepareDepartments = function(deps){
            angular.forEach(deps, function(dep){
              $scope.departments.push({
                  id : dep.Id,
                  value : dep.Name
              });
            });
      };

      $scope.updateObject = function(colDef, rowEntity, newValue){
          var object = colDef.field.split('.');
          var id = null;
          if(object.length > 1){
              var original = colDef.editDropdownOptionsArray;
              for(var i = 0; i < original.length ; i++){
                  if(original[i].value == newValue){
                      id = original[i].id;
                      break;
                  }
              }
              rowEntity[object[0]].Id = id;
          }
          testFactory.updateUser({
              Id : rowEntity.Id,
              LastName : rowEntity.LastName,
              FirstName : rowEntity.FirstName,
              Role : {
                  Id :  rowEntity.Role.Id
              },
              department : {
                Id :  rowEntity.department.Id
              }
          });
      };


  });
