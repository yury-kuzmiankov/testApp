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
    'ngCookies', 'ngResource', 'ngRoute', 'nvd3ChartDirectives', 'ui.bootstrap'
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
      '$modal',
      'helper',
      function ($rootScope, $scope, $q, authService, $modal, helper) {
          var global = {
              isAuthN: authService.isAuthN(),
              currentUser: authService.getUserData(),
              errorStack: []
          };
          var currentTest = helper.storage.get("currentTest");
          if (currentTest) {
              var dateNow = new Date();
              dateNow = dateNow.setHours(0, 0, 0, 0);
              dateNow = new Date(dateNow);
              var dateTest = new Date(currentTest.date);
              dateTest = dateTest.setHours(0, 0, 0, 0);
              dateTest = new Date(dateTest);
              var timeDiff = Math.abs(dateNow.getTime() - dateTest.getTime());
              var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
              if (diffDays > 0) {
                  helper.storage.remove("currentTest");
              }
          }
          $rootScope.global = global;
      }
    ]);



