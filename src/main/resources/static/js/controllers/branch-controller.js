"use strict";
lmsApp.controller("branchController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter){
  if($location.path() == '/admin/addbranch'){
    lmsFactory.readAllObjects(adminConstants.INITIALIZE_BRANCH).then(function(data){
      $scope.branch = data;
    })

  }else{
      lmsFactory.readAllObjects(adminConstants.GET_ALL_BRANCHES).then(function(data){
        $scope.branches = data;
        $scope.pagination = Pagination.getNew(10);
        $scope.pagination.numPages = Math.ceil($scope.branches.length/$scope.pagination.perPage);
      })
  }

  $scope.saveBranch = function(){
    lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BRANCHES, $scope.branch).then(function(data){
    $window.location.href = "#/admin/viewbranches";
  })
  }

  $scope.searchBranches = function(){
			lmsFactory.readAllObjects("http://localhost:8080/lms/readBranchByName/"+$scope.searchString).then(function(data){
						$scope.branches = data;
						$scope.pagination = Pagination.getNew(10);
						$scope.pagination.numPages = Math.ceil($scope.branches.length/$scope.pagination.perPage);
				})
	}

  $scope.deleteBranch = function(branchId){
		var branch = {
				"branchId": branchId
		}
		lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BRANCHES, branch).then(function(data){
			lmsFactory.readAllObjects(adminConstants.GET_ALL_BRANCHES).then(function(data){
				$scope.branches = data;
				$scope.pagination = Pagination.getNew(10);
				$scope.pagination.numPages = Math.ceil($scope.branches.length/$scope.pagination.perPage);
			})
			$window.location.href = "#/admin/viewbranches";
		})
	}
})

lmsApp.controller("BranchDetailController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,$routeParams){
  lmsFactory.readAllObjects("http://localhost:8080/lms/readBranchById/"+$routeParams.branchId).then(function(data){
      $scope.branch = data;
  })
  $scope.updateBranch = function(authorId){
    lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BRANCHES,$scope.branch).then(function(data){
      $window.location.href = "#/admin/viewbranches"
    })
  }
})
