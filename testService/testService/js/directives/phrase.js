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
                    for(var i = 0; i < text.length; i++){
                        if(this.phrase[i].char ===  text.charAt(i)){
                            this.phrase[i].highlight = "highlight";
                        }else{
                            $scope.phrase = randomService.getPhrase(11);
                            $scope.typed = "";
                            this.fail++;
                            break;
                        }
                    }
                };
                $scope.focusElement = function(){
                    var input = $element.find('input')[0];
                    input.focus();
                };
                $scope.focusElement();
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
