"use strict";
lmsApp.controller("borrowerController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,ngNotify){
    if($location.path() === '/admin/addborrower'){
        lmsFactory.readAllObjects("http://localhost:8080/lms/initBorrower").then(function(data){
          $scope.borrower = data;
        })
      }
      else{
        lmsFactory.readAllObjects(adminConstants.GET_ALL_BORROWERS).then(function(data){
          $scope.borrowers = data;
          $scope.pagination = Pagination.getNew(10);
          $scope.pagination.numPages = Math.ceil($scope.borrowers.length/$scope.pagination.perPage);
        })   
      }

      $scope.searchBorrowers = function(){
        lmsFactory.readAllObjects("http://localhost:8080/lms/readBorrowerByName/"+$scope.searchString).then(function(data){
              $scope.borrowers = data;
              $scope.pagination = Pagination.getNew(10);
              $scope.pagination.numPages = Math.ceil($scope.borrowers.length/$scope.pagination.perPage);
          })
      }
  
      $scope.deleteBorrower = function(cardNo){
        var borrower = {
                "cardNo": cardNo
        }
        lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BORROWERS, borrower).then(function(data){
            lmsFactory.readAllObjects(adminConstants.GET_ALL_BORROWERS).then(function(data){
                $scope.borrowers = data;
                $scope.pagination = Pagination.getNew(10);
                $scope.pagination.numPages = Math.ceil($scope.borrowers.length/$scope.pagination.perPage);
            })
            ngNotify.set('Borrower deleted successfully', {
              theme: 'pure',
              position: 'top',
              duration: 1000,
              type: 'info',
              sticky: false,
              button: true,
              html: false
          });
            $window.location.href = "#/admin/viewborrowers";
        })
    }

      $scope.saveBorrower = function(){
        if($scope.borrower.name === null || $scope.borrower.address === null || $scope.borrower.phone === null){
            ngNotify.set('Fill up borrower information ', {
              theme: 'pure',
              position: 'top',
              duration: 1000,
              type: 'warn',
              sticky: false,
              button: true,
              html: false
          });
        }else{
          lmsFactory.saveAllObjects("http://localhost:8080/lms/updateBorrower", $scope.borrower).then(function(data){
            ngNotify.set('Borrower created successfully', {
              theme: 'pure',
              position: 'top',
              duration: 1000,
              type: 'info',
              sticky: false,
              button: true,
              html: false
          });
            $window.location.href = "#/admin/viewborrowers";
          })
        }
        
      }
})

lmsApp.controller("BorrowerDetailController",function($scope,$http,$location,$routeParams,$window,lmsFactory,adminConstants,Pagination,ngNotify){

    lmsFactory.readAllObjects("http://localhost:8080/lms/readBorrowerByCardNo/"+$routeParams.cardNo).then(function(data){
          $scope.borrower = data;
      })
    
      $scope.updateBorrower = function(cardNo){
        if($scope.borrower.name === "" || $scope.borrower.phone === "" || $scope.borrower.address ===''){
            ngNotify.set('Borrower name , phone and address is blank', {
              theme: 'pure',
              position: 'top',
              duration: 1000,
              type: 'warn',
              sticky: false,
              button: true,
              html: false
          });
        }else{
          lmsFactory.saveAllObjects("http://localhost:8080/lms/updateBorrower",$scope.borrower).then(function(data){
            ngNotify.set('Borrower info is updated', {
              theme: 'pure',
              position: 'top',
              duration: 1000,
              type: 'info',
              sticky: false,
              button: true,
              html: false
          });
            $window.location.href = "#/admin/viewborrowers";
          })
        }
       
      }
    
})

lmsApp.controller("BorrowerCheckController",function($scope, $http, $window, $location,lmsFactory,adminConstants,$routeParams,Pagination,$filter,ngNotify){
    
  if($location.path() ==='/borrower/checkborrower'){
    lmsFactory.readAllObjects("http://localhost:8080/lms/initBorrower").then(function(data){
      $scope.borrower = data;
    })
  }
  else{

    lmsFactory.readAllObjects("http://localhost:8080/lms/readBorrowerByCardNo/"+$routeParams.cardNo).then(function(data){
      $scope.borrower = data;
  })
  }
    
    
    $scope.checkBorrower=function(cardNo){
      if(cardNo ===null){
        ngNotify.set('Please Enter card Number', {
          theme: 'pure',
					position: 'top',
					duration: 1000,
					type: 'warn',
					sticky: false,
					button: true,
					html: false
      });
      }else{
        lmsFactory.readAllObjects("http://localhost:8080/lms/readBorrowerByCardNo/"+cardNo).then(function(data){
          $scope.borrower = data;
          if($scope.borrower.cardNo === null){
            ngNotify.set('Borrower doesnt exists', {
              theme: 'pure',
              position: 'top',
              duration: 1000,
              type: 'warn',
              sticky: false,
              button: true,
              html: false
          });
          }else{
            $window.location.href = "#/borrower/"+$scope.borrower.cardNo+"/borrowerservice";
          }
      })
      }
      
    }
})

lmsApp.controller("CheckOutController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,$routeParams,ngNotify){
    
  lmsFactory.readAllObjects("http://localhost:8080/lms/initBookLoan").then(function(data){
    $scope.bookloan = data;
  })
  lmsFactory.readAllObjects("http://localhost:8080/lms/readBorrowerByCardNo/"+$routeParams.cardNo).then(function(data){
      $scope.borrower = data;
  })

  lmsFactory.readAllObjects(adminConstants.GET_ALL_BRANCHES).then(function(data){
      $scope.branches = data;
    })

    $scope.checkOutBookByBranch = function(selectedBranch){
      $scope.bookloan.branchId = selectedBranch.branchId;
      lmsFactory.readAllObjects("http://localhost:8080/lms/readBooksByBranch/"+selectedBranch.branchId).then(function(data){
        $scope.books = data;
      })
    }

    $scope.addBookCheckOut = function(selectedBook){
        $scope.bookloan.bookId = selectedBook.bookId;
    }

    $scope.checkOutBook = function(cardNo){
      $scope.bookloan.cardNo = cardNo;
      
      lmsFactory.saveAllObjects("http://localhost:8080/lms/checkOutBook", $scope.bookloan).then(function(data){
        $window.location.href = "#/borrower/"+cardNo+"/borrowerservice";
      })
    }

})

lmsApp.controller("ReturnBookController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,$routeParams){
 
  lmsFactory.readAllObjects("http://localhost:8080/lms/initBookLoan").then(function(data){
    $scope.bookloan = data;
  })
  lmsFactory.readAllObjects("http://localhost:8080/lms/readBorrowerByCardNo/"+$routeParams.cardNo).then(function(data){
      $scope.borrower = data;
  })

    lmsFactory.readAllObjects(adminConstants.GET_ALL_BRANCHES).then(function(data){
      $scope.branches = data;
    })

    $scope.readBooksByBranch = function(selectedBranch){
          $scope.bookloan.branchId = selectedBranch.branchId;
          $scope.bookloan.cardNo = $scope.borrower.cardNo;
          lmsFactory.saveAllObjects("http://localhost:8080/lms/checkBooksByBranchByCard",$scope.bookloan).then(function(data){
          $scope.books = data;
         })
    }

    $scope.addBookCheckOut = function(selectedBook){
      $scope.bookloan.bookId = selectedBook.bookId;
    }
    $scope.returnBook = function(bookId){
        if($scope.selectedBook === undefined || $scope.selectedBranch === undefined){
          ngNotify.set('Please choose branch and book', {
            theme: 'pure',
            position: 'top',
            duration: 1000,
            type: 'warn',
            sticky: false,
            button: true,
            html: false
        });
        }else{
          lmsFactory.saveAllObjects("http://localhost:8080/lms/returnBook",$scope.bookloan).then(function(data){
            $window.location.href = "#/borrower/"+cardNo+"/borrowerservice";
           })
        }
       
    }
})