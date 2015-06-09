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
                question: '=',
                nextaction: '@'
            },
            templateUrl: 'templates/random.html',
            controller: function ($scope, $interval) {
                $scope.array = [0, 0, 0, 0, 0, 0, 0];
                $scope.startTime = new Date().getTime();
                $scope.results = 0;
                $scope.answer = "";
                $scope.progress = 0;
                $scope.isShowAnswer = false;
                $scope.initTimer = function () {
                    this.timer = $interval(function () {
                        $scope.isShowAnswer = true;
                    }, ($scope.progress * 1 + 5) * 1000);
                };
                $scope.start = function () {
                    this.initTimer();
                    this.array[0] = randomService.getRandomInt(1, 99);
                    this.array[1] = randomService.getRandomInt(1, 99);
                    this.array[2] = randomService.getRandomInt(1, 99);
                };
                $scope.start();

                $scope.next = function () {
                    $interval.cancel(this.timer);
                    this.initTimer();
                    $scope.isShowAnswer = false;
                    this.results += this.answer == this.sumArray() ? 1 : 0;
                    this.progress++;
                    $scope.answer = "";
                    switch (this.progress) {
                        case 1:
                            {
                                this.array[0] = randomService.getRandomInt(1, 99);
                                this.array[1] = randomService.getRandomInt(1, 99);
                                this.array[2] = randomService.getRandomInt(1, 99);
                                this.array[3] = randomService.getRandomInt(1, 99);
                                break;
                            }
                        case 2:
                            {
                                this.array[0] = randomService.getRandomInt(1, 99);
                                this.array[1] = randomService.getRandomInt(1, 99);
                                this.array[2] = randomService.getRandomInt(1, 99);
                                this.array[3] = randomService.getRandomInt(1, 99);
                                this.array[4] = randomService.getRandomInt(1, 99);
                                break;
                            }
                        case 3:
                            {
                                this.array[0] = randomService.getRandomInt(1, 99);
                                this.array[1] = randomService.getRandomInt(1, 99);
                                this.array[2] = randomService.getRandomInt(1, 99);
                                this.array[3] = randomService.getRandomInt(1, 99);
                                this.array[4] = randomService.getRandomInt(1, 99);
                                this.array[5] = randomService.getRandomInt(1, 99);
                                break;
                            }
                        case 4:
                            {
                                this.array[0] = randomService.getRandomInt(1, 99);
                                this.array[1] = randomService.getRandomInt(1, 99);
                                this.array[2] = randomService.getRandomInt(1, 99);
                                this.array[3] = randomService.getRandomInt(1, 99);
                                this.array[4] = randomService.getRandomInt(1, 99);
                                this.array[5] = randomService.getRandomInt(1, 99);
                                this.array[6] = randomService.getRandomInt(1, 99);
                                break;
                            }
                        default:
                            {
                                this.handleResults();
                            }
                            $scope.answer = "";
                    }
                };
                $scope.sumArray = function () {
                    var sum = '';
                    angular.forEach($scope.array, function (value) {
                        if (value != 0) {
                            sum = sum + value.toString();
                        }
                    });
                    return sum;
                };

                $scope.getResult = function (result) {
                    var results = [
                        "Высокий результат", "Средний результат", "Низкий результат"
                    ];
  
                    switch (true) {
                        case (result > 4):
                            result = results[0];
                            break;
                        case (result == 4):
                            result = results[1];
                            break;
                        default:
                            result = results[2];
                    }
                    return result;
                };

                $scope.handleResults = function () {
                    $interval.cancel(this.timer);
                    var correct = 0;
                    var fail = 0;
                    var timeSpend = Math.floor((new Date().getTime() - $scope.startTime) / 1000);

                    $scope.$emit("testDone", {
                        Fail: this.progress - this.results,
                        Correct: this.results,
                        Neutral: 0,
                        Try: 1,
                        Result: $scope.getResult(this.results),
                        Timestamp: new Date(),
                        TimeSpend: timeSpend,
                        isDone: true
                    })
                };
            }
        }
    });
