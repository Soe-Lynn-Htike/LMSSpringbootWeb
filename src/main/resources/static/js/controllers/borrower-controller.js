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