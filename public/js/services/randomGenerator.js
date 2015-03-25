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

        var getPhrase = function(length){
            var text = [];
            var possible = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789";

            for(var i = 0; i < length; i++)
                text.push({
                    char : possible.charAt(Math.floor(Math.random() * possible.length))
                });
            return text;
        };

        return {
            getRandomInt : getRandomInt,
            shuffle : shuffle,
            getPhrase : getPhrase,
            getRandomArray : getRandomArray
        }
  });
