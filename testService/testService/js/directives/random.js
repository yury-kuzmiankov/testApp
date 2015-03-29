'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('random', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/random.html',
            controller: function($scope, $interval, $location) {
                $scope.answer = "";
                $scope.isShowAnswer = false;
                $scope.initTimer = function(){
                    this.timer = $interval(function(){
                        $scope.next();
                    }, 10000);
                };
                $scope.start = function(){
                    this.initTimer();
                    this.array = randomService.getRandomArray(10, 50, 20);
                    this.arrayResult = angular.copy(this.array);
                };
                $scope.start();

                $scope.next = function() {
                    $interval.cancel(this.timer);
                    $scope.isShowAnswer = true;
                    this.array = [];
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
                };
            }
        }
    });
