'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('memoryshort', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question: '='
            },
            templateUrl: 'templates/memoryshort.html',
            controller: function ($scope, $interval) {
                $scope.startTime = new Date().getTime();
                $scope.resultArray = [];
                $scope.timer = $interval(function(){
                    $scope.showAnswer = true;
                    $interval.cancel($scope.timer);
                }, 20000);
                var initMatrix = function () {

                    for (var i = 0; i < 3; i++) {
                        $scope.resultArray.push([]);
                        for (var j = 0; j < 4; j++) {
                            $scope.resultArray[i].push({value : " "});
                        }
                    }
                } ;
                initMatrix();

                $scope.handleResults = function () {

                    var timeSpend = Math.floor((new Date().getTime() - $scope.startTime) / 1000);
                    var result = "";
                    for (var i = 0; i < 3; i++) {
                        for (var j = 0; j < 4; j++) {
                           result = result + $scope.resultArray[i][j].value + "|--|"
                        }
                    }

                    $scope.$emit("testDone", {
                        Fail: 0,
                        Correct: 0,
                        Neutral: 0,
                        Try: 1,
                        Result: result,
                        Timestamp: new Date(),
                        TimeSpend: timeSpend,
                        isDone: true
                    });
                };


            }
        }
    });
