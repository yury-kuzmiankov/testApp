'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('LoginCtrl', function ($scope, $modalInstance, authService, $rootScope, $location, testFactory, $modal) {
        testFactory.getDepartments().then(function (data) {
            $scope.departments = data;
            $scope.departmentDef = data[0];
        });
        $scope.signin = function () {
          $scope.authInProgress = true;
          $rootScope.errorWithCredentials = null;
          $scope.error = null;
          authService.login({
              name: $scope.login,
              password: $scope.password
          }).then(function () {
              $modalInstance.close();
              $location.path("/");
          }, function (error) {
              $rootScope.global.errorStack.push(error);
              $rootScope.errorWithCredentials = error.message;
              $scope.error = true;
          })['finally'](function () {
              $scope.authInProgress = false;
          });
      };

      $scope.register = function () {
          authService.register({
              name: $scope.login,
              password: $scope.password,
              firstName: $scope.firstName,
              lastName: $scope.lastName,
              department: $scope.departmentDef.Id
          }).then(function () {
              $scope.displaySuccess = true;
          }, function (error) {
              $scope.error = true;
          })['finally'](function () {
              $scope.authInProgress = false;
          });
      };

      $scope.ok = function () {
          $scope.signin();
      };

      $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
      };
  })
