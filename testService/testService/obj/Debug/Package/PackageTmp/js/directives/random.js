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
            controller: function($scope, $interval) {
                $scope.startTime = new Date().getTime();
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
                    var fail = 0;
                    var correct = 0;
                    if($scope.answer == $scope.arrayResult){
                        correct++;
                    }else{
                        fail++;
                    }
                    $scope.$emit("testDone", {
                        Fail: fail,
                        Correct: correct,
                        Neutral: 0,
                        Try: 1,
                        Result: correct ? "Правильно" : "Неправильно",
                        Timestamp: new Date(),
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    });
                };
            }
        }
    });
