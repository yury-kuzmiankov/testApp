'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('ResultCtrl',  function ($scope, testFactory, $routeParams, chartService) {
      testFactory.getTests().then(function(data) {
        $scope.data = data;
        $scope.test = data.tests[$routeParams.testId];
        chartService.donutMultipleResult($scope);
      });
  });
