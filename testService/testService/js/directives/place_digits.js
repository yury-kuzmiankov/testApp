'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('placedigits', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question: '='
            },
            templateUrl: 'templates/place_digits.html',
            controller: function ($scope, $interval) {
                $scope.startTime = new Date().getTime();
                $scope.resultArray = [];
                $scope.question.options = [];
                $scope.array = randomService.getRandomArray(1, 99, 25);;
                $scope.timer = $interval(function(){
                    $scope.handleResults();
                }, 120000);
                var initMatrix = function () {
                    var array = $scope.array;
                    var counter = 0;
                    array = _.uniq(array);
                    while(array.length < 25){
                        var random = randomService.getRandomInt(1, 99);
                        while(_.contains(array, random)){
                            random = randomService.getRandomInt(1, 99);
                        }
                        array.push(random);
                    }
                    for (var i = 0; i < 5; i++) {
                        $scope.question.options.push([]);
                        $scope.resultArray.push([]);
                        for (var j = 0; j < 5; j++) {
                            $scope.question.options[i].push(array[counter]);
                            counter++;
                            $scope.resultArray[i].push({value : " "});
                        }
                    }
                } ;
                initMatrix();

                $scope.handleResults = function () {
                    $interval.cancel($scope.timer);
                    var timeSpend = Math.floor((new Date().getTime() - $scope.startTime) / 1000);
                    var success = 0;
                    var counter = 0;
                    var results = [
                        "Высокий результат", "Средний результат", "Низкий результат"
                    ];
                    $scope.array = _.sortBy($scope.array);
                    for (var i = 0; i < 5; i++) {
                        for (var j = 0; j < 5; j++) {
                            if($scope.array[counter] == $scope.resultArray[i][j].value){
                                success++;
                            }
                            counter++;
                        }
                    }
                    var result = "";
                    switch (true) {
                        case (timeSpend > 23):
                            result = results[0];
                            break;
                        case (timeSpend > 21):
                            result = results[1];
                            break;
                        default :
                            result = results[2];
                    }
                    $scope.$emit("testDone", {
                        Fail: 25 - success,
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
