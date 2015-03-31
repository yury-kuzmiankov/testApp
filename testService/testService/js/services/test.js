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

          getTestsByDepartment: function () {
              var deferred = $q.defer();
              var user = authService.getUserData();
              $http.get("/test/getTestsByUser/" + user.department.Id).then(function (result) {
                  deferred.resolve(result.data);
              });
              return deferred.promise;
          },

          getTestsDetail: function () {
              var deferred = $q.defer();
              $http.get("/test/getTests").then(function (result) {
                  deferred.resolve(result.data);
              });
              return deferred.promise;
          },

          saveTestsResults: function (data) {
              return $http({
                  method: 'POST',
                  url: '/test/insert',
                  data: data
              }).then(function (response) {
                  var data = response.data;
                  if (data) {
                      console.log(data);
                  } else {
                      console.log(data);
                      return $q.reject(data);
                  }
              });
          },

          getDepartments: function () {
              var deferred = $q.defer();
              $http.get("/department").then(function (result) {
                  deferred.resolve(result.data);
              });
              return deferred.promise;
          },

          getUsers: function () {
              var deferred = $q.defer();
              $http.get("/user").then(function (result) {
                  deferred.resolve(result.data);
              });
              return deferred.promise;
          }
      }
  });
