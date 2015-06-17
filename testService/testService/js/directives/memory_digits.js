'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('memorydigits', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question: '='
            },
            templateUrl: 'templates/memory_digits.html',
            controller: function ($scope, $interval) {
                $scope.startTime = new Date().getTime();
                $scope.resultArray = [];
                $scope.question.options = [];
                $scope.array = randomService.getRandomArray(1, 99, 12);;
                $scope.timer = $interval(function(){
                    $scope.showAnswer = true;
                    $interval.cancel($scope.timer);
                }, 20000);
                var initMatrix = function () {
                    var array = $scope.array;
                    var counter = 0;
                    array = _.uniq(array);
                    while(array.length < 12){
                        var random = randomService.getRandomInt(1, 99);
                        while(_.contains(array, random)){
                            random = randomService.getRandomInt(1, 99);
                        }
                        array.push(random);
                    }
                    for (var i = 0; i < 3; i++) {
                        $scope.question.options.push([]);
                        $scope.resultArray.push([]);
                        for (var j = 0; j < 4; j++) {
                            $scope.question.options[i].push(array[counter]);
                            counter++;
                            $scope.resultArray[i].push({value : " "});
                        }
                    }
                } ;
                initMatrix();

                $scope.handleResults = function () {

                    var timeSpend = Math.floor((new Date().getTime() - $scope.startTime) / 1000);
                    var success = 0;
                    var results = [
                        "Высокий результат", "Низкий результат"
                    ];
                    $scope.array = _.sortBy($scope.array);
                    for (var i = 0; i < 3; i++) {
                        for (var j = 0; j < 4; j++) {
                            if(_.contains($scope.array, parseInt($scope.resultArray[i][j].value))){
                                success++;
                            }
                        }
                    }
                    var result = "";
                    switch (true) {
                        case (timeSpend > 6):
                            result = results[0];
                            break;
                        default :
                            result = results[1];
                    }
                    $scope.$emit("testDone", {
                        Fail: 12 - success,
                        Correct: success,
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
