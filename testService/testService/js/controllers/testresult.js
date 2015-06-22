'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('ResultCtrl', function ($scope, $rootScope, testFactory, authService) {
        $scope.departments = [];
        $scope.prepareDepartments = function(deps){
            angular.forEach(deps, function(dep){
                $scope.departments.push({
                    id : dep.Id,
                    value : dep.Name
                });
            });
        };
        $scope.roles = [
            { id: 1, value: 'admin'},
            { id: 2, value: 'user'},
            { id: 3, value: 'manager'}
        ];
        $scope.userOptions = {
            enableFiltering: true,
            columnDefs: [
                { name: 'Логин', field: 'Name'},
                { name: 'Фамилия', field: 'LastName' },
                { name: 'Имя', field: 'FirstName' },
                { name: 'Отдел', field: 'department.Name'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApiUser = gridApi;
                gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                    var service;
                    if (row.isExpanded) {
                        row.entity.subGridOptions = {
                            columnDefs: [
                                { name: 'Тест', field: 'TestId', width:'7%', enableCellEdit: false},
                                { name: 'Ошибок', field: 'Fail', width:'7%', enableCellEdit: false},
                                { name: 'Правильных', field: 'Correct', width:'7%', enableCellEdit: false},
                                { name: 'Попыток', field: 'Try', width:'7%', enableCellEdit: false},
                                { name: 'Затрачено времени', field: 'TimeSpend', width:'13%', enableCellEdit: false },
                                { name: 'Результат', field: 'Result',width:'37%', cellTooltip: true, enableCellEdit: true  },
                                { name: 'Дата', field: 'Timestamp',  type: 'date', width:'10%', cellFilter: 'date:"HH:MM dd-MM-yyyy"', enableCellEdit: false}
                            ]};
                        service = testFactory.getResultsByUser(row.entity.Id);
                        service.then(function (data) {
                            var re = /-?\d+/;
                            data.forEach( function( row ){
                                var m = re.exec(row.Timestamp);
                                row.Timestamp = new Date(parseInt(m[0]));
                            });
                            row.entity.subGridOptions.data = data;
                        });
                    }
                });
            },
            expandableRowTemplate: 'templates/expandableRowTemplate.html',
            expandableRowHeight: 150,
            //subGridVariable will be available in subGrid scope
            expandableRowScope: {
                subGridVariable: 'subGridScopeVariable'
            }
        };
      var init = function(){
          var user = authService.getUserData();
          var service;
          if(user && user.Role.Id != 2){
              testFactory.getDepartments().then(function (data) {
                  $scope.prepareDepartments(data);
                  if(user.Role.Id == 1){
                      service = testFactory.getUsers()
                  }else{
                      service = testFactory.getUsersByDepartment(user.department.Id);
                  }
                  service.then(function (users) {
                      $scope.userOptions.data = users;
                  });
              });
              /*var service = null;
              if(user.Role.Id == 1){
                  service = testFactory.getTestsDetail()
              }else{
                  service = testFactory.getTestsByDepartment(user.department.Id);
              }
              service.then(function (data) {
                  var re = /-?\d+/;
                  data.forEach( function( row ){
                      var m = re.exec(row.Timestamp);
                      row.Timestamp = new Date(parseInt(m[0]));
                  });
                  $scope.gridOptions.data = data;
              });*/
          }else{
              authService.rootRedirect();
          }
      }();

  });
