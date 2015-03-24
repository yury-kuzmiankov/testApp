'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
