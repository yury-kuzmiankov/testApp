'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('digitsquare', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question: '='
            },
            templateUrl: 'templates/digitsquare.html',
            controller: function ($scope, $interval) {
                $scope.startTime = new Date().getTime();
                $scope.resultArray = [];
                $scope.question.options = [];
                $scope.array = randomService.getRandomArray(1, 40, 25);;
                $scope.timer = $interval(function(){
                    $scope.handleResults();
                }, 90000);
                var initMatrix = function () {
                    var array = $scope.array;
                    var counter = 0;
                    array = _.uniq(array);
                    while(array.length < 25){
                        var random = randomService.getRandomInt(1, 40);
                        while(_.contains(array, random)){
                            random = randomService.getRandomInt(1, 40);
                        }
                        array.push(random);
                    }
                    for (var i = 0; i < 5; i++) {
                        $scope.question.options.push([]);
                        for (var j = 0; j < 5; j++) {
                            $scope.question.options[i].push(array[counter]);
                            counter++;
                        }
                    }
                    counter = 1;
                    for (var i = 0; i < 4; i++) {
                        $scope.resultArray.push([]);
                        for (var j = 0; j < 10; j++) {
                            $scope.resultArray[i].push({
                                isSelected : false,
                                content : counter,
                                try : 0
                            });
                            counter++;
                        }
                    }
                } ;
                initMatrix();

                $scope.selectCell = function () {
                    this.cell.isSelected = this.cell.isSelected ? false : true;
                    this.cell.try++;
                };

                $scope.handleResults = function () {
                    $interval.cancel($scope.timer);
                    var timeSpend = Math.floor((new Date().getTime() - $scope.startTime) / 1000);
                    var success = 0;
                    var results = [
                        "Высокий результат", "Средний результат", "Низкий результат"
                    ];
                    $scope.array = _.sortBy($scope.array);
                    for (var i = 0; i < 4; i++) {
                        for (var j = 0; j < 10; j++) {
                            if($scope.resultArray[i][j].isSelected && $scope.resultArray[i][j].try == 1){
                                if(!_.contains($scope.array, parseInt($scope.resultArray[i][j].content))){
                                    success++;
                                }
                            }
                        }
                    }
                    var result = "";
                    switch (true) {
                        case (timeSpend > 12):
                            result = results[0];
                            break;
                        default :
                            result = results[2];
                    }
                    $scope.$emit("testDone", {
                        Fail: 15 - success,
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
