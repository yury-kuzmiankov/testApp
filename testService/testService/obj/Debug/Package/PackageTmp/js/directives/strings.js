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
            controller: function($scope, $timeout) {
                $scope.answer = null;
                $scope.isShowAnswer = false;

                $scope.initTimer = function(){
                    this.timer = $timeout(function(){
                        $scope.isShowAnswer = true;
                    }, 33000);
                };

                $scope.changeText = function(){
                    var rand = randomService.getRandomInt(0, this.question.options.length - 1);
                    this.test = $scope.question.options[rand];
                };

                $scope.start = function(){
                    this.initTimer();
                    this.changeText();
                };
                $scope.start();

                $scope.getResult = function(answer) {
                    var results = [
                        "Высокий результат", "Средний результат", "Низкий результат"
                    ];
                    var result = 0;
                    switch (true) {
                        case (answer == 5):
                            result = results[0];
                            break;
                        case (answer == 4):
                            result = results[1];
                            break;
                        default :
                            result = results[2];
                    }
                    return result;
                };

                $scope.handleResults = function() {
                    $scope.$emit("testDone", {
                        Fail: 0,
                        Correct: $scope.answer,
                        Neutral: 0,
                        Try: 1,
                        Result: $scope.getResult(parseInt($scope.answer, 10)),
                        Timestamp: new Date(),
                        TimeSpend: 33,
                        isDone: true
                    })
                };
            }
        }
    });
