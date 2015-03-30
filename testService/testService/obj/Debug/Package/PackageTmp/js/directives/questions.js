'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
    .directive('questions', function (randomService) {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/questions.html',
            controller: function($scope, $interval, authService) {
                $scope.results = [];
                $scope.answer = "";
                $scope.text = "";
                $scope.progress = 0;
                $scope.startTime = new Date().getTime();

                $scope.init = function(){
                  this.timerValues = [15000, 5000, 5000, 7000, 15000];
                  this.days = ["ПОНЕДЕЛЬНИК", "ВТОРНИК", "СРЕДА", "ЧЕТВЕРГ", "ПЯТНИЦА", "СУББОТА", "ВОСКРЕСЕНЬЕ"];
                  this.month = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ",
                      "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"];
                  this.monthEnum = ["ПЕРВОГО", "ВТОРОГО", "ТРЕТЬЕГО", "ЧЕТВЁРТОГО", "ПЯТОГО", "ШЕСТОГО", "СЕДЬМОГО", "ВОСЬМОГО",
                      "ДЕВЯТОГО", "ДЕСЯТОГО", "ОДИНАДЦАТОГО", "ДВЕНАДЦАТОГО"];
                  this.names = ["ЛЕОНИД", "АННА", "ВИКТОР"];
                  this.letters = [{
                      text : "ВЕКТОР",
                      position : "четвёртая",
                      char : "Р"
                  },
                  {
                      text : "ДВЕРНИЦА",
                      position : "пятая",
                      char : "И"
                  },
                  {
                      text : "ТВЕРДЬ",
                      position : "вторая",
                      char : "Е"
                  },
                  {
                      text : "ПОДАРОК",
                      position : "третья",
                      char : "И"
                  }];
                  this.wordConsonants = ["ТРАНСЛЯТОР","РАСТЯЖЕНИЕ", "ЛЕСОПИЛКА", "ВИКТОР", "ВЫСТУПЛЕНИЕ", "ТРАПЕЦИЯ", "ДРАМАТИК", "ДОРОЖНИК"];
                  this.numberEnum = {
                      "0" : "ПЕРВУЮ",
                      "1" : "ВТОРУЮ",
                      "2" : "ПРЕДПОСЛЕДНЮЮ",
                      "3" : "ПОСЛЕДНЮЮ"
                  };
                };

                $scope.init();

                $scope.initTimer = function(){
                    this.timer = $interval(function(){
                        $scope.stop();
                    }, this.timerValues[this.progress]);
                };

                $scope.checkAnswer = function() {
                    return this.answer == this.waitValue ? true : false;
                };

                $scope.getCharByPos = function(number, value) {
                    var char = "";
                    switch (number){
                        case 0 :
                            char = value.charAt(0);
                            break;
                        case 1 :
                            char = value.charAt(1);
                            break;
                        case 2 :
                            char = value.charAt(value.length - 2);
                            break;
                        case 3 :
                            char = value.charAt(value.length - 1);
                            break;
                    }
                    return char;
                };

                $scope.prepareTest = function() {
                    this.text = "";
                    switch (this.progress) {
                        case 0 :
                            var numberFirst = randomService.getRandomInt(0, 3);
                            var numberSecond = randomService.getRandomInt(0, 3);
                            var initValues = {
                              valueFirst : this.numberEnum[numberFirst],
                              name : this.names[randomService.getRandomInt(0, this.names.length - 1)],
                              valueSecond : this.numberEnum[numberSecond],
                              month : this.monthEnum[randomService.getRandomInt(0, this.month.length - 1)]
                            };
                            this.text = "Введите " + initValues.valueFirst + " букву имени " + initValues.name + " и " + initValues.valueSecond + " букву "
                                + initValues.month + " месяца года";
                            this.waitValue = this.getCharByPos(numberFirst, initValues.name) + this.getCharByPos(numberSecond, initValues.month);
                            break;
                        case 1 :
                            var user = authService.getUserData();
                            var name = "ЮРА";
                            var date = new Date();
                            var today = date.getDay();
                            var dayRandom = randomService.getRandomInt(0, this.days.length - 1);
                            var charRandom = randomService.getRandomInt(0, 3);
                            this.text = "Если сегодня не " + this.days[dayRandom] + " , напишите " + this.numberEnum[charRandom] + " , вашего имени";
                            this.waitValue = today != dayRandom ? this.getCharByPos(charRandom, name) : "";
                            break;
                        case 2 :
                            var firstValue = randomService.getRandomInt(1, 9);
                            var secondValue = randomService.getRandomInt(1, 9);
                            var letter = randomService.shuffle(this.letters)[0];
                            this.text = "Если в слове " + letter.text + " " + letter.position + " буква не " + letter.char +
                                " , напишите сумму чисел <" + firstValue + "> и <" + secondValue + ">";
                            this.waitValue = firstValue + secondValue;
                            break;
                        case 3 :
                            var word = randomService.shuffle(this.wordConsonants)[0];
                            this.text = "Удалите только согласные в слове " + word;
                            this.answer = word;
                            this.waitValue = randomService.removeConsonants(word);
                            break;
                        case 4 :
                            var randomArray = randomService.getRandomString(1, 9, 10);
                            this.answer = "";
                            this.text = "Удалите только чётные цифры в числе <" + randomArray + ">";
                            this.waitValue = randomService.removeEven(randomArray);
                            break;
                    }
                };

                $scope.stop = function() {
                    $interval.cancel(this.timer);
                    if(this.progress < 5){
                        var isCorrect = this.checkAnswer();
                        $scope.results.push(isCorrect);
                        this.isShowPrev = false;
                        this.isShowPrepare = true;
                        if(!isCorrect && (this.answer == "" || this.answer == null)){
                            this.isShowPrev = true;
                        }
                        this.progress++;
                    }else{
                        $scope.handleResults();
                    }

                };

                $scope.next = function() {
                    this.initTimer();
                    this.prepareTest();
                    this.isShowPrepare = false;
                };
                $scope.next();

                $scope.getResult = function(fail) {
                    var results = [
                        "Высокая лабильность", "Средняя лабильность", "Низкая лабильность", "Мало успешен в любой деятельности"
                    ];
                    var result = "";
                    switch (true) {
                        case (fail == 0):
                            result = results[0];
                            break;
                        case (fail == 1):
                            result = results[1];
                            break;
                        case (fail == 2) :
                            result = results[2];
                            break;
                        default :
                            result = results[3];
                    }
                    return result;
                };

                $scope.handleResults = function() {
                    $interval.cancel(this.timer);
                    var result = {
                        fail : 0,
                        correct : 0 
                    };
                    angular.forEach($scope.results, function(value) {
                        if(value){
                            result.correct++;
                        }else{
                            result.fail++;
                        }
                    });
                    $scope.$emit("testDone", {
                       Fail : result.fail,
                       Correct : result.correct,
                       Neutral : 0,
                       Try : 1,
                       Result : $scope.getResult(result.fail),
                       Timestamp: new Date(),
                       TimeSpend : Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                       isDone : true
                    });
                    //$location.path($scope.nextaction);
                };
            }
        }
    });
