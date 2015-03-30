'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('figures', function () {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/figures.html',
            controller: function($scope) {
                $scope.priority = [];
                $scope.selectedCount = 0;
                $scope.startTime = new Date().getTime();
                $scope.selectFigure = function() {
                    if(!this.option.isSelected){
                        this.option.isSelected = true;
                        $scope.priority.push(this.option);
                        $scope.selectedCount++;
                        if($scope.selectedCount == $scope.question.options.length){
                            $scope.handleResults();
                        }
                    }
                };

                $scope.getResult = function(value) {
                    var result = "";
                    switch  (true) {
                        case (value >= 4):
                            result = "Высокий результат";
                            break;
                        case (value >= 3):
                            result = "Средний результат";
                            break;
                        default :
                            result = "Низкий результат";
                    }
                    return result;
                };

                $scope.handleResults = function() {
                    var priority = $scope.priority;
                    var first = 0;
                    if(priority.length > 0){
                        first = (parseInt(priority[0].key, 10) + parseInt(priority[1].key, 10)) / 2;
                    }
                    var result = $scope.getResult(first);

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
