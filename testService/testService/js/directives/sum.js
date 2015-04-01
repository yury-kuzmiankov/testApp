'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('sum', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/sum.html',
            controller: function($scope, $interval) {
                $scope.array = [0, 0, 0, 0, 0];
                $scope.startTime = new Date().getTime();
                $scope.results = [];
                $scope.answer = "";
                $scope.progress = 0;
                $scope.initTimer = function(){
                    this.timer = $interval(function(){
                        $scope.next();
                    }, 15000);
                };
                $scope.start = function(){
                    this.initTimer();
                    this.array[0] = randomService.getRandomInt(1, 99);
                    this.array[1] = randomService.getRandomInt(1, 99);
                };
                $scope.start();

                $scope.next = function() {
                    $interval.cancel(this.timer);
                    this.initTimer();
                    this.results.push(this.answer == this.sumArray());
                    this.progress++;
                    switch (this.progress) {
                        case 1:{
                            this.array[0] = randomService.getRandomInt(1, 99);
                            this.array[1] = randomService.getRandomInt(1, 99);
                            this.array[2] = randomService.getRandomInt(1, 99);
                            break;
                        }
                        case 4:
                        case 5:{
                            this.array[0] = randomService.getRandomInt(1, 99);
                            this.array[1] = randomService.getRandomInt(1, 99);
                            this.array[2] = randomService.getRandomInt(1, 99);
                            this.array[3] = randomService.getRandomInt(1, 99);
                            break;
                        }
                        case 6:{
                            this.array[0] = randomService.getRandomInt(1, 99);
                            this.array[1] = randomService.getRandomInt(1, 99);
                            this.array[2] = randomService.getRandomInt(1, 99);
                            this.array[3] = randomService.getRandomInt(1, 99);
                            this.array[4] = randomService.getRandomInt(1, 99);
                            break;
                        }
                        default :{
                            this.handleResults();
                        }
                        $scope.answer = "";
                    }
                };
                $scope.sumArray = function() {
                    var sum = 0;
                    angular.forEach($scope.array, function(value) {
                        sum+= value;
                    });
                    return sum;
                };

                $scope.getResult = function(timeSpend, fail) {
                    var results = [
                        "Высокий результат", "Средний результат", "Низкий результат"
                    ];
                    var result = "";
                    if(fail > 1){
                        result = results[2];
                    }else{
                        switch (true) {
                            case (timeSpend < 35 && fail == 0):
                                result = results[0];
                                break;
                            case (timeSpend < 35 && fail == 1):
                                result = results[1];
                                break;
                            case (35 <= timeSpend && timeSpend < 50 && fail == 0) :
                                result = results[1];
                                break;
                            default :
                                result = results[2];
                        }
                    }
                    return result;
                };

                $scope.handleResults = function() {
                    $interval.cancel(this.timer);
                    var correct = 0;
                    var fail = 0;
                    var timeSpend = Math.floor((new Date().getTime() - $scope.startTime) / 1000);
                    angular.forEach($scope.results, function(result) {
                        if(result){
                            correct++;
                        }else{
                            fail++;
                        }
                    });


                    $scope.$emit("testDone", {
                        Fail: fail,
                        Correct: correct,
                        Neutral: 0,
                        Try: 1,
                        Result: $scope.getResult(timeSpend, fail),
                        Timestamp: new Date(),
                        TimeSpend: timeSpend,
                        isDone: true
                    })
                };
            }
        }
    });
