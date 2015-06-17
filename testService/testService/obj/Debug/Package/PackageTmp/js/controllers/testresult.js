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
      var init = function(){
          var user = authService.getUserData();
          if(user && user.Role.Id != 2){
              $scope.gridOptions = {
                  enableFiltering: true,
                  onRegisterApi: function (gridApi) {
                      $scope.gridApi = gridApi;
                  },
                  columnDefs: [
                      { name: 'Фамилия', field: 'user.LastName',width:'10%', enableCellEdit: false },
                      { name: 'Отдел', field: 'user.department.Name', width:'8%', enableCellEdit: false},
                      { name: 'Тест', field: 'TestId', width:'7%', enableCellEdit: false},
                      { name: 'Ошибок', field: 'Fail', width:'7%', enableCellEdit: false},
                      { name: 'Правильных', field: 'Correct', width:'10%', enableCellEdit: false},
                      { name: 'Попыток', field: 'Try', width:'7%', enableCellEdit: false},
                      { name: 'Затрачено времени', field: 'TimeSpend', width:'13%', enableCellEdit: false },
                      { name: 'Результат', field: 'Result',width:'20%', cellTooltip: true, enableCellEdit: true  },
                      { name: 'Дата', field: 'Timestamp',  type: 'date', width:'10%', cellFilter: 'date:"HH:MM dd-MM-yyyy"', enableCellEdit: false}
                  ]
              };
              testFactory.getTestsDetail().then(function (data) {
                  var re = /-?\d+/;
                  data.forEach( function( row ){
                      var m = re.exec(row.Timestamp);
                      row.Timestamp = new Date(parseInt(m[0]));
                  });
                  $scope.gridOptions.data = data;
              });
          }else{
              authService.rootRedirect();
          }
      }();

  });
