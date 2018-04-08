"use strict";
lmsApp.controller("borrowerController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter){
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
  
      $scope.deletePublisher = function(cardNo){
        var borrower = {
                "cardNo": cardNo
        }
        lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BORROWERS, borrower).then(function(data){
            lmsFactory.readAllObjects(adminConstants.GET_ALL_BORROWERS).then(function(data){
                $scope.borrowers = data;
                $scope.pagination = Pagination.getNew(10);
                $scope.pagination.numPages = Math.ceil($scope.borrowers.length/$scope.pagination.perPage);
            })
            $window.location.href = "#/admin/viewborrowers";
        })
    }

      $scope.saveBorrower = function(){
        lmsFactory.saveAllObjects("http://localhost:8080/lms/updateBorrower", $scope.borrower).then(function(data){
        $window.location.href = "#/admin/viewborrowers";
      })
      }
})

lmsApp.controller("BorrowerDetailController",function($scope,$http,$location,$routeParams,$window,lmsFactory,adminConstants,Pagination){

    lmsFactory.readAllObjects("http://localhost:8080/lms/readBorrowerByCardNo/"+$routeParams.cardNo).then(function(data){
          $scope.borrower = data;
      })
    
      $scope.updateBorrower = function(cardNo){
        lmsFactory.saveAllObjects("http://localhost:8080/lms/updateBorrower",$scope.borrower).then(function(data){
          $window.location.href = "#/admin/viewborrowers";
        })
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
          theme: 'pitchy',
          type : 'warn',
          position: 'top',
          sticky: true
      });
      }else{
        lmsFactory.readAllObjects("http://localhost:8080/lms/readBorrowerByCardNo/"+cardNo).then(function(data){
          $scope.borrower = data;
          if($scope.borrower.cardNo === null){
            ngNotify.set('Borrower doesnt exists', {
              theme: 'pitchy',
              type : 'warn',
              position: 'top',
              sticky: true
          });
          }else{
            $window.location.href = "#/borrower/"+$scope.borrower.cardNo+"/borrowerservice";
          }
      })
      }
      
    }
})

lmsApp.controller("CheckOutController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,$routeParams){
    
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
              alert("Please choose branch and book");
        }else{
          lmsFactory.saveAllObjects("http://localhost:8080/lms/returnBook",$scope.bookloan).then(function(data){
            $window.location.href = "#/borrower/"+cardNo+"/borrowerservice";
           })
        }
       
    }
})