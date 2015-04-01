'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('compare', function () {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/compare.html',
            controller: function($scope) {
                $scope.original = [true, false, true, false, false,
                    true, false, true, true, false,
                    false, true, false, true, true, false];
                $scope.results = [];
                $scope.imageurl = null;
                $scope.startTime = new Date().getTime();

                $scope.setImage = function(){
                  this.imageurl = this.results.length + 1;
                };
                $scope.setImage();

                $scope.nextImage = function(isEqual) {
                    if(this.results.length < 15){
                        if(isEqual){
                            this.results.push(true);
                        }else{
                            this.results.push(false);
                        }
                        this.setImage();
                    }else{
                        this.handleResults();
                    }
                };

                $scope.getResult = function() {
                    var fullResult = {
                        result : "",
                        fail : 0,
                        correct : 0
                    };
                    angular.forEach($scope.results, function(result, index){
                        if(result != $scope.original[index]){
                            fullResult.fail++;
                        }else{
                            fullResult.correct++;
                        }
                    });
                    fullResult.result = Math.floor(fullResult.correct / (fullResult.fail + fullResult.correct) * 100) + "% правильных";
                    return fullResult;
                };

                $scope.handleResults = function() {
                    var result = $scope.getResult();
                    $scope.$emit("testDone", {
                        Fail: result.fail,
                        Correct: result.correct,
                        Neutral: 0,
                        Try: result.correct + result.fail,
                        Result: result.result,
                        Timestamp: new Date(),
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    });
                };
            }
        }
    });
