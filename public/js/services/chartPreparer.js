'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .service('chartService', function () {
        var donutSettings = function ($scope) {
            $scope.width = 500;
            $scope.height = 500;
            $scope.xFunction = function() {
                return function(d) {
                    return d.key;
                };
            }
            $scope.yFunction = function() {
                return function(d) {
                    return d.y;
                };
            }
            $scope.descriptionFunction = function() {
                return function(d) {
                    return d.key;
                }
            }
        };

        var donutSingleResult = function ($scope) {
            donutSettings($scope);
            $scope.resultData = [{
                key: "Правильно",
                y: $scope.question.results * 100
            }, {
                key: "Неправильно",
                y: 100 - $scope.question.results * 100
            }];

        };

        var donutMultipleResult = function ($scope) {
            donutSettings($scope);
            var questions = $scope.test.questions;
            var sum = 0;
            var avg = 0;
            angular.forEach(questions, function(value) {
                sum = sum + value.results;
            });
            avg = sum / questions.length;
            $scope.resultData = [{
                key: "Правильно",
                y: avg * 100
            }, {
                key: "Неправильно",
                y: 100 - avg * 100
            }];

        };

        return {
            donutSingleResult: donutSingleResult,
            donutMultipleResult: donutMultipleResult
        }
  });
