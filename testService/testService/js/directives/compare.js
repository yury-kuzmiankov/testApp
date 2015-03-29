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
            controller: function($scope, $element) {
                $scope.results = [];
                $scope.imageurl = null;

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
                $scope.handleResults = function() {
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
