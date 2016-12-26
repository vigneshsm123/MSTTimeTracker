(function () {
	var app = angular.module('myApp', ['ngRoute']);
	app.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : "views/login.html"
		})
		
		.when('/user', {
			templateUrl : "views/user.html",
			controller: "userController"

		})
		.when('/404', {
			templateUrl : "views/404.html"
		})
		.otherwise({
			redirectTo : "/404"
		});
}]);
app.controller('userController', function($scope) {
		// create a message to display in our view
		$scope.message = 'LoginController';
	}); 	
})();