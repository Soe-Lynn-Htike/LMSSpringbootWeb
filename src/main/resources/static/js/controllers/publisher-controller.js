"use strict";
lmsApp.controller("publisherController",function($scope,$location,$http,lmsFactory,$window,adminConstants,Pagination){
  if($location.path() === '/admin/addpublisher'){
    lmsFactory.readAllObjects(adminConstants.INITIALIZE_PUBLISHER).then(function(data){
      $scope.publisher = data;
    })
  }else{
    lmsFactory.readAllObjects(adminConstants.GET_ALL_PUBSLISHERS).then(function(data){
      $scope.publishers = data;
      $scope.pagination = Pagination.getNew(10);
      $scope.pagination.numPages = Math.ceil($scope.publishers.length/$scope.pagination.perPage);
    })

  }

      $scope.searchPublisher = function(){
        lmsFactory.readAllObjects("http://localhost:8080/lms/readPublisherByName/"+$scope.searchString).then(function(data){
              $scope.publishers = data;
              $scope.pagination = Pagination.getNew(10);
              $scope.pagination.numPages = Math.ceil($scope.publishers.length/$scope.pagination.perPage);
          })
      }
      $scope.deletePublisher = function(publisherId){
        var publisher = {
            "publisherId": publisherId
        }
        lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_PUBLISHERS, publisher).then(function(data){
          lmsFactory.readAllObjects(adminConstants.GET_ALL_PUBSLISHERS).then(function(data){
            $scope.publishers = data;
            $scope.pagination = Pagination.getNew(10);
            $scope.pagination.numPages = Math.ceil($scope.publishers.length/$scope.pagination.perPage);
          })
          $window.location.href = "#/admin/viewpublishers";
        })
      }

      $scope.savePublisher = function(){
        lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_PUBLISHERS, $scope.publisher).then(function(data){
        $window.location.href = "#/admin/viewpublishers";
      })
      }
})


lmsApp.controller("PublisherDetailController",function($scope,$http,$location,$routeParams,$window,lmsFactory,adminConstants,Pagination){

lmsFactory.readAllObjects("http://localhost:8080/lms/readPublisherById/"+$routeParams.publisherId).then(function(data){
      $scope.publisher = data;
  })

  $scope.updatePublisher = function(publisherId){
    lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_PUBLISHERS,$scope.publisher).then(function(data){
      $window.location.href = "#/admin/viewpublishers";
    })
  }

})
