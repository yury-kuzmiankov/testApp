'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('digits', function () {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/digits.html',
            controller: function($scope, $element) {
                var getMinValue = function(){
                    var color = $scope.question.additional.color;
                    var min = null;
                    angular.forEach($scope.question.options, function(row) {
                        angular.forEach(row, function(cell) {
                            if ((cell.color === color) && (min === null || min > parseInt(cell.content, 10))) {
                                min = parseInt(cell.content, 10);
                            }
                        });
                    });
                    return min;
                };

                $scope.getNextValue = function(current){
                    var color = $scope.question.additional.color;
                    var min = null;
                    angular.forEach($scope.question.options, function(row) {
                        angular.forEach(row, function(cell) {
                            var value = parseInt(cell.content, 10);
                            if ((cell.color === color) && ((min === null || min > value) && current < value)) {
                                min = value;
                            }
                        });
                    });
                    return min;
                };

                $scope.error = "";

                $scope.minValue = getMinValue();

                $scope.deselectAll = function() {
                    angular.forEach($scope.question.options, function(row) {
                        angular.forEach(row, function(cell) {
                            cell.isSelected = false;
                        });
                    });
                };

                $scope.selectCell = function() {
                    $scope.error = "";
                    if(this.cell.color === $scope.question.additional.color){
                        if(!this.cell.isSelected){
                            var value = parseInt(this.cell.content, 10);
                            if($scope.minValue === value || ($scope.getNextValue($scope.current) === value)){
                                $scope.current = value;
                                this.cell.isSelected = true;
                            }else{
                                $scope.error = "Выбрано некорректное значение. Начните сначала.";
                                $scope.deselectAll();
                            }
                        }
                    }else{
                        $scope.error = "Выбран неправильный цвет";
                        $scope.deselectAll();
                    }
                };
                $scope.handleResults = function() {
                    var selectedCount = 0;
                    angular.forEach($scope.question.options, function(row) {
                        angular.forEach(row, function(cell) {
                            if (cell.isSelected) {
                                selectedCount++;
                            }
                        });
                    });
                    $scope.question.results = selectedCount / $scope.question.options.length;
                };
            }
        }
    });
