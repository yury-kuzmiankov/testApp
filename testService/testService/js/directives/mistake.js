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
