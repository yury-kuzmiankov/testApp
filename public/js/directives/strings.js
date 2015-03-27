'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('strings', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/strings.html',
            controller: function($scope, $interval, $location) {
                $scope.array = $scope.question.options;
                $scope.progress = 1;
                $scope.fails = 2;
                $scope.answer = null;
                $scope.isShowAnswer = false;

                $scope.initTimer = function(){
                    this.timer = $interval(function(){
                        $scope.next();
                    }, this.progress * 1000);
                };

                $scope.changeText = function(){
                    var rand = randomService.getRandomInt(0, this.array.length - 1);
                    this.test = $scope.array[rand];
                };

                $scope.start = function(){
                    this.initTimer();
                    this.changeText();
                };
                $scope.start();

                $scope.next = function() {
                    $interval.cancel(this.timer);
                    this.initTimer();
                    this.changeText();
                    this.fails++;
                    this.progress++;
                };

                $scope.stop = function() {
                    $interval.cancel(this.timer);
                    this.isShowAnswer = true;
                };

                $scope.handleResults = function() {
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
