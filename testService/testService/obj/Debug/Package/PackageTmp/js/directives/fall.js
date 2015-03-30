'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .directive('fall', function () {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/fall.html',
            controller: function($scope, $element, $interval) {
                $scope.typed = "";
                $scope.attempt = 0;
                $scope.rectanglePos = 0;
                $scope.limitY = 150;
                $scope.results = [];
                $scope.startTime = new Date().getTime();
                $scope.checkKey = function(){
                    if(this.typed === ""){
                        $interval.cancel($scope.timer);
                        this.nextAttempt();
                    }
                };
                $scope.startAttempt = function(){
                    $scope.timer = $interval(function(){
                        if($scope.rectanglePos < 500){
                            $scope.rectanglePos+= 5;
                        }else{
                            $interval.cancel($scope.timer);
                            $scope.nextAttempt();
                        }
                    }, 100);
                };
                $scope.startAttempt();
                $scope.nextAttempt = function(){
                    if(this.attempt < 7){
                        this.results.push($scope.rectanglePos);
                        this.attempt++;
                        this.startAttempt();
                        this.rectanglePos = 0;
                    }else{
                        this.handleResults();
                    }
                };
                $scope.focusElement = function(){
                    var input = $element.find('input')[0];
                    input.focus();
                };
                $scope.focusElement();

                $scope.getResult = function() {
                    var fullResult = {
                        result : "",
                        fail : 0,
                        correct : 0
                    };
                    angular.forEach($scope.results, function(result){
                        if(result < $scope.limitY - 6 || result > $scope.limitY + 6){
                            fullResult.fail++;
                        }else{
                            fullResult.correct++;
                        }
                    });
                    fullResult.result = Math.floor(fullResult.correct / (fullResult.fail + fullResult.correct) * 100) + "% правильных";
                    return fullResult;
                };

                $scope.handleResults = function() {
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
