"use strict";
lmsApp.controller("publisherController",function($scope,$location,$http){
  if($location.path === '/addpublisher'){
    $http.get("http://localhost:8080/lms/initPublisher").then(function(data){
      $scope.publisher = data.data;
    })
  }else{
    $http.get("http://localhost:8080/lms/readPublishers").then(function(data){
      $scope.publishers = data.data;
    })
  }
})


lmsApp.controller("PublisherDetailController",function($scope,$http,$location,$routeParams,$window){

  $http.get("http://localhost:8080/lms/readPublisherById/"+$routeParams.publisherId).then(function(data){
      $scope.publisher = data.data;
  })

  $scope.updatePublisher = function(authorId){
    $http.post("http://localhost:8080/lms/updateAuthor",$scope.publisher).then(function(data){
      $window.location.href = "#/admin/viewpublishers"
    })
  }

})
