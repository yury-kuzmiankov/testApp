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
            controller: function($scope, $element, $timeout) {
                $scope.startTime = new Date().getTime();
                $scope.fails = 0;
                $scope.traking = false;
                $scope.cellSize = 30;
                $scope.limit = 60000;
                $scope.sides = {
                    top : "border-top",
                    left : "border-right"
                };
                $scope.initMaze = function(){
                    this.maze = [];

                    for (var rows=0; rows<13; rows++){
                        this.maze[rows] = [];
                    }
                    this.maze[0].top = new Array(1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[0].left = new Array(0,0,1,0,1,0,0,0,0,1,0,1);
                    this.maze[1].top = new Array(1,0,0,0,1,0,1,1,1,0,1,1);
                    this.maze[1].left = new Array(0,1,1,0,0,1,1,0,0,1,0,1);
                    this.maze[2].top = new Array(1,0,1,0,1,0,0,1,1,0,1,1);
                    this.maze[2].left = new Array(0,0,0,0,1,1,1,0,0,0,0,1);
                    this.maze[3].top = new Array(0,1,1,1,1,1,0,0,0,0,1,1);
                    this.maze[3].left = new Array(1,0,0,1,0,0,0,1,1,0,0,1);
                    this.maze[4].top = new Array(0,0,0,0,0,0,1,1,1,1,1,1);
                    this.maze[4].left = new Array(1,1,1,1,1,0,0,0,0,0,1,1);
                    this.maze[5].top = new Array(0,0,0,0,1,0,1,1,1,1,0,0);
                    this.maze[5].left = new Array(1,1,1,1,1,1,0,0,0,1,0,1);
                    this.maze[6].top = new Array(0,0,0,0,0,0,1,1,0,1,0,1);
                    this.maze[6].left = new Array(1,1,1,1,1,1,0,0,0,1,0,1);
                    this.maze[7].top = new Array(1,0,1,0,0,0,1,0,1,1,0,1);
                    this.maze[7].left = new Array(1,1,1,0,1,0,0,1,0,1,1,1);
                    this.maze[8].top = new Array(0,0,0,1,0,0,1,1,0,0,0,0);
                    this.maze[8].left = new Array(0,1,0,1,1,0,0,0,1,1,0,1);
                    this.maze[9].top = new Array(0,0,0,0,0,1,1,1,1,0,1,1);
                    this.maze[9].left = new Array(1,1,1,1,0,0,0,0,0,1,1,1);
                    this.maze[10].top = new Array(0,0,0,0,0,1,1,1,1,1,0,0);
                    this.maze[10].left = new Array(1,1,1,0,1,0,0,0,0,1,0,1);
                    this.maze[11].top = new Array(0,0,1,1,1,1,1,1,1,0,0,0);
                    this.maze[11].left = new Array(1,0,1,0,0,0,0,0,0,0,1,1);
                    this.maze[12].top = new Array(0,0,0,0,0,1,1,1,1,0,1,0);
                    this.maze[12].left = new Array(1,1,0,1,0,0,0,1,0,0,1,1);
                    $scope.startPos = {
                        x : 6,
                        y : 5
                    };
                    $scope.success = {
                        x : 0,
                        y : 0
                    };
                    $scope.progress = angular.copy($scope.startPos);
                };

                $scope.initPath = function(){
                    this.maze = [];
                    this.cellSize = 50;
                    for (var rows=0; rows<7; rows++){
                        this.maze[rows] = [];
                    }
                    this.maze[0].top = new Array(1,1);
                    this.maze[0].left = new Array(0,1);
                    this.maze[1].top = new Array(0,0);
                    this.maze[1].left = new Array(0,1);
                    this.maze[2].top = new Array(0,1);
                    this.maze[2].left = new Array(0,1);
                    this.maze[3].top = new Array(1,0);
                    this.maze[3].left = new Array(0,1);
                    this.maze[4].top = new Array(0,1);
                    this.maze[4].left = new Array(0,1);
                    this.maze[5].top = new Array(1,0);
                    this.maze[5].left = new Array(0,1);
                    this.maze[6].top = new Array(1,0);
                    this.maze[6].left = new Array(1,1);

                    $scope.startPos = {
                        x : 0,
                        y : 0
                    };
                    $scope.success = {
                        x : 0,
                        y : 0
                    };
                    $scope.progress = angular.copy($scope.startPos);
                };

                $scope.init = function(){
                    if($scope.question.additional.type == "maze"){
                        $scope.initMaze();
                        var rand = randomService.getRandomInt(0, 2);
                        $scope.size = $scope.question.additional.size[rand];
                        switch ($scope.size) {
                            case "big":
                                $scope.limit = 60000;
                                break;
                            case "middle":
                                $scope.limit = 120000;
                                break;
                            default :
                                $scope.limit = 180000;
                        }
                    }else{
                        $scope.initPath();
                    }
                };

                $scope.init();

                $scope.initTimer = function(){
                    this.timer = $timeout(function(){
                        $scope.handleResults();
                    }, $scope.limit);
                };
                $scope.initTimer();

                $scope.startTracking = function(){
                    if(!$scope.traking){
                        $scope.traking = true;
                        $scope.circle = $element[0].querySelector('.circle');
                        $scope.fails++;
                        var table = $element[0].querySelector('table');
                        //$scope.addClass(table, 'active');

                    }
                };

                $scope.addClass = function(el, className){
                    if (el.classList)
                        el.classList.add(className);
                    else
                        el.className += ' ' + className;
                };

                $scope.removeClass = function(el, className) {
                    if (el.classList)
                        el.classList.remove(className);
                    else
                        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                };

                $scope.stopTracking = function(){
                    $scope.traking = false;
                    $scope.circle.style.top = 0;
                    $scope.circle.style.left = 0;
                    $scope.progress = angular.copy($scope.startPos);
                    var table = $element[0].querySelector('table');
                    $scope.removeClass(table, 'active');
                };

                $scope.getDirection = function($target){
                    var direction = {
                        top : false,
                        bottom : false,
                        left : false,
                        right : false
                    };

                    var targetPlace = {
                        row : $target.data().$scope.$parent.$index,
                        cell : $target.data().$scope.$index
                    };
                    var progress = $scope.progress;
                    if(targetPlace.row < progress.x){
                        direction.top = true;
                    }
                    if(targetPlace.row > progress.x){
                        direction.bottom = true;
                    }
                    if(targetPlace.cell < progress.y){
                        direction.left = true;
                    }
                    if(targetPlace.cell > progress.y){
                        direction.right = true;
                    }
                    var directions = 0;
                    angular.forEach(direction, function(value){
                        if(value){
                            directions++;
                        }
                    });
                    direction.mistake = directions > 1 ? true : false;
                    return direction;
                };

                $scope.getCirclePosition = function(){
                    var circlePosition = {
                        left : $scope.circle.style.left.replace("px", ""),
                        top : $scope.circle.style.top.replace("px", "")
                    };
                    circlePosition.left = circlePosition.left != "" ? parseInt(circlePosition.left, 10) : 0;
                    circlePosition.top = circlePosition.top != "" ? parseInt(circlePosition.top, 10) : 0;
                    return circlePosition;
                };

                $scope.moveTracking = function(e){
                    if($scope.traking){
                        var target = e.target;
                        var $target = angular.element(target);
                        $target = $target.hasClass('circle') ? $target.parent() : $target;
                        if($scope.circle.parentElement != $target[0] && $scope.lockTarget != $target[0]){
                            $scope.lockTarget = $target[0];
                            var maze = $scope.maze;
                            var start = $scope.progress;
                            var direction = $scope.getDirection($target);
                            if(!direction.mistake){
                                var circlePosition = $scope.getCirclePosition();
                                if(direction.left){
                                    if (maze[start.x]['left'][start.y - 1] == 0) {
                                        start.y--;
                                        $scope.circle.style.left = (circlePosition.left - this.cellSize) + 'px';
                                    }else{
                                        $scope.stopTracking();
                                    }
                                }
                                if(direction.right){
                                    if (maze[start.x]['left'][start.y] == 0) {
                                        start.y++;
                                        $scope.circle.style.left = (circlePosition.left + this.cellSize) + 'px';
                                    }else{
                                        $scope.stopTracking();
                                    }
                                }
                                if(direction.top){
                                    if (maze[start.x]['top'][start.y] == 0) {
                                        start.x--;
                                        $scope.circle.style.top = (circlePosition.top - this.cellSize) + 'px';
                                    }else{
                                        $scope.stopTracking();
                                    }
                                }
                                if(direction.bottom){
                                    if (maze[start.x + 1]['top'][start.y] == 0) {
                                        start.x++;
                                        $scope.circle.style.top = (circlePosition.top + this.cellSize) + 'px';
                                    }else{
                                        $scope.stopTracking();
                                    }
                                }
                                if(start.x == $scope.success.x && start.y == $scope.success.y){
                                    $scope.result = true;
                                    $scope.handleResults();
                                }
                            }else{
                                $scope.stopTracking();
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
                        var key = i == 0 ? 'top' : 'left';
                        if (maze[rowIndex][key][cellIndex] == 1) {
                            style[$scope.sides[key]] = "2px black solid";
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

                $scope.getResult = function(fail, result) {
                    var results = [
                        "Высокий результат", "Средний результат", "Низкий результат", "Не пройден"
                    ];
                    var result = "";
                    if($scope.question.additional.type == "maze"){
                        if(result){
                            result = results[3];
                        }else{
                            switch ($scope.size) {
                                case "big":
                                    switch (true) {
                                        case (fail < 2):
                                            result = results[0];
                                            break;
                                        case (fail == 2):
                                            result = results[1];
                                            break;
                                        case (fail < 6):
                                            result = results[2];
                                            break;
                                        default :
                                            result = results[3];
                                    }
                                    break;
                                case "middle":
                                    switch (true) {
                                        case (fail == 0):
                                            result = results[0];
                                            break;
                                        case (fail == 1):
                                            result = results[1];
                                            break;
                                        case (fail < 4):
                                            result = results[2];
                                            break;
                                        default :
                                            result = results[3];
                                    }
                                    break;
                                default :
                                    switch (true) {
                                        case (fail == 0):
                                            result = results[0];
                                            break;
                                        case (fail == 1):
                                            result = results[1];
                                            break;
                                        case (fail == 2):
                                            result = results[2];
                                            break;
                                        default :
                                            result = results[3];
                                    }
                            }
                        }
                    }else{
                        result = results[2];
                    }
                    return result;
                };

                $scope.handleResults = function() {
                    $timeout.cancel(this.timer);
                    $scope.fails--;
                    $scope.$emit("testDone", {
                        Fail: $scope.fails,
                        Correct: $scope.result ? 1 : 0,
                        Neutral: 0,
                        Try: $scope.fails == 0 ? 1 : $scope.fails,
                        Result: $scope.getResult($scope.fails, $scope.result),
                        Timestamp: new Date,
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    })
                };
            }
        }
    });
