'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('ResultCtrl', function ($scope, $modal, $rootScope, testFactory, authService, uiGridConstants) {
      var nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      $scope.gridOptions = {
          enableFiltering: true,
          onRegisterApi: function (gridApi) {
              $scope.gridApi = gridApi;
          },
          columnDefs: [
              { name: 'Фамилия', field: 'user.LastName' },
              { name: 'Отдел', field: 'user.department.Name', width:'10%'},
              { name: 'Тест', field: 'TestId', width:'10%'},
              { name: 'Ошибок', field: 'Fail', width:'10%'},
              { name: 'Правильных', field: 'Correct', width:'10%'},
              { name: 'Попыток', field: 'Try', width:'10%'},
              { name: 'Затрачено времени', field: 'TimeSpend' },
              { name: 'Результат', field: 'Result' },
              { name: 'Дата', field: 'Timestamp', cellFilter: 'date:"yyyy-MM-dd"'}
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
  });