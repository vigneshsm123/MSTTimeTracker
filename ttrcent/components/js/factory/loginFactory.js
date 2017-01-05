angular.module('loginFactoryModule', [])
.factory('loginService', function($http, $window, $filter){
	return{
	   loginAuthentication : function(username,password, cb) {
		   var upColl = [];
		   $http({
			url:"data/loginAuth.json",
			method:"GET"		
			}).then(function(resp){
				upColl= resp.data;
				var filterResult = $filter('filter')(upColl,{'username' : username, 'password': password}, true);
				if(filterResult.length == 1) {
					cb(true);
					sessionStorage.setItem("user", filterResult[0].username);
					sessionStorage.setItem("role", filterResult[0].role);
					$window.location="#/"+ filterResult[0].role;			
				}
				else{
					cb(false);
					$window.location="#/";
				}	
			},function(resp){
				cb(false);
			});
		},	
		logout: function(){
			sessionStorage.user = '';
			sessionStorage.role = '';
			$window.location="#/";
		}	
	};
});