'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('digits', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question: '='
            },
            templateUrl: 'templates/digits.html',
            controller: function ($scope) {
                $scope.currentDescription = $scope.question.additional[randomService.getRandomInt(0,1)];
                $scope.current = 0;
                $scope.startTime = new Date().getTime();
                $scope.tried = 0;

                var generateArray = function (color) {
                    var array = [];
                    for (var i = 0; i < 24; i++) {
                        array.push({
                            color: color,
                            content: i + 1
                        });
                    }
                    return array;
                };

                var initMatrix = function () {
                    var redArray = generateArray("red");
                    var yellowArray = generateArray("yellow");
                    var array = randomService.shuffle(redArray.concat(yellowArray));
                    var index = 0;
                    for (var i = 0; i < 4; i++) {
                        $scope.question.options.push([]);
                        for (var j = 0; j < 12; j++) {
                            $scope.question.options[i].push(array[index]);
                            index++;
                        }
                    }
                } ();

                $scope.error = "";

                $scope.deselectAll = function () {
                    $scope.current = 0;
                    angular.forEach($scope.question.options, function (row) {
                        angular.forEach(row, function (cell) {
                            cell.isSelected = false;
                        });
                    });
                };

                $scope.selectCell = function () {
                    $scope.error = "";
                    if (this.cell.color === $scope.currentDescription.type) {
                        if (!this.cell.isSelected) {
                            var value = parseInt(this.cell.content, 10);
                            if ($scope.current + 1 === value) {
                                $scope.current = value;
                                this.cell.isSelected = true;
                                if(value == 24){
                                    $scope.handleResults();
                                }
                            } else {
                                $scope.tried++;
                                $scope.error = "Выбрано некорректное значение. Начните сначала.";
                                $scope.deselectAll();
                            }
                        }
                    } else {
                        $scope.tried++;
                        $scope.error = "Выбран неправильный цвет";
                        $scope.deselectAll();
                    }
                };
                $scope.handleResults = function () {
                    var timeSpend = Math.floor((new Date().getTime() - $scope.startTime) / 1000);
                    var tried = $scope.tried;
                    var results = [
                        "Высокий результат", "Средний результат", "Низкий результат"
                    ];
                    var result = "";
                    if(tried > 1){
                        result = results[2];
                    }else{
                        switch (true) {
                            case (timeSpend < 25 && tried == 0):
                                result = results[0];
                                break;
                            case (timeSpend < 25 && tried == 1):
                                result = results[1];
                                break;
                            case (25 <= timeSpend && timeSpend < 31 && tried == 0) :
                                result = results[1];
                                break;
                            default :
                                result = results[2];
                        }
                    }
                    $scope.$emit("testDone", {
                        Fail: 0,
                        Correct: 1,
                        Neutral: 0,
                        Try: $scope.tried + 1,
                        Result: result,
                        Timestamp: new Date,
                        TimeSpend: timeSpend,
                        isDone: true
                    });
                };


            }
        }
    });
