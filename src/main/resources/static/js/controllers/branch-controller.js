"use strict";
lmsApp.controller("branchController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,ngNotify){
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
    if($scope.branch.branchName === null || $scope.branch.branchAddress === null){
      ngNotify.set('Fill up Library branch information ', {
        theme: 'pure',
        position: 'top',
        duration: 1000,
        type: 'warn',
        sticky: false,
        button: true,
        html: false
    });
    }else{
      lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BRANCHES, $scope.branch).then(function(data){
        ngNotify.set('Library branch is created successfully', {
          theme: 'pure',
          position: 'top',
          duration: 1000,
          type: 'info',
          sticky: false,
          button: true,
          html: false
      });
        $window.location.href = "#/admin/viewbranches";
      })
    }
    
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
      ngNotify.set('Library branch is deleted successfully', {
        theme: 'pure',
        position: 'top',
        duration: 1000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
			$window.location.href = "#/admin/viewbranches";
		})
	}
})

lmsApp.controller("BranchDetailController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,$routeParams,ngNotify){
  lmsFactory.readAllObjects("http://localhost:8080/lms/readBranchById/"+$routeParams.branchId).then(function(data){
      $scope.branch = data;
  })
  $scope.updateBranch = function(branchId){
    if($scope.branch.branchName === "" || $scpoe.branch.branchAddress === ""){
      ngNotify.set('Library branch information cannot be blanked', {
        theme: 'pure',
        position: 'top',
        duration: 1000,
        type: 'warn',
        sticky: false,
        button: true,
        html: false
    });
    }else{
      lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BRANCHES,$scope.branch).then(function(data){
        ngNotify.set('Library branch information updated', {
          theme: 'pure',
          position: 'top',
          duration: 1000,
          type: 'info',
          sticky: false,
          button: true,
          html: false
      });
        $window.location.href = "#/admin/viewbranches"
      })
    }
    
  }
})


lmsApp.controller("LibrarianBranchController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter){
      lmsFactory.readAllObjects(adminConstants.GET_ALL_BRANCHES).then(function(data){
        $scope.branches = data;
        $scope.pagination = Pagination.getNew(10);
        $scope.pagination.numPages = Math.ceil($scope.branches.length/$scope.pagination.perPage);
      })

      $scope.searchBranches = function(){
        lmsFactory.readAllObjects("http://localhost:8080/lms/readBranchByName/"+$scope.searchString).then(function(data){
              $scope.branches = data;
              $scope.pagination = Pagination.getNew(10);
              $scope.pagination.numPages = Math.ceil($scope.branches.length/$scope.pagination.perPage);
          })
    }
})

lmsApp.controller("LibrarianBranchDetailController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,$routeParams,ngNotify){
  $scope.showbookcopy = false;
  lmsFactory.readAllObjects("http://localhost:8080/lms/readBranchById/"+$routeParams.branchId).then(function(data){
        $scope.branch = data;
    })

    lmsFactory.readAllObjects(adminConstants.GET_ALL_BOOKS).then(function(data){
      $scope.books = data;
    })

    $scope.showBookCopies = function(selectedName){
      lmsFactory.readAllObjects(adminConstants.INITIALIZE_BRANCH).then(function(data){
        $scope.bookcopies = data;
        $scope.bookcopies.bookId = $scope.selectedName.bookId;
        $scope.bookcopies.branchId = $scope.branch.branchId;
         lmsFactory.saveAllObjects(adminConstants.GET_BOOK_COPIES,$scope.bookcopies).then(function(data){
          $scope.showbookcopy = true;
          $scope.bookcopy = data;
        })
      })
    
    }

    $scope.updateBranch = function(branchId){
      if($scope.selectedName === undefined){
        lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BRANCHES,$scope.branch).then(function(data){
          $window.location.href = "#/librarian/viewbranches"
        })
      }else{
        lmsFactory.saveAllObjects(adminConstants.SET_BOOK_COPIES,$scope.bookcopy).then(function(data){
        })
        lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BRANCHES,$scope.branch).then(function(data){
          $window.location.href = "#/librarian/viewbranches"
        })
      }
      
    }
})
