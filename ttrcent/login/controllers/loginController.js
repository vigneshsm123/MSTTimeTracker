angular.module('loginModule',[])
.controller('LoginController', function($scope, $rootScope, $window, $http, loginService) {
   $scope.username = '';
   $scope.password = '';    
   $scope.message='';        
   $scope.login = function(){
          if($scope.username !='' && $scope.password !=''){
             var res  = loginService.loginAuthentication($scope.username,$scope.password)
             if(!res){
                $scope.message='Wrong Username & Passsword';
                $scope.username = '';
                $scope.password = '';
             }
          }                            
          else
         	$scope.message='Please enter username & password';
	   }
	});