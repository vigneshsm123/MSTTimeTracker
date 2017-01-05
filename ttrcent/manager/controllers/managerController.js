angular.module('managerModule', [])
	.controller('managerController',function($scope, loginService){
		$scope.userLogout = function(){
			loginService.logout();
		};
		$scope.userName = sessionStorage.user;
	});