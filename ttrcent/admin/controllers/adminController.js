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
		$scope.AdminUsers = [];
		$http({
			method: 'GET',
			url: 'admin/data/userInfo.json'
		}).then(function(resp){
			$scope.AdminUsers = resp.data;
			console.log(resp);
		}, function(resp){
			console.log('error call');
			console.log(resp);
		});


		//row Limits
		$scope.adminUserRowLimits = [10,25,50,100];

		//Pagination for admin user tab
		$scope.numberOfAdminUserPage=function(){
			return Math.ceil($scope.getAdminData().length/$scope.adminUserRowLimit);                
		}
		$scope.getAdminData = function () {
		  // needed for the pagination calc
		  // https://docs.angularjs.org/api/ng/filter/filter
		  return $filter('filter')($scope.AdminUsers, $scope.adminUserTest)			 
		} 
		// Delete data from admin user tab
		$scope.deleteIndex;
			$scope.deleteModal = false;
			$scope.AdminuserTable = true;
		$scope.toggleDeleteModal = function(index,str){
				if(index !=-1){
					$scope.deleteIndex = index;
				}                                           
				$scope.buttonClicked = str;
				$scope.deleteModal = !$scope.deleteModal;
			};
			$scope.removeUserinfo = function() {
				var index = $scope.deleteIndex;
				$scope.AdminUsers.splice(index, 1);
				console.log($scope.AdminUsers.length);
				if($scope.AdminUsers.length < 1) {
		            $scope.AdminuserTable = false;
				}
				$scope.deleteModal = !$scope.deleteModal;
			}

		// data from admin user tab
		$scope.showModal = false;
	    $scope.buttonClicked = "";
		
		$scope.addIndex = null;
	    $scope.toggleAdminUserProject = function(index, btnClicked){
	        $scope.buttonClicked = btnClicked;
	        $scope.showModal = !$scope.showModal;
			$scope.addIndex = index;
			$scope.addUserName = '';
			$scope.addUserLogin = '';
			$scope.addUserRole = '';
	    };
	    $scope.addAdminUserAlert = function(){
			console.log('i also called');
			console.log($scope.addUserName);
			if (angular.isUndefined($scope.addUserName) || $scope.addUserName === null || $scope.addUserName == '') {
				alert('fill the user name');
			}
 			if (angular.isUndefined($scope.addUserLogin) || $scope.addUserLogin === null || $scope.addUserLogin == '') {
 				alert('fill the user login');
 			}
 			if (angular.isUndefined($scope.addUserRole) || $scope.addUserRole === null || $scope.addUserRole == '') {
 				alert('fill the user role');
 			}
			else {
				console.log($scope.buttonClicked);
				if( $scope.buttonClicked == 'Add User') {
					$scope.AdminUsers.unshift({Name : $scope.addUserName, Login: $scope.addUserLogin , Role: $scope.addUserRole});
					$scope.showModal = !$scope.showModal;
					$('.modal,.modal-backdrop').hide();
				}
				else if( $scope.buttonClicked == 'Edit Form'){
					console.log("I am edit");
					$scope.AdminUsers[$scope.addIndex].Name = $scope.addUserName;
					$scope.AdminUsers[$scope.addIndex].Login = $scope.addUserLogin;
					$scope.AdminUsers[$scope.addIndex].Role = $scope.addUserRole;
					$scope.showModal = !$scope.showModal;
					$('.modal,.modal-backdrop').hide();
				}
			}
		}
		$scope.toggleModal = function(index, btnClicked) {
			$scope.buttonClicked = btnClicked;
	        $scope.showModal = !$scope.showModal;
			$scope.addIndex = index;
			$scope.addUserName = $scope.AdminUsers[index].Name;
			$scope.addUserLogin = $scope.AdminUsers[index].Login;
			$scope.addUserRole = $scope.AdminUsers[index].Role;
			if (angular.isUndefined($scope.addUserName) || $scope.addUserName === null || $scope.addUserName == '') {
				alert('fill the user name');
			}
 			if (angular.isUndefined($scope.addUserLogin) || $scope.addUserLogin === null || $scope.addUserLogin == '') {
 				alert('fill the user login');
 			}
 			if (angular.isUndefined($scope.addUserRole) || $scope.addUserRole === null || $scope.addUserRole == '') {
 				alert('fill the user role');
 			}
		}
		// changes - vignesh 6 jan- start
      //projects Tab
      $scope.activeProjects =[];
      $scope.inactiveProjects =[];
     
      //getActive/Inactive Projects data
      $http({
            url:'admin/data/adminProj.json',
            method:'GET'
	     }).then(function(resp){
            //success method
            $scope.activeProjects = $filter('filter')(resp.data,{"Status":"active"},true);
            $scope.inactiveProjects = $filter('filter')(resp.data,{"Status":"inactive"},true);
	                   
	     },function(resp){
            //error method
            console.log('error call');
      });
     
      $scope.activeRowLimits = [5,10,20,50,100];
      $scope.filterActiveProject='';
      $scope.filterInActiveProject='';
      //addprojectmodal
      $scope.projectName='';
      $scope.projectDesc='';
     
      //add active project modal
      $scope.addActiveProject = function(){
		if($scope.projectName !='' && $scope.projectDesc !='' ){
			$scope.activeProjects.unshift({"Name":$scope.projectName,"Desc":$scope.projectDesc,"Status":"active","User":[]});
			$('#addProjectModal').modal('toggle');
		}
		else
			alert('Please enter project name & description');
      };
      $scope.toggleAddProject = function(x){
                     $scope.projectName='';
                     $scope.projectDesc='';
      };
     
      //active project table pagination
      $scope.numberOfActivePages=function(){
                                    return Math.ceil($scope.getActiveData().length/$scope.activeRowLimit);               
      }
      $scope.getActiveData = function () {
        return $filter('filter')($scope.activeProjects, $scope.filterActiveProject)                               
      }
      //inactive project table pagination
      $scope.numberOfInActivePages=function(){
                                    return Math.ceil($scope.getInActiveData().length/$scope.inactiveRowLimit);               
      }
      $scope.getInActiveData = function () {
        return $filter('filter')($scope.inactiveProjects, $scope.filterInActiveProject)                                            
      }
     
     
      //deletemodal
      $scope.deleteProjModal = false;
      $scope.deleteIndex;
      $scope.deleteCollId;
      $scope.toggleDeleteModal = function(index, flag, show){              
                     $scope.deleteIndex = index;
                     $scope.deleteCollId = flag;
                     $scope.deleteProjModal = !$scope.deleteProjModal;
      };
      $scope.removeProjectInfo = function(){
                     if($scope.deleteIndex!=-1){
                                    if($scope.deleteCollId == 'active')
                                                   $scope.activeProjects.splice($scope.deleteIndex, 1);
                                    else if($scope.deleteCollId == 'inactive')
                                                   $scope.inactiveProjects.splice($scope.deleteIndex, 1);              
                     }
                     $scope.deleteProjModal = !$scope.deleteProjModal;
                     $scope.deleteIndex='';
                     $scope.deleteCollId='';
      };
     
      //edit project modal
     
      $scope.usersProject =[];
      $scope.editProjectName='';
      $scope.editProjectDesc='';
      $scope.editProjectStatus='';
      $scope.isActive = true;
     
      $http({
                                    url:'data/loginAuth.json',
                                    method:'GET'
                     }).then(function(resp){
                                    $scope.usersProject = resp.data;
                                   
                     },function(resp){
                                    //error method
                                    console.log('error call');
      });
      $scope.selectAllProject = function(flag){ //select all /deselect all
                     $scope.userCheck = flag;
      }
      $scope.toggleEditProjectModal = function(index,activeflag){
                     var collection = [];
                     if(activeflag){
                                    collection = $scope.activeProjects;
                                    $scope.isActive = true;
                                    $scope.currentProjTable = {'name':'active','index':index};
                     }
                     else{     
                                    collection = $scope.inactiveProjects;                                     
                                    $scope.isActive = false;
                                    $scope.currentProjTable = {'name':'inactive','index':index};
                     }
                     $scope.editProjectName=collection[index].Name;
                     $scope.editProjectDesc=collection[index].Desc;
                     $scope.editProjectStatus=collection[index].Status;
      }
      $scope.saveProjectInfo = function(){
                     var index = $scope.currentProjTable.index;
                     if($scope.currentProjTable.name=='active'){
                                    if($scope.editProjectStatus == 'inactive'){
                                                   $scope.activeProjects.splice(index, 1);
                                    $scope.inactiveProjects.unshift({"Name":$scope.editProjectName,"Desc":$scope.editProjectDesc,"Status":"inactive","User":[]});
                                    }
                                    else{
                                                   $scope.activeProjects[index].Name=$scope.editProjectName;
                                                   $scope.activeProjects[index].Desc=$scope.editProjectDesc;
                                                   $scope.activeProjects[index].Status=$scope.editProjectStatus;
                                    }
                     }
                     else if($scope.currentProjTable.name=='inactive'){
                                   
                                    if($scope.editProjectStatus == 'active'){
                                                   $scope.inactiveProjects.splice(index, 1);
                                    $scope.activeProjects.unshift({"Name":$scope.editProjectName,"Desc":$scope.editProjectDesc,"Status":"inactive","User":[]});
                                    }
                                    else{
                                                   $scope.inactiveProjects[index].Name=$scope.editProjectName;
                                                   $scope.inactiveProjects[index].Desc=$scope.editProjectDesc;
                                                   $scope.inactiveProjects[index].Status=$scope.editProjectStatus;
                                    }             
                     }
                     $('#editProjectModal').modal('toggle');
                     $scope.clearEditValues();
      };
      $scope.clearEditValues = function(){
                     $scope.editProjectName='';
                     $scope.editProjectDesc='';
                     $scope.editProjectStatus='';
                     $scope.currentProjTable = '';
      };
      // $scope.modelidchange = function(){
                     // $scope.editProjectStatus = $scope.editProjectStatus;
                     // console.log($scope.editProjectStatus);
      // }
      // changes - vignesh 6 jan- end
}); 