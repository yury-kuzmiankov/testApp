'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('words', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/words.html',
            controller: function($scope, $element, $interval) {
                $scope.array = ["СОЛНЦЕ","РАЙОН","НОВОСТЬ","ФАКТ","ЭКЗАМЕН","ПРОКУРОР","ТЕОРИЯ","ХОККЕЙ","ТЕЛЕВИЗОР","ПАМЯТЬ","ВОСПРИЯТИЕ","ЛЮБОВЬ","СПЕКТАКЛЬ","РАДОСТЬ","НАРОД","ГИЕНА","РЕПОРТАЖ","КОНКУРС","ЛИЧНОСТЬ","ПЛАВАНИЕ","КОМЕДИЯ","ОТЧАЯНИЕ","ЛАБОРАТОРИЯ","ОСНОВАНИЕ","ПСИХИАТРИЯ"];
                $scope.startTime = new Date().getTime();
                $scope.results = [];
                $scope.fails = 0;
                $scope.correct = 0;
                $scope.result = 0;
                $scope.line = "";
                $scope.initTimer = function(){
                    this.timer = $interval(function(){
                        $scope.handleResults();
                    }, 120000);
                };
                $scope.initTimer();

                $scope.preparePhrase = function(){
                    $scope.line = randomService.getPhraseUpper(randomService.getRandomInt(10, 40));
                    $scope.array =  randomService.shuffle($scope.array);
                    angular.forEach($scope.array, function(value){
                        $scope.line = $scope.line + value + randomService.getPhraseUpper(randomService.getRandomInt(10, 40));
                    });
                };
                $scope.preparePhrase();

                $scope.selectWord = function(){
                    var textArea = $element[0].querySelector('textarea');
                    textArea.focus();
                    var startPos = textArea.selectionStart;
                    var endPos = textArea.selectionEnd;
                    var word = textArea.value.substring(startPos, endPos);
                    var isAlreadySelected = false;
                    for(var j = 0; j < $scope.results.length; j++){
                        if($scope.results[j] === word){
                            isAlreadySelected = true;
                            break;
                        }
                    }
                    var isCorrect = false;
                    if(!isAlreadySelected){
                        for(var i = 0; i < $scope.array.length; i++){
                            if($scope.array[i] === word){
                                $scope.results.push(word);
                                isCorrect = true;
                                break;
                            }
                        }
                    }
                    if(isCorrect){
                        $scope.result++;
                        $scope.correct++;
                    }else{
                        $scope.result--;
                        $scope.fails++;
                    }

                };

                $scope.getResult = function(value) {
                    var result = "";
                    switch  (true) {
                        case (value >= 20):
                            result = "Высокий результат";
                            break;
                        case (value >= 19):
                            result = "Средний результат";
                            break;
                        default :
                            result = "Низкий результат";
                    }
                    return result;
                };

                $scope.handleResults = function() {
                    $interval.cancel(this.timer);

                    $scope.$emit("testDone", {
                        Fail: $scope.fails,
                        Correct: $scope.correct,
                        Neutral: 0,
                        Try: 1,
                        Result: $scope.getResult($scope.result),
                        Timestamp: new Date,
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    })
                };
            }
        }
    });
