'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .directive('colors', function () {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/colors.html',
            controller: function($scope) {
                $scope.priority = [];
                $scope.selectedCount = 0;
                $scope.selectColor = function() {
                    if(!this.option.isSelected){
                        this.option.isSelected = true;
                        $scope.priority.push(this.option);
                        $scope.selectedCount++;
                        if($scope.selectedCount == $scope.question.options.length){
                            $scope.handleResults();
                        }
                    }
                };

                $scope.getResult = function(isFirst, value) {
                    var result = "";
                    if(isFirst){
                        switch (value) {
                            case "12":
                                result = "чувство удовлетворенности, спокойствия, стремление к спокойной обстановке, нежелание участвовать в конфликтах, стрессе.";
                                break;
                            case "13":
                                result = "чувство целостности, активное и не всегда осознанное стремление к тесным отношениям. Потребность вовнимании со стороны других.";
                                break;
                        }
                    }else{
                        switch (value) {
                            case "12":
                                result = "чувство удовлетворенности, спокойствия, стремление к спокойной обстановке, нежелание участвовать в конфликтах, стрессе.";
                                break;
                            case "13":
                                result = "чувство целостности, активное и не всегда осознанное стремление к тесным отношениям. Потребность вовнимании со стороны других.";
                                break;
                        }
                    }
                    return result;
                };

                $scope.handleResults = function() {
                    var priority = $scope.priority;
                    var first = "";
                    var last = "";
                    if(priority.length > 0){
                        first = priority[0].key + priority[1].key;
                        last = priority[priority.length - 2].key + priority[priority.length - 1].key;
                    }
                    var result = $scope.getResult(true, first) + " || " + $scope.getResult(false, last);

                    $scope.$emit("testDone", {
                        Fail: 0,
                        Correct: 0,
                        Neutral: 0,
                        Try: 1,
                        Result: result,
                        Timestamp: new Date,
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    });
                };
            }
        }
  });
