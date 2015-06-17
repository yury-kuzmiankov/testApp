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
    'ngCookies', 'ngResource','ngAnimate', 'ngTouch', 'ngRoute', 'nvd3ChartDirectives', 'ui.bootstrap', 'ui.grid', 'ui.grid.edit'
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
          templateUrl: function (params) {
              return 'ng_views/' + params.viewType + '.html'
          },
          controller: 'TestCtrl'
      })
      .when('/test/:testId/summary', {
          templateUrl: 'ng_views/summary.html',
          controller: 'ResultCtrl'
      })
      .when('/testresult', {
          templateUrl: 'ng_views/testresult.html',
          controller: 'ResultCtrl'
      })
      .when('/users', {
          templateUrl: 'ng_views/users.html',
          controller: 'UserCtrl'
      })
      .when('/departments', {
          templateUrl: 'ng_views/department.html',
          controller: 'DepartmentCtrl'
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
      '$modal',
      'helper',
      function ($rootScope, $scope, $q, authService, $modal, helper) {
          var global = {
              isAuthN: authService.isAuthN(),
              currentUser: authService.getUserData(),
              errorStack: []
          };
          authService.checkCurrentTest();
          $rootScope.global = global;
      }
    ]);



