<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html ng-app="libraryApp">
<head>
	<meta charset="utf-8">
    <title>Test system</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">

    <link type="text/css" rel="stylesheet" href="styles/styles.css">
    <link href="../../styles/bootstrap-theme.css" rel="stylesheet" media="screen">

    <link type="text/css" rel="stylesheet" href="styles/tests.css">
    <link type="text/css" rel="stylesheet" href="components/nvd3/nv.d3.min.css">

    <script type="text/javascript" src="components/angular/angular.min.js"></script>
    <script type="text/javascript" src="components/angular-route/angular-route.min.js"></script>
    <script type="text/javascript" src="components/angular-resource/angular-resource.min.js"></script>
    <script type="text/javascript" src="components/angular-cookies/angular-cookies.min.js"></script>
    <script type="text/javascript" src="components/d3/d3.js"></script>
    <script type="text/javascript" src="components/nvd3/nv.d3.js"></script>
    <script type="text/javascript" src="components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js"></script>

</head>
<body>
	    <nav class="navbar navbar-fixed-top header">
	    <div class="col-md-12">
		    <div class="navbar-header">

			    <a href="#" class="navbar-brand">Bootstrap</a>
			    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse1">
				    <i class="glyphicon glyphicon-search"></i>
			    </button>

		    </div>
		    <div class="collapse navbar-collapse" id="navbar-collapse1" ng-controller="AppCtrl">
			    <form class="navbar-form pull-left">
				    <div class="input-group" style="max-width:470px;">
					    <input type="text" class="form-control" placeholder="Search" name="name" id="name" ng-model="auth.name">
                        <input type="text" class="form-control" placeholder="Search" name="password" id="password" ng-model="auth.password">
					    <div class="input-group-btn">
						    <button class="btn btn-default btn-primary" type="submit" ng-click="signin()"><i class="glyphicon glyphicon-search"></i></button>
					    </div>
				    </div>
			    </form>
			    <ul class="nav navbar-nav navbar-right">
				    <li><a href="http://www.bootply.com" target="_ext">Bootply+</a></li>
				    <li>
					    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-bell"></i></a>
					    <ul class="dropdown-menu">
						    <li><a href="#"><span class="badge pull-right">40</span>Link</a></li>
						    <li><a href="#"><span class="badge pull-right">2</span>Link</a></li>
						    <li><a href="#"><span class="badge pull-right">0</span>Link</a></li>
						    <li><a href="#"><span class="label label-info pull-right">1</span>Link</a></li>
						    <li><a href="#"><span class="badge pull-right">13</span>Link</a></li>
					    </ul>
				    </li>
				    <li><a href="#" id="btnToggle"><i class="glyphicon glyphicon-th-large"></i></a></li>
				    <li><a href="#"><i class="glyphicon glyphicon-user"></i></a></li>
			    </ul>
		    </div>
	    </div>
    </nav>
    <div class="navbar navbar-default" id="subnav">
	    <div class="col-md-12">
		    <div class="navbar-header">

			    <a href="#" style="margin-left:15px;" class="navbar-btn btn btn-default btn-plus dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-home" style="color:#dd1111;"></i> Home <small><i class="glyphicon glyphicon-chevron-down"></i></small></a>
			    <ul class="nav dropdown-menu">
				    <li><a href="#"><i class="glyphicon glyphicon-user" style="color:#1111dd;"></i> Profile</a></li>
				    <li><a href="#"><i class="glyphicon glyphicon-dashboard" style="color:#0000aa;"></i> Dashboard</a></li>
				    <li><a href="#"><i class="glyphicon glyphicon-inbox" style="color:#11dd11;"></i> Pages</a></li>
				    <li class="nav-divider"></li>
				    <li><a href="#"><i class="glyphicon glyphicon-cog" style="color:#dd1111;"></i> Settings</a></li>
				    <li><a href="#"><i class="glyphicon glyphicon-plus"></i> More..</a></li>
			    </ul>


			    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse2">
				    <span class="sr-only">Toggle navigation</span>
				    <span class="icon-bar"></span>
				    <span class="icon-bar"></span>
				    <span class="icon-bar"></span>
			    </button>

		    </div>
		    <div class="collapse navbar-collapse" id="navbar-collapse2">
			    <ul class="nav navbar-nav navbar-right">
				    <li class="active"><a href="#">Posts</a></li>
				    <li><a href="#loginModal" role="button" data-toggle="modal">Login</a></li>
				    <li><a href="#aboutModal" role="button" data-toggle="modal">About</a></li>
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
