
(function() {

	var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : "views/login.html",
		})
		.when('/dummy', {
			templateUrl : "views/dummy.html",
		})
		.otherwise({
			redirectTo : "/"
		});
	}]);
 
})();