'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .service('randomService', function () {

        var shuffle = function(array) {
            var i = array.length,
                j = 0,
                temp;

            while (i--) {

                j = Math.floor(Math.random() * (i+1));

                // swap randomly chosen element with current element
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;

            }
            return array;
        };

        var getRandomInt = function(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var getRandomArray = function(min, max, length){
            var array = [];
            for(var i = 0; i < length; i++){
                array.push(getRandomInt(min, max));
            }
            return array;
        };

        var getRandomString = function(min, max, length){
            var array = "";
            for(var i = 0; i < length; i++){
                array+= getRandomInt(min, max);
            }
            return array;
        };

        var getRandomChar = function(array){
            return array.charAt(Math.floor(Math.random() * array.length));
        };

        var getPhrase = function(length){
            var text = [];
            var possible = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789";

            for(var i = 0; i < length; i++)
                text.push({
                    char : getRandomChar(possible)
                });
            return text;
        };

        var getPhraseUpper = function(length){
            var text = "";
            var possible = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

            for(var i = 0; i < length; i++)
                text+= getRandomChar(possible);
            return text;
        };

        var getPhraseBlock = function(length){
            var possible = "ABCDEFGHIKLMNOPQRSTVXYZ";
            var block = {
              first : "",
              second : "",
              mistakes : 0
            };
            for(var i = 0; i < length; i++){
                var char = getRandomChar(possible);
                block.first+= char;
                block.second+= char;
            };
            var mistakes = getRandomInt(1, 3);
            block.mistakes = mistakes;
            for(var i = 0; i < mistakes; i++){
                var position = getRandomInt(0, length - 1);
                var char = getRandomChar(possible);
                while(char === block.second.charAt(position)){
                    char = getRandomChar(possible);
                }
                block.second = block.second.substr(0, position) + char + block.second.substr(position + 1);
            };

            return block;
        };

        var removeConsonants = function(word){
            var possible = "БВГДЖЗЙКЛМНПРСТФХЦЧШЩ";
            var result = "";
            for(var i = 0; i < word.length; i++){
                var char = word.charAt(i);
                var index = possible.indexOf(char);
                if(index == -1){
                    result+= char;
                }
            };
            return result;
        };

        var removeEven = function(array){
            var result = "";
            for(var i = 0; i < array.length; i++){
                var number = parseInt(array.charAt(i), 10);
                if(number % 2 === 1){
                    result+= number;
                }
            };
            return result;
        };

        return {
            getRandomInt : getRandomInt,
            shuffle : shuffle,
            getPhrase : getPhrase,
            getRandomArray : getRandomArray,
            getPhraseBlock : getPhraseBlock,
            getPhraseUpper : getPhraseUpper,
            removeConsonants : removeConsonants,
            removeEven : removeEven,
            getRandomString : getRandomString
        }
  });
