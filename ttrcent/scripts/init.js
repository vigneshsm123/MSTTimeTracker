(function () {
	var app = angular.module('myApp', ['ngRoute','jkuri.datepicker']);
	app.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : "views/login.html",
			controller: "LoginController"
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




app.factory('loginService', function($http, $window){
	return{
	   loginAuthentication : function(username,password) {
		   var upColl = [];
		   $http({
			url:"data/loginAuth.json",
			method:"GET"		
			}).then(function(resp){
				upColl= resp.data;
				for(x in upColl){
					if(upColl[x].username == username)
						break;
				}
				if(upColl[x].password == password){
					localStorage.setItem("user", upColl[x].username);
					$window.location="#/"+upColl[x].role;
					return true;
				}	else{
					$window.location="#/";
					return false;
				}	
			},function(resp){
				return false;
			});
		}		
	};
});

//login controller
app.controller('LoginController', function($scope, $rootScope, $window, $http, loginService) {
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
	
	
// user controller
app.controller('userController', function($scope, $rootScope, $filter, $http) {
	$scope.userName = localStorage.user;
		$scope.showModal = false;
	    $scope.buttonClicked = "";
		
		$scope.editIndex = null;
	    $scope.toggleModal = function(index, btnClicked){
	        $scope.buttonClicked = btnClicked;
	        $scope.showModal = !$scope.showModal;
			$scope.editIndex = index;
			
			$scope.editProjectInfo = { name: $scope.informations[$scope.editIndex].Project};
			$scope.editduration = $scope.informations[$scope.editIndex].Duration;
			$scope.editComment= $scope.informations[$scope.editIndex].Comment
			$scope.editDate=$scope.informations[$scope.editIndex].userDateInfo;
			
	    };
		// create a message to display in our view
		$scope.userProjects = [{name: 'Fun Project'}, {name: 'NFDN'}];
		$scope.editProjectInfos = [{name: 'Fun Project'}, {name: 'NFDN'}];
		$scope.duration = 1;
		$scope.userComment = null;
		$scope.userProject = null;
		$scope.informations =[];
		
		$scope.myAlert = function(){
			console.log('i called');
			if ($scope.userComment === null) {
				alert('fill the comment box');
			}
 			else if ($scope.userProject === null) {
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
		$scope.editAlert = function(){
			console.log('i also called');
			if ($scope.editComment === null) {
				alert('fill the comment box');
			}
 			if ($scope.editProjectInfo === null) {
 				alert('Please select the project');
 			}
			$scope.showModal = !$scope.showModal;
			$('.modal,.modal-backdrop').hide();
			
			$scope.informations[$scope.editIndex].Project = $scope.editProjectInfo.name;
			$scope.informations[$scope.editIndex].Duration = $scope.editduration;
			$scope.informations[$scope.editIndex].Comment = $scope.editComment;
			$scope.informations[$scope.editIndex].userDateInfo = $scope.editDate;
		}
		$scope.$watch('editduration', function(newvalue, oldvalue){
			if($scope.editduration > 24) {
				$scope.editduration = 24;
				alert("Please enter the duration between the range of 1-24 hours");
			}
			else if($scope.editduration < 1) {
				$scope.editduration = 1;
				alert("Please enter the duration between the range of 1-24 hours");
				console.log($scope.userDate);
			}
		});


		// Delete Table options
			$scope.deleteIndex;
			$scope.deleteModal = false;
			$scope.toggleDeleteModal = function(index,str){
				if(index !=-1){
					$scope.deleteIndex = index;
				}                                           
				$scope.buttonClicked = str;
				$scope.deleteModal = !$scope.deleteModal;
			};
			$scope.removeUserinfo = function() {
				var index = $scope.deleteIndex;
				$scope.informations.splice(index, 1);
				console.log($scope.informations.length);
				if($scope.informations.length < 1) {
		            $scope.userTable = false;
				}
				$scope.deleteModal = !$scope.deleteModal;
			}
	
			//GET Projects Data
			$scope.users = [];
			$http({
				url:'data/projects.json',
				method:'GET'
			}).then(function(resp){
				//success method
				$scope.users = resp.data;
				console.log(resp);
			},function(resp){
				//error method
				console.log('error call');
				console.log(resp);
			});
			
			$scope.rowLimits = [10,25,50,100];

			//pagination

			$scope.numberOfPages=function(){
				return Math.ceil($scope.getData().length/$scope.rowLimit);                
			}
			$scope.getData = function () {
			  // needed for the pagination calc
			  // https://docs.angularjs.org/api/ng/filter/filter
			  return $filter('filter')($scope.users, $scope.test)			 
			} 
			// Report Controller

			$scope.reportCheck = false;
			$scope.selectAll = function(){
				$scope.reportCheck = !$scope.reportCheck;
			}

			$scope.proTimePeriods = ["This Month", "Last Month", "This Week", "Last Week"];
			$scope.disDatePicker = false;

			//group options
			$scope.groupOptions = ["Date", "Project"];

			$scope.groupCheck = false;
			if(typeof($scope.groupCheck) != 'undefined'){
				$scope.$watch('groupOption', function(newvalue, oldvalue){
					if(newvalue != null && typeof(newvalue) != 'undefined')
						$scope.groupCheck  = false;
					else
						$scope.groupCheck  = true;
				});
			}		
	}); 

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


	
