'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('mistake', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/mistake.html',
            controller: function($scope, $interval, $location) {
                $scope.blocks = [{}, {}, {}, {}, {}];
                $scope.isShowAnswer = false;
                $scope.answer = "";
                $scope.progress = 0;
                $scope.initTimer = function(){
                    this.timer = $interval(function(){
                        $scope.next();
                    }, 10000);
                };

                $scope.next = function() {
                    if(this.progress != 0){
                        $interval.cancel(this.timer);
                    }
                    if(this.progress < this.blocks.length){
                        this.initTimer();
                        this.blocks[this.progress] = randomService.getPhraseBlock(8);
                        this.activeBlock = this.blocks[this.progress];
                        this.progress++;
                    }else{
                        this.isShowAnswer = true;
                    }
                };
                $scope.next();

                $scope.handleResults = function() {
                    $interval.cancel(this.timer);
                    var correct = false;
                    var original = 0;
                    angular.forEach($scope.blocks, function(block){
                        original+= block.mistakes;
                    });
                    if($scope.answer == original){
                        correct = true;
                    }
                    $scope.$emit("testDone", {
                        Fail: correct ? 0 : 1,
                        Correct: correct ? 1 : 0,
                        Neutral: 0,
                        Try: 1,
                        Result: correct ? "Правильно" : "Неправильно",
                        Timestamp: new Date(),
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    });
                };
            }
        }
    });
