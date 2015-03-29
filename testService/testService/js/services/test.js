'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .factory('testFactory', function ($http, $q, authService) {
      var testUrl = 'js/data/test.json';
      this.tests = null;
      this.prevTests = null;
      this.departments = null;
      return {
          getTests: function () {
              var deferred = $q.defer();

              if (!this.tests) {
                  $http.get(testUrl).then(function (result) {
                      deferred.resolve(result.data);
                  });
                  this.tests = deferred.promise;
              }
              return this.tests;
          },

          getTestsByUser: function () {
              var deferred = $q.defer();
              var user = authService.getUserData();
              if (!this.prevTests) {
                  $http.get("/test/getTestsByUser/" + user.Id).then(function (result) {
                      deferred.resolve(result.data);
                  });
                  this.prevTests = deferred.promise;
              }
              return this.prevTests;
          },

          getDepartments: function () {
              var deferred = $q.defer();

              if (!this.departments) {
                  $http.get("/department").then(function (result) {
                      deferred.resolve(result.data);
                  });
                  this.departments = deferred.promise;
              }
              return this.departments;
          }

      }
  });
