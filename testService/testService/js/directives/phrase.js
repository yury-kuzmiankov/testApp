'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .directive('phrase', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/phrase.html',
            controller: function($scope, $element) {
                $scope.phrase = randomService.getPhrase(11);
                $scope.typed = "";
                $scope.fail = 0;
                $scope.startTime = new Date().getTime();
                $scope.checkKey = function(){
                    var text = this.typed;
                    var isFailed = false;
                    for(var i = 0; i < text.length; i++){
                        if(this.phrase[i].char ===  text.charAt(i)){
                            this.phrase[i].highlight = "highlight";
                        }else{
                            $scope.phrase = randomService.getPhrase(11);
                            $scope.typed = "";
                            this.fail++;
                            isFailed = true;
                            break;
                        }
                    }
                    if(text.length == this.phrase.length && !isFailed){
                        this.handleResults();
                    }
                };
                $scope.focusElement = function(){
                    var input = $element.find('input')[0];
                    input.focus();
                };
                $scope.focusElement();
                $scope.handleResults = function() {
                    $scope.$emit("testDone", {
                        Fail: $scope.fail,
                        Correct: $scope.phrase == $scope.typed,
                        Neutral: 0,
                        Try: $scope.fail + 1,
                        Result: $scope.phrase == $scope.typed ? "Правильно" : "Неправильно",
                        Timestamp: new Date(),
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    });
                };
            }
        }
  });
