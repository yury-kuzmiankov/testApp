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
            controller: function($scope, $element) {
                $scope.selectColor = function() {
                    if(this.option.isSelected){
                        this.option.isSelected = false;
                    }else{
                        this.option.isSelected = true;
                    }
                };
                $scope.handleResults = function() {
                    var selectedCount = 0;
                    angular.forEach($scope.question.options, function(option) {
                       if(option.isSelected){
                           selectedCount++;
                       }
                    });
                    $scope.question.results = selectedCount / $scope.question.options.length;
                };
            }
        }
  });
