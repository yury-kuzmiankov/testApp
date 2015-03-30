'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('TestCtrl',  function ($scope, testFactory, $routeParams, $location, chartService) {
    $scope.$on("testDone", function(event, result){
        console.log(result);
        $location.path("/test/" + $scope.progress + "/question/" + $scope.progress + "/result");
    });
    testFactory.getTests().then(function(data) {
        $scope.data = data;
        if($routeParams.testId === undefined){
            //go to first test
            $location.path("/test/0/question/0/prepare");
        }else{
            testParser();
        }
      });

        var testParser = function(){
            var data = $scope.data;
            var progress = $routeParams.testId ? $routeParams.testId : data.currentProgress;

            if(progress < data.tests.length){
                var test = data.tests[progress];
                var questionId = $routeParams.questionId ? $routeParams.questionId : 0;
                if(questionId < test.questions.length){
                    var viewType = $routeParams.viewType ? $routeParams.viewType : 'prepare';
                    if(test.questions[questionId][viewType]){
                        $scope.progress =  parseInt(progress, 10);
                        $scope.questionId =  parseInt(questionId, 10);
                        $scope.question = test.questions[questionId];
                        if(viewType === "result"){
                            chartService.donutSingleResult($scope);
                        }
                    }else {
                        redirectToView({
                            viewType : viewType,
                            progress : progress,
                            questionId : questionId
                        });
                    }
                }else{
                    redirectToTest({
                        progress : progress
                    });
                }
            }else{
                redirectToMainResult({
                    progress : progress
                });
            }
        }

        var redirectToView = function(data){
            var nextView = null;
            switch (data.viewType) {
                case 'prepare':{
                    nextView = 'options';
                    break;
                }
                case 'option':{
                    nextView = 'result';
                    break;
                }
                default:
                    nextView = "";
            }
            if($scope.data.tests[data.progress].questions[data.questionId][nextView]){
                $location.path("/test/" + data.progress + "/question/" + data.questionId + "/" + nextView);
            }else{
                redirectToTest({
                    progress : data.progress
                });
            }
        };

        var redirectToTest = function(data){
            if(data.progress < $scope.data.tests.length - 1){
                $location.path("/test/" + (parseInt(data.progress, 10) + 1) + "/question/0/prepare");
            }else{
                redirectToMainResult({
                    progress : data.progress
                });
            }
        };

        var redirectToMainResult = function(data){
            $location.path("/test/" + data.progress + "/summary");
        };
  });
