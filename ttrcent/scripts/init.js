
(function () {

	var app = angular.module('myApp', ['ngRoute','routeModule','loginFactoryModule','jkuri.datepicker', 'userModule', 'loginModule', 'managerModule', 'adminModule']);
	
app.run(function($rootScope, $location){
	$rootScope.$on('$routeChangeStart',function(event, next, current){		
		if(next.$$route.authenticated == true && (typeof (sessionStorage.user) == 'undefined' || sessionStorage.user == '')){	
			event.preventDefault();
			$location.path('/');
			console.log(sessionStorage.user);
		} 
		if(typeof (next.$$route.role) != 'undefined' && next.$$route.role !='none' && next.$$route.role != sessionStorage.role){
			event.preventDefault();
			alert('You are not authorised to see this ' + next.$$route.role + ' page');
			$location.path('/'+ sessionStorage.role);
			console.log('role mis-fired');
		}
		if(next.$$route.role == 'none') {
			sessionStorage.role = '';
		}	  
	});
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


	
