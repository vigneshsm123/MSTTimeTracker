angular.module('loginModule',[])
.controller('LoginController', function($scope, $rootScope, $window, $http, $interval, loginService) {
   $scope.username = '';
   $scope.password = '';    
   $scope.message='';        
   $scope.login = function(){
          if($scope.username !='' && $scope.password !=''){
             loginService.loginAuthentication($scope.username,$scope.password,function(flag){
                 if(!flag){
                    $scope.message='Wrong Username & Passsword';
                    $scope.username = '';
                    $scope.password = '';
                 }
             });
          }                            
          else
         	$scope.message='Please enter username & password';
	   }
     $scope.timeDisp = "";
  $interval(function() {
      var day = new Date();
      var h = day.getHours();
      if( h >= 12) {
        h = h-12;
        $scope.timeDisp = h + ":" + day.getMinutes() + ":" + day.getSeconds() + " pm" ;  
      }
      else {
         $scope.timeDisp = h + ":" + day.getMinutes() + ":" + day.getSeconds() + " am" ; 
      }
    }, 1000);
	});