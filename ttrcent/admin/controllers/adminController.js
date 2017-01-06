angular.module('adminModule', [])
	.controller('adminController',function($scope, $rootScope, $filter, $http, loginService) {
		//Roting Service returning function
		$scope.userLogout = function(){
			loginService.logout();
		};
		
		//user Tab function
		$scope.tab = 1;
	    $scope.setTab = function(newTab){
	      $scope.tab = newTab;
	    };
	    $scope.isSet = function(tabNum){
	      return $scope.tab === tabNum;
	    };
	    $scope.ProjectTab = 1;
	    $scope.setProjectTab = function(newTab){
	    	$scope.ProjectTab = newTab;
	    }
	     $scope.isProjectSet = function(tabNum){
	      return $scope.ProjectTab === tabNum;
	    };

		$scope.userName = sessionStorage.user;
	}); 