'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('questions', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/questions.html',
            controller: function($scope, $interval, $location) {
                $scope.array = [0, 0, 0, 0, 0];
                $scope.results = [];
                $scope.answer = "";
                $scope.progress = 0;
                $scope.initTimer = function(){
                    this.timer = $interval(function(){
                        $scope.next();
                    }, 15000);
                };


                $scope.handleResults = function() {
                    $interval.cancel(this.timer);
                    var selectedCount = 0;
                    angular.forEach($scope.question.options, function(option) {
                        if(option.isSelected){
                            selectedCount++;
                        }
                    });
                    $scope.question.results = selectedCount / $scope.question.options.length;
                    $location.path($scope.nextaction);
                };
            }
        }
    });
