'use strict';

/**
 * @ngdoc overview
 * @name yomanAppApp
 * @description
 * # yomanAppApp
 *
 * Main module of the application.
 */
angular
  .module('libraryApp', [
    'ngCookies', 'ngResource', 'ngRoute', 'nvd3ChartDirectives'
  ])
  .config(function ($routeProvider, $provide) {
    $provide.constant('appConfig', {
      userCookie: 'user_settings',
      responseStatus: {
        SUCCESS: 'success',
        ERROR: 'error'
      },
      BASE_PATH: '/',
      EMAIL_SUFFIX: '@epam.com'
    });
    $routeProvider
      .when('/', {
        templateUrl: 'ng_views/main.html',
        controller: 'MainCtrl'
      })
      .when('/loadTests', {
        templateUrl: 'ng_views/wait.html',
        controller: 'TestCtrl'
      })
      .when('/test/:testId/question/:questionId/:viewType', {
        templateUrl: function(params) {
          return 'ng_views/' + params.viewType + '.html'
        },
        controller : 'TestCtrl'
      })
      .when('/test/:testId/summary', {
        templateUrl: 'ng_views/summary.html',
        controller: 'ResultCtrl'
      })
      .when('/about', {
        templateUrl: 'ng_views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/error', {
          templateUrl: 'ng_views/error.html',
          controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run([
      '$rootScope',
      '$q',
      'authService',
      function ($rootScope, $q, authService) {
        return $q.all([authService.checkAuthN()]);
      }
    ]).controller('AppCtrl', [
      '$rootScope',
      '$scope',
      '$q',
      'authService',
      function ($rootScope, $scope, $q, authService) {
        var global = {
          isAuthN: authService.isAuthN(),
          currentUser: authService.getUserData(),
          errorStack: []
        };
        $rootScope.global = global;
        $scope.auth = {
            name : "y",
            postfix: '@epam.com',
            password : "21"
        };
        $scope.proceed = function () {
            $scope.signin();
        };

        $scope.signin = function () {
          $scope.authInProgress = true;
          $rootScope.errorWithCredentials = null;
          authService.login({
            name: $scope.auth.login + $scope.auth.postfix,
            password: $scope.auth.password
          }).then(function () {
          }, function (error) {
            $rootScope.global.errorStack.push(error);
            $rootScope.errorWithCredentials = error.message;
            console.error(error.errorCode, error.message);
          })['finally'](function () {
            $scope.authInProgress = false;
          });
        };
        $scope.logout = function () {
          authService.logout();
        };
      }
    ]);



