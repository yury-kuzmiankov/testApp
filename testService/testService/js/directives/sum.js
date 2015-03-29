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
            controller: function($scope, $interval, $location) {
                $scope.array = [0, 0, 0, 0, 0];
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
                        case 1:
                        case 2:
                        case 3:{
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

                $scope.handleResults = function() {
                    $interval.cancel(this.timer);
                    var selectedCount = 0;
                    angular.forEach($scope.question.options, function(option) {
                        if(option.isSelected){
                            selectedCount++;
                        }
                    });
                    $scope.question.results = selectedCount / $scope.question.options.length;
                    $location.path($scope.nextaction);
                };
            }
        }
    });
