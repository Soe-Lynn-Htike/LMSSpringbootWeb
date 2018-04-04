"use strict";
lmsApp.controller("publisherController",function($scope,$location,$http,lmsFactory,$window,adminConstants){
  if($location.path === '/addpublisher'){
    lmsFactory.readAllObjects(adminConstants.INITIALIZE_PUBLISHER).then(function(data){
      $scope.publisher = data;
    })
  }else{
    lmsFactory.readAllObjects(adminConstants.GET_ALL_PUBSLISHERS).then(function(data){
      $scope.publishers = data;
    })

    $scope.savePublisher = function(){
      lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_PUBLISHERS, $scope.publisher).then(function(data){
      $window.location.href = "#/admin/viewpublishers";
    })
    }
  }
})


lmsApp.controller("PublisherDetailController",function($scope,$http,$location,$routeParams,$window,lmsFactory,adminConstants){

lmsFactory.readAllObjects("http://localhost:8080/lms/readPublisherById/"+$routeParams.publisherId).then(function(data){
      $scope.publisher = data;
  })

  $scope.updatePublisher = function(publisherId){
    lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_PUBLISHERS,$scope.publisher).then(function(data){
      $window.location.href = "#/admin/viewpublishers";
    })
  }

})
