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
                $scope.cellSize = 21;
                $scope.circleSize = 7;
                $scope.limit = 1160000;
                $scope.sides = {
                    top : "border-top",
                    left : "border-right"
                };
                $scope.exit = {
                    x : 0,
                    y : 0
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
                        x : -14,
                        y : 350
                    };
                    $scope.success = {
                        x : 0,
                        y : 0
                    };
                    $scope.circle = $element[0].querySelector('.circle');
                    $scope.circle.style.top = $scope.startPos.y + 'px';
                    $scope.circle.style.left = window.innerWidth/2 +  $scope.startPos.x + 'px';
                    $scope.progress = angular.copy($scope.startPos);
                };

                $scope.initBigMaze = function(){
                    this.maze = [];

                    for (var rows=0; rows<23; rows++){
                        this.maze[rows] = [];
                    }
                    this.maze[0].top = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[0].left = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1);
                    this.maze[1].top = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0);
                    this.maze[1].left = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1);
                    this.maze[2].top = new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1);
                    this.maze[2].left = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1);
                    this.maze[3].top = new Array(0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[3].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[4].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[4].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[5].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[5].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[6].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[6].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[7].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[7].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[8].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[8].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[9].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[9].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[10].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[10].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[11].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[11].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[12].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[12].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[13].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[13].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[14].top = new Array(0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[14].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[15].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[15].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[16].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[16].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[17].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[17].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[18].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[18].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[19].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[19].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[20].top = new Array(0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[20].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[21].top = new Array(0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[21].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[22].top = new Array(0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    this.maze[22].left = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
                    $scope.startPos = {
                        x : -12,
                        y : 350
                    };
                    $scope.success = {
                        x : 0,
                        y : 0
                    };
                    $scope.circle = $element[0].querySelector('.circle');
                    $scope.circle.style.top = $scope.startPos.y + 'px';
                    $scope.circle.style.left = window.innerWidth/2 +  $scope.startPos.x + 'px';
                    $scope.progress = angular.copy($scope.startPos);
                };

                $scope.initPath = function(){
                    $scope.exit = {
                        x : 10,
                        y : 10
                    };
                    this.maze = [];
                    this.cellSize = 60;
                    $scope.circleSize = 18;
                    for (var rows=0; rows<6; rows++){
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
                    this.maze[5].left = new Array(1,1);

                    $scope.startPos = {
                        x : -8,
                        y : 260
                    };
                    $scope.success = {
                        x : 5,
                        y : 1
                    };
                    $scope.circle = $element[0].querySelector('.circle');
                    $scope.circle.style.top = $scope.startPos.y + 'px';
                    $scope.circle.style.left = window.innerWidth/2 +  $scope.startPos.x + 'px';
                    $scope.progress = angular.copy($scope.startPos);
                };

                $scope.init = function(){
                    if($scope.question.additional.type == "maze"){
                        $scope.circle = $element[0].querySelector('.circle');
                        var rand = randomService.getRandomInt(0, 2);
                        $scope.size = $scope.question.additional.size[rand];
                        switch ($scope.size) {
                            case "big":
                                $scope.limit = 180000;
                                $scope.initMaze();
                                break;
                            case "middle":
                                $scope.limit = 120000;
                                $scope.initMaze();
                                break;
                            default :
                                $scope.limit = 60000;
                                $scope.initMaze();
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

                $scope.startTracking = function(e){
                    if(!$scope.traking){
                        $scope.traking = true;
                        $scope.fails++;
                        var table = $element[0].querySelector('table');
                        $scope.circle.style.top = e.y - $scope.circleSize/2 + 'px';
                        $scope.circle.style.left = e.x - $scope.circleSize/2 + 'px';
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
                    $scope.circle.style.top = $scope.startPos.y + 'px';
                    $scope.circle.style.left = window.innerWidth/2 +  $scope.startPos.x + 'px';
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

                $scope.getDirectionCell = function(e){
                    var offset = {
                      x : e.offsetX,
                      y : e.offsetY
                    };
                    var sizes = {
                        cell : $scope.cellSize,
                        circle : $scope.circleSize
                    };
                    var direction = {
                        top : false,
                        bottom : false,
                        left : false,
                        right : false
                    };

                    if(offset.y < sizes.circle/2){
                        direction.top = true;
                    }
                    if(offset.y > (sizes.cell - sizes.circle/2)){
                        direction.bottom = true;
                    }
                    if(offset.x <= 0){
                        direction.left = true;
                    }
                    if(offset.x > (sizes.cell - sizes.circle/2)){
                        direction.right = true;
                    }
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
                $scope.moveTracking1 = function(e) {
                    if ($scope.traking) {

                        var direction = $scope.getDirectionCell(e);
                        var maze = $scope.maze;
                        var $target = angular.element(e.target);
                        var target = {
                            x : $target.data().$scope.$parent.$index,
                            y : $target.data().$scope.$index
                        };
                        $scope.circle.style.top = e.y - $scope.circleSize/2 + 'px';
                        $scope.circle.style.left = e.x - $scope.circleSize/2 + 'px';
                        if(target.x == $scope.success.x && target.y == $scope.success.y){
                            $scope.result = true;
                            $scope.handleResults();
                        }
                        if(direction.left){
                            if (maze[target.x]['left'][target.y - 1] != 0) {
                                $scope.stopTracking();
                            }
                        }
                        if(direction.right){
                            if (maze[target.x]['left'][target.y] != 0) {
                                $scope.stopTracking();
                            }
                        }
                        if(direction.top){
                            if (maze[target.x]['top'][target.y] != 0) {
                                $scope.stopTracking();
                            }
                        }
                        if(direction.bottom){
                            if (maze[target.x + 1]['top'][target.y] != 0) {
                                $scope.stopTracking();
                            }
                        }
                    }
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
                    var exit = $scope.exit;
                    var style = {};
                    for (var i = 0; i < 2; i++) {
                        var key = i == 0 ? 'top' : 'left';
                        if (maze[rowIndex][key][cellIndex] == 1) {
                            style[$scope.sides[key]] = "2px black solid";
                        }
                    }
                    if (exit.x == rowIndex && exit.y == cellIndex){

                    }else{
                        if (0 == cellIndex){
                            style['border-left'] = "2px black solid";
                        }
                        if (rowIndex == maze.length - 1){
                            style['border-bottom'] = "2px black solid";
                        }
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
