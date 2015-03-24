'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .directive('testItem', function () {
        return {
            restrict: "E",
            scope: {
                progress : '=',
                test : '='
            },
            templateUrl: 'templates/testItem.html',
            controller: function($scope, $element, $compile) {
                $scope.currentNumber = 0;
                $scope.isPrepare = true;

                $scope.nextQuestion = function(showPrepare) {
                    $scope.currentNumber = showPrepare ? $scope.currentNumber + 1 : $scope.currentNumber;
                    if($scope.test){
                        $scope.question =  $scope.currentNumber < $scope.test.questions.length ? $scope.test.questions[$scope.currentNumber] : null;
                        if(showPrepare && $scope.question && $scope.question.prepareStatement){
                            $scope.isPrepare = true;
                        }else{
                            $scope.isPrepare = false;
                            var template = $compile("<" + $scope.test.type + " question=\"test.questions[currentNumber]\" nextQuestion=\"nextQuestion()\"></" + $scope.test.type + ">")($scope);
                            $element.append(template);
                        }
                    }
                };
            }
        }
  });
