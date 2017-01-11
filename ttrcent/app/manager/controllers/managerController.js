angular.module('managerModule', [])
.controller('managerController',function($scope, $rootScope, $filter, $http, loginService) {

	//Roting Service returning function
		$scope.userLogout = function(){
			loginService.logout();
		};

	//Save as favourate function
	$scope.saveFavourate = null;
	$scope.favReports = [];
	$scope.favourateTables =[];
	$scope.savFav = function(){
		if($scope.saveFavourate == "" | $scope.saveFavourate == null){
			alert("Please enter Save as favourate field")
		}
		else{
			$scope.favReports.push($scope.saveFavourate);
			$scope.saveFavourate="";
			$scope.favourateTables.push({favName:'Fun Project', favDuration: 2 , favComment: 'hdhkh'});
         	console.log($scope.favourateTables);
		}
	}	

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
		$scope.showModal = false;
	    $scope.buttonClicked = "";
		
		$scope.editIndex = null;
	    $scope.toggleModal = function(index, btnClicked){
	        $scope.buttonClicked = btnClicked;
	        $scope.showModal = !$scope.showModal;
			$scope.editIndex = index;
			
			$scope.editProjectInfo = { name: $scope.informations[$scope.editIndex].Project};
			$scope.editduration = $scope.informations[$scope.editIndex].Duration;
			$scope.editComment= $scope.informations[$scope.editIndex].Comment;
			var tempDate  = $scope.informations[$scope.editIndex].userDateInfo.split('/');
			$scope.editDate = new Date(tempDate[2]+'-'+tempDate[1]+'-'+ tempDate[0]);
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
			if(!angular.isDate($scope.editDate)) {
				$scope.informations[$scope.editIndex].userDateInfo = $scope.editDate;
			}
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

			//Get User's data with pagination
			$scope.userRowLimits = [10,25,50,100];
			$scope.usersInformations = [];
			$http({
				url:'manager/data/userInfo.json',
				method:'GET'
			}).then(function(resp){
				//success method
				$scope.usersInformations = resp.data;
				console.log(resp);
			},function(resp){
				//error method
				console.log('error call');
				console.log(resp);
			});

			//pagination

			$scope.numberOfUserPages=function(){
				return Math.ceil($scope.getUserData().length/$scope.userRowLimit);                
			}
			$scope.getUserData = function () {
			  // needed for the pagination calc
			  // https://docs.angularjs.org/api/ng/filter/filter
			  return $filter('filter')($scope.usersInformations, $scope.userTest)			 
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

			// Save Favourate
	}); 