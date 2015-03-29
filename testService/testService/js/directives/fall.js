'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .directive('fall', function () {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/fall.html',
            controller: function($scope, $element, $interval, $location) {
                $scope.typed = "";
                $scope.attempt = 0;
                $scope.rectanglePos = 0;
                $scope.limitY = 500;
                $scope.results = [];
                $scope.startTime = new Date().getTime();
                $scope.checkKey = function(){
                    if(this.typed === ""){
                        $interval.cancel($scope.timer);
                        this.nextAttempt();
                    }
                };
                $scope.startAttempt = function(){
                    $scope.timer = $interval(function(){
                        if($scope.rectanglePos < 500){
                            $scope.rectanglePos+= 5;
                        }else{
                            $interval.cancel($scope.timer);
                            $scope.nextAttempt();
                        }
                    }, 100);
                };
                $scope.startAttempt();
                $scope.nextAttempt = function(){
                    if(this.attempt < 7){
                        this.results.push($scope.rectanglePos);
                        this.attempt++;
                        this.startAttempt();
                        this.rectanglePos = 0;
                    }else{
                        this.handleResults();
                    }
                };
                $scope.focusElement = function(){
                    var input = $element.find('input')[0];
                    input.focus();
                };
                $scope.focusElement();
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
