
(function () {

	var app = angular.module('myApp', ['ngRoute','jkuri.datepicker', 'userModule', 'loginModule', 'managerModule', 'adminModule']);
<<<<<<< HEAD
	app.config(['$routeProvider',function($routeProvider) {
      $routeProvider.when('/', {
=======
	app.config(['$routeProvider',function($r) {
      $r.when('/', {
>>>>>>> origin/master
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
app.run(function($rootScope, $location){
	$rootScope.$on('$routeChangeStart',function(event, next, current){		
		if(next.$$route.authenticated == true && (typeof (sessionStorage.user) == 'undefined' || sessionStorage.user == '')){	
			event.preventDefault();
			$location.path('/');
			console.log(sessionStorage.user);
		} 
		if(next.$$route.role !='none' && next.$$route.role != sessionStorage.role){
			event.preventDefault();
<<<<<<< HEAD
			alert('You are not authorised to see this ' + next.$$route.role + ' page');
			$location.path('/'+ sessionStorage.role);
			console.log('role mis-fired');
		}
		if(next.$$route.role == 'none') {
			sessionStorage.role = '';
=======
			$location.path('/'+sessionStorage.role);
			console.log('role mis-fired');
>>>>>>> origin/master
		}	  
	});
});

app.factory('loginService', function($http, $window, $filter){
	return{
	   loginAuthentication : function(username,password) {
		   var upColl = [];
		   $http({
			url:"data/loginAuth.json",
			method:"GET"		
			}).then(function(resp){
				upColl= resp.data;
<<<<<<< HEAD
				var filterResult = $filter('filter')(upColl,{'username' : username, 'password': password});
				if(filterResult.length == 1) {
					sessionStorage.setItem("user", filterResult[0].username);
					sessionStorage.setItem("role", filterResult[0].role);
					$window.location="#/"+ filterResult[0].role;
=======

				for(x in upColl){ //use filter- change

					if(upColl[x].username == username)
						break;
				}
				if(upColl[x].password == password){
					sessionStorage.setItem("user", upColl[x].username);
					sessionStorage.setItem("role", upColl[x].role);
					$window.location="#/"+upColl[x].role;
>>>>>>> origin/master
					return true;
				}
				else{
					$window.location="#/";
					return false;
				}	
			},function(resp){
				return false;
			});
		},	
		logout: function(){
			sessionStorage.user = '';
			sessionStorage.role = '';
			$window.location="#/";
		}	
	};
});

//login controller

	
	
// user controller


	// pagination custom filter

	app.filter('startFrom', function() {
	    return function(input, start) {
			if(typeof(input)!='undefined'){
				 start = +start; //parse to int
				 return input.slice(start);
			}	       
	    }
	}); 



app.directive('calender',  ['$rootScope', function($rootScope) {
	var date = new Date();
	var currDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
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
			var selDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
			target.val(selDate);
			$rootScope.userCalDate = selDate;
		} });

       }
    };
}]);

// user table edit directive

app.directive('modal', function () {
return {
  template: '<div class="modal fade">' + 
      '<div class="modal-dialog">' + 
        '<div class="modal-content">' + 
          '<div class="modal-header">' + 
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
            '<h4 class="modal-title">{{ buttonClicked }} clicked!!</h4>' + 
          '</div>' + 
          '<div class="modal-body clearfix" ng-transclude></div>' + 
        '</div>' + 
      '</div>' + 
    '</div>',
  restrict: 'E',
  transclude: true,
  replace:true,
  scope:true,
  // scope: {
  //       ngModel: "=",
  //   },
  link: function postLink(scope, element, attrs) {
      scope.$watch(attrs.visible, function(value){
      if(value == true)
        $(element).modal('show');
      else
        $(element).modal('hide');
    });

    $(element).on('shown.bs.modal', function(){
      scope.$apply(function(){
        scope.$parent[attrs.visible] = true;
      });
    });

    $(element).on('hidden.bs.modal', function(){
      scope.$apply(function(){
        scope.$parent[attrs.visible] = false;
      });
    });
  }
};
});



})();


	
