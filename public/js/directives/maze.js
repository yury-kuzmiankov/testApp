'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('maze', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/maze.html',
            controller: function($scope, $element, $interval, $location) {
                $scope.fails = 0;
                $scope.traking = false;
                $scope.initMaze = function(){
                    this.maze = [];
                    this.sides = ["border-top", "border-right"];
                    for (var rows=0; rows<13; rows++){
                        this.maze[rows] = [];
                    }
                    this.maze[0][0] = new Array(1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[0][1] = new Array(0,0,1,0,1,0,0,0,0,1,0,1);
                    this.maze[1][0] = new Array(1,0,0,0,1,0,1,1,1,0,1,1);
                    this.maze[1][1] = new Array(0,1,1,0,0,1,1,0,0,1,0,1);
                    this.maze[2][0] = new Array(1,0,1,0,1,0,0,1,1,0,1,1);
                    this.maze[2][1] = new Array(0,0,0,0,1,1,1,0,0,0,0,1);
                    this.maze[3][0] = new Array(0,1,1,1,1,1,0,0,0,0,1,1);
                    this.maze[3][1] = new Array(1,0,0,1,0,0,0,1,1,0,0,1);
                    this.maze[4][0] = new Array(0,0,0,0,0,0,1,1,1,1,1,1);
                    this.maze[4][1] = new Array(1,1,1,1,1,0,0,0,0,0,1,1);
                    this.maze[5][0] = new Array(0,0,0,0,1,0,1,1,1,1,0,0);
                    this.maze[5][1] = new Array(1,1,1,1,1,1,0,0,0,1,0,1);
                    this.maze[6][0] = new Array(0,0,0,0,0,0,1,1,0,1,0,1);
                    this.maze[6][1] = new Array(1,1,1,1,1,1,0,0,0,1,0,1);
                    this.maze[7][0] = new Array(1,0,1,0,0,0,1,0,1,1,0,1);
                    this.maze[7][1] = new Array(1,1,1,0,1,0,0,1,0,1,1,1);
                    this.maze[8][0] = new Array(0,0,0,1,0,0,1,1,0,0,0,0);
                    this.maze[8][1] = new Array(0,1,0,1,1,0,0,0,1,1,0,1);
                    this.maze[9][0] = new Array(0,0,0,0,0,1,1,1,1,0,1,1);
                    this.maze[9][1] = new Array(1,1,1,1,0,0,0,0,0,1,1,1);
                    this.maze[10][0] = new Array(0,0,0,0,0,1,1,1,1,1,0,0);
                    this.maze[10][1] = new Array(1,1,1,0,1,0,0,0,0,1,0,1);
                    this.maze[11][0] = new Array(0,0,1,1,1,1,1,1,1,0,0,0);
                    this.maze[11][1] = new Array(1,0,1,0,0,0,0,0,0,0,1,1);
                    this.maze[12][0] = new Array(0,0,0,0,0,1,1,1,1,0,1,0);
                    this.maze[12][1] = new Array(1,1,0,1,0,0,0,1,0,0,1,1);
                    $scope.startPos = {
                        x : 5,
                        y : 6
                    };
                };
                $scope.initMaze();

                $scope.initTimer = function(){
                    this.timer = $interval(function(){
                        $scope.handleResults();
                    }, 160000);
                };
                $scope.initTimer();

                $scope.startTracking = function(event){
                    $scope.traking = true;
                    $scope.circle = $element[0].querySelector('.circle');
                };

                $scope.moveTracking = function(e){
                    if($scope.traking){
                        var target = e.target;
                        if($scope.circle.parentElement != target){
                            var maze = $scope.maze;
                            var $target = angular.element(target);
                            $target = $target.hasClass('circle') ? $target.parent() : $target;
                            var $circleParent = angular.element($scope.circle.parentElement);
                            var targetPlace = {
                                row : $target.data().$scope.$parent.$index,
                                cell : $target.data().$scope.$index
                            };
                            var circlePlace = {
                                row : $circleParent.data().$scope.$parent.$index,
                                cell : $circleParent.data().$scope.$index
                            };
                            if(targetPlace.row < circlePlace.row && !maze[targetPlace.row][0][targetPlace.cell]){
                                var top = $scope.circle.style('top');
                                $scope.circle.style('top', top - 30);

                            }

                        }
                    }
                };

                $scope.applyStyle = function(){
                    var rowIndex = this.$parent.$index;
                    var cellIndex = this.$index;
                    var maze = $scope.maze;
                    var style = {};
                    for (var i = 0; i < 2; i++) {
                        if (maze[rowIndex][i][cellIndex] == 1) {
                            style[$scope.sides[i]] = "2px black solid";
                        }
                    }
                    if ((0 == cellIndex) && (0 != rowIndex)){
                        style['border-left'] = "2px black solid";
                    }
                    if (rowIndex == maze.length - 1){
                        style['border-bottom'] = "2px black solid";
                    }
                    return style;
                };

                $scope.handleResults = function() {
                    $interval.cancel(this.timer);
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
