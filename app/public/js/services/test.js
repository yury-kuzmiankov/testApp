'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .factory('testFactory', function ($http, $q) {
        var testUrl = 'js/data/test.json';
        this.tests = null;
        return {
            getTests: function () {
                var deferred = $q.defer();

                if(!this.tests) {
                    $http.get(testUrl).then(function(result) {
                        deferred.resolve(result.data);
                    });
                    this.tests = deferred.promise;
                }
                return this.tests;
            }

        }
  });
