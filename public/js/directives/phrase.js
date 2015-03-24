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
                $scope.checkKey = function(){
                    var i = 0;
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
