lmsApp.controller("CheckBorrowerController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter){
    
    lmsFactory.readAllObjects(adminConstants.GET_ALL_BORROWERS).then(function(data){
        $scope.borrowers = data;
        $scope.pagination = Pagination.getNew(10);
        $scope.pagination.numPages = Math.ceil($scope.borrowers.length/$scope.pagination.perPage);
      })
})

lmsApp.controller("OverrideDueDateController",function($scope,$http,$location,$routeParams,$window,lmsFactory,adminConstants,Pagination){
   
   
    
    lmsFactory.readAllObjects("http://localhost:8080/lms/initBookLoan").then(function(data){
        $scope.bookloan = data;
    })
    lmsFactory.readAllObjects("http://localhost:8080/lms/readBorrowerByCardNo/"+$routeParams.cardNo).then(function(data){
        $scope.borrower = data;
    })

    lmsFactory.readAllObjects("http://localhost:8080/lms/readBranchByBorrower/"+$routeParams.cardNo).then(function(data){
        $scope.branches = data;
    })

    // lmsFactory.readAllObjects("http://localhost:8080/lms/readBookByBorrower/"+$routeParams.cardNo).then(function(data){
    //     $scope.books = data;
    //     if($scope.books.length ==0){
    //         $scope.showmessage = true;
    //     }
    // })

    $scope.addBookLoanBranch = function(branch,cardNo){
        $scope.bookloan.branchId = branch.branchId;
        $scope.bookloan.cardNo = cardNo;
        lmsFactory.saveAllObjects("http://localhost:8080/lms/getBooksByBranchByCardNo",$scope.bookloan).then(function(data){
        $scope.books = data;
    })
    }

    $scope.addBookLoanBook = function(book){
        $scope.bookloan.bookId = book.bookId;
    }
    $scope.overrideDueDate = function(cardNo){
         $scope.bookloan.cardNo = cardNo;
         lmsFactory.saveAllObjects("http://localhost:8080/lms/overrideBookLoanDueDate",$scope.bookloan).then(function(data){
            $window.location.href = "#/admin/overrideduedate";
        })
        
    }

})