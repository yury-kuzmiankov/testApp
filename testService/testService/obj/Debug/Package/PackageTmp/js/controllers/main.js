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
      $scope.currentTest = helper.storage.get("currentTest");
      //reset done
      //$scope.currentTest.isDone = false;
      //helper.storage.set("currentTest", $scope.currentTest);
     // helper.storage.set("currentTest", null);
      $scope.$on('userChanged', function () {
          $scope.updateUser();
      });
      $scope.$on('testDone', function () {
          $scope.currentTest = helper.storage.get("currentTest");
      });
      $scope.updateUser = function () {
          if ($rootScope.global && $rootScope.global.isAuthN) {
              $scope.user = $rootScope.global.currentUser;
              $scope.isAuth = true;
          } else {
              $scope.user = null;
              $scope.isAuth = false;
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
