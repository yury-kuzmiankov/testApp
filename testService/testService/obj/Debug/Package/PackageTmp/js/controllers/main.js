'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('MainCtrl', function ($scope, $modal, $rootScope, testFactory, authService, $location, helper) {
      //reset done
      //$scope.currentTest.isDone = false;
      //helper.storage.set("currentTest", $scope.currentTest);

      $scope.$on('userChanged', function () {
          $scope.updateUser();
          authService.checkCurrentTest();
      });
      $scope.$on('testDone', function () {
          $scope.currentTest = helper.storage.get("currentTest" + $scope.user.Id);
      });
      $scope.updateUser = function () {
          $scope.user = authService.getUserData();
          if ($scope.user) {
              $scope.isAuth = true;
              $scope.currentTest = helper.storage.get("currentTest" + $scope.user.Id);
          } else {
              $scope.isAuth = false;
              $scope.currentTest = null;
          }
      };
      $scope.updateUser();

      $scope.login = function () {
          var modalInstance = $modal.open({
              templateUrl: 'template/modal/loginTemplate.html',
              controller: 'LoginCtrl'
          });
      };

      $scope.openregister = function () {
          var modalInstance = $modal.open({
              templateUrl: 'template/modal/registerTemplate.html',
              controller: 'LoginCtrl'
          });
      };

      $scope.logout = function () {
          authService.logout();
          $location.path("/");
      };
  });
