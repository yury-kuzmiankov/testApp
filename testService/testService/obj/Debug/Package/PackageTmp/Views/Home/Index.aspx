<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html ng-app="libraryApp">
<head>
	<meta charset="utf-8">
    <title>Test system</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">

    <link href="components/bootstrap-bower/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link type="text/css" rel="stylesheet" href="styles/styles.css">
    <link type="text/css" rel="stylesheet" href="styles/tests.css">
    <link type="text/css" rel="stylesheet" href="components/nvd3/nv.d3.min.css">
    <link href="components/angular-ui-grid/ui-grid.min.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="components/angular/angular.min.js"></script>
    <script type="text/javascript" src="components/angular-route/angular-route.min.js"></script>
    <script type="text/javascript" src="components/angular-resource/angular-resource.min.js"></script>
    <script type="text/javascript" src="components/angular-cookies/angular-cookies.min.js"></script>
    <script type="text/javascript" src="components/d3/d3.js"></script>
    <script type="text/javascript" src="components/nvd3/nv.d3.js"></script>
    <script type="text/javascript" src="components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js"></script>
    <script src="components/angular-bootstrap/ui-bootstrap.min.js" type="text/javascript"></script>
    <script src="components/angular-ui-grid/ui-grid.min.js" type="text/javascript"></script>
</head>
<body>
    <div ng-controller="AppCtrl"></div>
	<nav class="navbar navbar-fixed-top header" ng-controller="MainCtrl">
	    <div class="col-md-12">
		    <div class="navbar-header">
			    <a href="#" class="navbar-brand">Тестовая система</a>
		    </div>
		    <div class="collapse navbar-collapse" id="navbar-collapse1">
			    <ul class="nav navbar-nav navbar-right">
				    <li><a ng-bind="user.FirstName"></a></li>
				    <li><a popover="{{dynamicPopover}}" popover-placement="bottom" popover-title="{{dynamicPopoverTitle}}"><i class="glyphicon glyphicon-user"></i></a></li>
			    </ul>
		    </div>
	    </div>
    </nav>
    <div class="navbar navbar-default" id="subnav" ng-controller="MainCtrl">
	    <div class="col-md-12">
		    <div class="collapse navbar-collapse" id="navbar-collapse2" >
			    <ul class="nav navbar-nav navbar-right">
                    <li><a href="#/" >Главная</a></li>
                    <li ng-show="isAuth"><a href="#/testresult">Результаты</a></li>
                    <li ng-show="isAuth"><a href="#/users">Пользователи</a></li>
				    <li ng-show="!isAuth"><a href="javascript:void(0);" role="button" data-toggle="modal" ng-click="login()">Войти</a></li>
                    <li ng-show="!isAuth"><a href="javascript:void(0);" ng-click="openregister()">Регистрация</a></li>
                    <li ng-show="isAuth"><a href="javascript:void(0);" ng-click="logout()">Выйти</a></li>
			    </ul>
		    </div>
	    </div>
    </div>
    <div class="container" id="main">
	    <div class="row">
		    <div>
			    <div class="panel panel-default text-center" >
				    <ng-view></ng-view>
			    </div>
		    </div>
	    </div>
    </div>

	<script src="js/app.js"></script>

    <script src="js/controllers/main.js"></script>
    <script src="js/controllers/about.js"></script>
    <script src="js/controllers/test.js"></script>
    <script src="js/controllers/result.js"></script>
    <script src="js/controllers/login.js"></script>
    <script src="js/controllers/testresult.js"></script>
    <script src="js/controllers/users.js"></script>

    <script src="js/services/test.js"></script>
    <script src="js/services/chartPreparer.js"></script>
    <script src="js/services/helper.js"></script>
    <script src="js/services/auth-service.js"></script>
    <script src="js/services/randomGenerator.js"></script>

    <script src="js/directives/colors.js"></script>
    <script src="js/directives/digits.js"></script>
    <script src="js/directives/figures.js"></script>
    <script src="js/directives/phrase.js"></script>
    <script src="js/directives/fall.js"></script>
    <script src="js/directives/compare.js"></script>
    <script src="js/directives/sum.js"></script>
    <script src="js/directives/random.js"></script>
    <script src="js/directives/mistake.js"></script>
    <script src="js/directives/maze.js"></script>
    <script src="js/directives/words.js"></script>
    <script src="js/directives/strings.js"></script>
    <script src="js/directives/questions.js"></script>
</body>
</html>
