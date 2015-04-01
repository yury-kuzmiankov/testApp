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

                $scope.getResult = function() {
                    var fullResult = {
                        result : "",
                        fail : 0,
                        correct : 0
                    };
                    var answer = $scope.answer.split(" ");
                    if(answer.length < $scope.arrayResult.length){
                        fullResult.fail = $scope.arrayResult.length - answer.length;
                    }
                    angular.forEach(answer, function(result, index){
                        if(result != $scope.arrayResult[index]){
                            fullResult.fail++;
                        }else{
                            fullResult.correct++;
                        }
                    });
                    fullResult.result = Math.floor(fullResult.correct / (fullResult.fail + fullResult.correct) * 100) + "% правильных";
                    return fullResult;
                };

                $scope.handleResults = function() {
                    $interval.cancel(this.timer);
                    var result = $scope.getResult();
                    $scope.$emit("testDone", {
                        Fail: result.fail,
                        Correct: result.correct,
                        Neutral: 0,
                        Try: result.correct + result.fail,
                        Result: result.result,
                        Timestamp: new Date(),
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    });
                };
            }
        }
    });
