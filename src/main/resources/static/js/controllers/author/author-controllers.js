"use strict";
lmsApp.controller("authorController", function($scope, $http, $window, $location){

	if($location.path === '/addauthor'){
		$http.get("http://localhost:8080/lms/initAuthor").then(function(data){
			$scope.author = data.data;
		})
	}else{
		$http.get("http://localhost:8080/lms/readAuthors").then(function(data){
			$scope.authors = data.data;

		})
	}

	$scope.saveAuthor = function(){
		$http.post("http://localhost:8080/lms/updateAuthor", $scope.author).then(function(data){
			$window.location.href = "#/admin/viewauthors"
		})

	}

	$scope.deleteAuthor = function(authorId){
		var author = {
				"authorId": authorId
		}
		$http.post("http://localhost:8080/lms/updateAuthor", author).then(function(data){
			$http.get("http://localhost:8080/lms/readAuthors").then(function(data){
				$scope.authors = data.data;

			})
			$window.location.href = "#/admin/viewauthors"
		})

	}
})

lmsApp.controller("AuthorDetailController",function($scope, $http, $window, $location,$routeParams){

	$http.get("http://localhost:8080/lms/readAuthorsById/"+$routeParams.authorId).then(function(data){
			$scope.author = data.data;
	})
	$scope.updateAuthor = function(authorId){
		$http.post("http://localhost:8080/lms/updateAuthor",$scope.author).then(function(data){
			$window.location.href = "#/admin/viewauthors"
		})
	}
})
