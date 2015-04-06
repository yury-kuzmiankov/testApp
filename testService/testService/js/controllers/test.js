'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .controller('TestCtrl', function ($scope, testFactory, $routeParams, $location, chartService, helper, randomService, authService) {
      $scope.user = authService.getUserData();
      if($scope.user){
            $scope.$on('testDone', function (event, result) {
                console.log(result);
                var progress = $scope.progress;
                var questionId = $scope.questionId;
                $scope.currentTest.tests[progress].result = result;
                if($scope.user.Name != 'yury'){
                    $scope.currentTest.tests[progress].isDone = true;
                }
                helper.storage.set("currentTest" + $scope.user.Id, $scope.currentTest);
                $location.path("/test/" + progress + "/question/" + questionId + "/result");
            });
            testFactory.getTests().then(function (data) {
                $scope.allTests = data;
                $scope.currentTest = helper.storage.get("currentTest" + + $scope.user.Id);
                if ($scope.currentTest) {
                    if ($routeParams.testId === undefined) {
                        //go to first test
                        $location.path("/test/0/question/0/prepare");
                    } else {
                        testParser();
                    }
                } else {
                    testFactory.getTestsByUser().then(function (data) {
                        $scope.prevTests = data;
                        $scope.currentTest = genTest();
                        helper.storage.set("currentTest" + + $scope.user.Id, $scope.currentTest);
                        if ($routeParams.testId === undefined) {
                            //go to first test
                            $location.path("/test/0/question/0/prepare");
                        } else {
                            testParser();
                        }
                    });
                }
            });
        }else{
          $location.path("/");
        }


      var genTest = function () {
          var test = {
              isDone: false,
              tests: []
          };
          var allTests = angular.copy($scope.allTests.tests);
          var prevTests = $scope.prevTests;
          var possible = [];
          if($scope.user.Name != 'yury'){
              angular.forEach(prevTests, function (prevTest) {
                  for (var i = 0; i < allTests.length; i++) {
                      if (prevTest.TestId == allTests[i].id) {
                          allTests.splice(i, 1);
                          break;
                      }
                  }
              });
              allTests = randomService.shuffle(allTests);
              test.tests.push(allTests[0]);
              test.tests.push(allTests[1]);
          }else{
              test.tests = allTests;
          }
          return test;
      };

      var testParser = function () {
          var data = $scope.currentTest;
          var progress = $routeParams.testId ? $routeParams.testId : data.currentProgress;

          if (progress < data.tests.length) {
              var test = data.tests[progress];
              var questionId = $routeParams.questionId ? $routeParams.questionId : 0;
              if (questionId < test.questions.length && !test.isDone) {
                  var viewType = $routeParams.viewType ? $routeParams.viewType : 'prepare';
                  if (test.questions[questionId][viewType]) {
                      $scope.progress = parseInt(progress, 10);
                      $scope.questionId = parseInt(questionId, 10);
                      $scope.question = test.questions[questionId];
                      if (viewType === "result") {
                          chartService.donutSingleResult($scope);
                      }
                  } else {
                      redirectToView({
                          viewType: viewType,
                          progress: progress,
                          questionId: questionId
                      });
                  }
              } else {
                  redirectToTest({
                      progress: progress
                  });
              }
          } else {
              redirectToMainResult({
                  progress: progress
              });
          }
      }

      var redirectToView = function (data) {
          var nextView = null;
          switch (data.viewType) {
              case 'prepare':
                  {
                      nextView = 'options';
                      break;
                  }
              case 'option':
                  {
                      nextView = 'result';
                      break;
                  }
              default:
                  nextView = "";
          }
          if ($scope.currentTest.tests[data.progress].questions[data.questionId][nextView]) {
              $location.path("/test/" + data.progress + "/question/" + data.questionId + "/" + nextView);
          } else {
              redirectToTest({
                  progress: data.progress
              });
          }
      };

      var redirectToTest = function (data) {
          if (data.progress < $scope.currentTest.tests.length - 1) {
              $location.path("/test/" + (parseInt(data.progress, 10) + 1) + "/question/0/prepare");
          } else {
              redirectToMainResult({
                  progress: data.progress
              });
          }
      };

      var redirectToMainResult = function (data) {
          if (!$scope.currentTest.isDone) {
              if($scope.user.Name != 'yury'){
                  $scope.currentTest.isDone = true;
              }
              helper.storage.set("currentTest" + $scope.user.Id, $scope.currentTest);
              var results = [];
              var user = authService.getUserData();
              angular.forEach($scope.currentTest.tests, function (test) {
                  test.result.user = {
                    Id : user.Id
                  };
                  test.result.TestId = test.id;
                  results.push(test.result);
              });
              testFactory.saveTestsResults(results).then(function (data) {
                  $location.path("/");
              }, function (data) {
                  $location.path("/");
              });
              $location.path("/");
          }
         
      };
  });
