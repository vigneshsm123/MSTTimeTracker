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



	// user controller


app.controller('userController', function($scope, $rootScope) {
		// create a message to display in our view
		$scope.userProjects = [{name: 'Fun Project'}, {name: 'NFDN'}];
		$scope.duration = 1;
		$scope.userComment = null;
		$scope.userProject = null;
		$scope.informations =[];
		$scope.myAlert = function(){
			if ($scope.userComment === null) {
				alert('fill the comment box');
			}
 			if ($scope.userProject === null) {
 				alert('Please select the project');
 			}
			else {
				$scope.userTable = true;
				$scope.informations.push({ Project: $scope.userProject.name , Duration: $scope.duration , Comment : $scope.userComment, userDateInfo: $rootScope.userCalDate, editTable : false});// [,{ Project: 'NFDN', Duration: '2', Comment : 'DDD'}];
				$scope.userProject = null;
				$scope.duration = 1;
				$scope.userComment = null;
			}
		}
		$scope.$watch('duration', function(newvalue, oldvalue){
			if($scope.duration > 24) {
				$scope.duration = 24;
				alert("Please enter the duration between the range of 1-24 hours");
			}
			else if($scope.duration < 1) {
				$scope.duration = 1;
				alert("Please enter the duration between the range of 1-24 hours");
				console.log($scope.userDate);
			}
		});
		$scope.removeUserinfo = function(index) {
			$scope.informations.splice(index, 1);
			console.log($scope.informations.length);
			if($scope.informations.length < 1) {
				$scope.userTable = false;
			}
		}

		$scope.editUserinfo = function(index, x) {
			$scope.informations[index].editTable = x;
		}
	}); 
	
app.directive('calender',  ['$rootScope', function($rootScope) {
	var date = new Date();
	var currDate = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
	$rootScope.userCalDate = currDate;
return {
    restrict: 'EA',
	// scope:{
	// 	myDirectiveVar: '='
	// 	}, 
    template: '<div class="form-group"><input type="text" id="mydate-user"  class="user-cal" gldp-id="mydate-user" value="'+currDate+'"/>'+
		'<div gldp-el="mydate-user"'+
			 'style="width:400px; height:300px; position:relative; top:0px; left:0px;">'+
		'</div></div>',
		 replace: true, 
    link: function(scope, iElement, attrs, rootScope) {
        //attrs references any attributes on the directive element in html
        //iElement is the actual DOM element of the directive,
        //so you can bind to it with jQuery
        //OR you could use that to find the element inside that needs the plugin      
		$('.user-cal').glDatePicker({showAlways:true, onClick: function(target, cell, date, data) {
			var selDate = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
			target.val(selDate);
			$rootScope.userCalDate = selDate;
		} });

       }
    };
}]);

})();


	
