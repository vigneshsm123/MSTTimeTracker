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
		$scope.duration = 1;
		$scope.$watch('duration', function(newvalue, oldvalue){
			if($scope.duration > 24) {
				$scope.duration = 24;
				alert("Please enter the duration between the range of 1-24 hours");
			}
			else if($scope.duration < 1) {
				$scope.duration = 1;
				alert("Please enter the duration between the range of 1-24 hours");
			}
		}) 		
	}); 
	
app.directive('calender',  ['$rootScope', function($rootScope) {
return {
    restrict: 'EA',
    template: '<div class="form-group"><input type="text" id="mydate-user" class="user-cal" gldp-id="mydate-user" />'+
		'<div gldp-el="mydate-user"'+
			 'style="width:400px; height:300px; position:relative; top:0px; left:0px;">'+
		'</div></div>',
	// scope:{
				// imgurl : '@',
				// imginfo : '=',
				// redirect: '&'
			// }, 
    link: function(scope, iElement, attrs) {
        //attrs references any attributes on the directive element in html
        //iElement is the actual DOM element of the directive,
        //so you can bind to it with jQuery
        //OR you could use that to find the element inside that needs the plugin      
		$('.user-cal').glDatePicker({showAlways:true});
       }
    };
}]);

})();


	
