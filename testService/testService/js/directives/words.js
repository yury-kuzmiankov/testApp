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
            controller: function($scope, $element, $interval, $location) {
                $scope.array = ["НАРОД","СОЛНЦЕ","ПСИХИАТР","РАДОСТЬ","ПЛАВАНИЕ","КОМЕДИЯ","ОТЧАЯНИЕ","ЗАЙМ","РЕПОРТАЖ","КОНКУРС","ЛИЧНОСТЬ","ДЖИН","РАЙОН","НОВОСТЬ","ФАКТ","ЭКЗАМЕН","ЛАБОРАТОРИЯ","ОСНОВАНИЕ","ПРОКУРОР","ХОККЕЙ","ТРОИЦА","ТЕОРИЯ","ТЕЛЕВИЗОР","ПАМЯТЬ","ВОСПРИЯТИЕ","ЛЮБОВЬ"];
                $scope.results = [];
                $scope.line = "";
                $scope.initTimer = function(){
                    this.timer = $interval(function(){
                        $scope.next();
                    }, 60000);
                };
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
                    var word = textArea.value.substring(startPos, endPos)
                    for(var i = 0; i < $scope.array.length; i++){
                        if($scope.array[i] === word){
                            $scope.results.push(word);
                            break;
                        }
                    }
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
