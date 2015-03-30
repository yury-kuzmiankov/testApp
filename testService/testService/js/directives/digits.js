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
                question: '=',
                nextaction: '@'
            },
            templateUrl: 'templates/digits.html',
            controller: function ($scope, $element, $interval, $location) {
                $scope.current = 0;
                $scope.startTime = new Date().getTime();
                $scope.tried = 1;

                $scope.timer = $interval(function () {
                    $scope.handleResults();
                }, 60000);

                $scope.$on('$destroy', function () {
                    $interval.cancel($scope.timer);
                });

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
                    if (this.cell.color === $scope.question.additional.type) {
                        if (!this.cell.isSelected) {
                            var value = parseInt(this.cell.content, 10);
                            if ($scope.current + 1 === value) {
                                $scope.current = value;
                                this.cell.isSelected = true;
                            } else {
                                $scope.tried++;
                                $scope.error = "Выбрано некорректное значение. Начните сначала.";
                                $scope.deselectAll();
                            }
                        }
                    } else {
                        $scope.error = "Выбран неправильный цвет";
                        $scope.deselectAll();
                    }
                };
                $scope.handleResults = function () {
                    var selectedCount = 0;
                    angular.forEach($scope.question.options, function (row) {
                        angular.forEach(row, function (cell) {
                            if (cell.isSelected) {
                                selectedCount++;
                            }
                        });
                    });
                    $scope.$emit("testDone", {
                        Fail: 0,
                        Correct: selectedCount,
                        Neutral: 0,
                        Try: $scope.tried,
                        Result: "",
                        Timestamp: new Date,
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    });
                    //$location.path($scope.nextaction);
                };


            }
        }
    });
