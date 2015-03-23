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
                $scope.selectCell = function() {
                    if(this.cell.isSelected){
                        this.cell.isSelected = false;
                    }else{
                        this.cell.isSelected = true;
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
