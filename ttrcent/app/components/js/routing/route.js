
angular.module('routeModule',[])
.config(['$routeProvider',function($routeProvider) {
      $routeProvider.when('/', {
                     templateUrl : "login/views/login.html",
                     controller: "LoginController",
                     authenticated:false,
					 role:"none"

      })
     
      .when('/user', {
                     templateUrl : "user/views/user.html",
                     controller: "userController",
                     authenticated:true,
					 role:"user"

      })
	  .when('/manager', {
                     templateUrl : "manager/views/manager.html",
                     controller: "managerController",
                     authenticated:true,
					 role:"manager"

      })
	  .when('/admin', {
                     templateUrl : "admin/views/admin.html",
                     controller: "adminController",
                     authenticated:true,
					 role:"admin"
      })
      .when('/404', {
                     templateUrl : "views/404.html",
                     authenticated:false,
					 role:"none"
      })
      .otherwise({
                     redirectTo : "/404",
                     authenticated:false,
					           role:"none"
      });
}]);