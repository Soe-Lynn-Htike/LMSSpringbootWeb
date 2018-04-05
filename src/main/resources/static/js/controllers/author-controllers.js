"use strict";
lmsApp.controller("authorController", function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter){



	if($location.path() == '/admin/addauthor'){
		lmsFactory.readAllObjects(adminConstants.INITIALIZE_AUTHOR).then(function(data){
			$scope.author = data;
			$scope.author.books = [];
			lmsFactory.readAllObjects(adminConstants.GET_ALL_BOOKS).then(function(data){
				$scope.books =data;
			})
		})

	}else{
			lmsFactory.readAllObjects(adminConstants.GET_ALL_AUTHORS).then(function(data){
				$scope.authors = data;
				$scope.pagination = Pagination.getNew(10);
				$scope.pagination.numPages = Math.ceil($scope.authors.length/$scope.pagination.perPage);
			})
	}

	$scope.saveAuthor = function(){

		console.log($scope.author);
			lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_AUTHORS, $scope.author).then(function(data){
			$window.location.href = "#/admin/viewauthors";
		})
	}

	$scope.searchAuthors = function(){
			lmsFactory.readAllObjects("http://localhost:8080/lms/readAuthorsByName/"+$scope.searchString).then(function(data){
						$scope.authors = data;
						$scope.pagination = Pagination.getNew(10);
						$scope.pagination.numPages = Math.ceil($scope.authors.length/$scope.pagination.perPage);
				})
	}

	$scope.deleteAuthor = function(authorId){
		var author = {
				"authorId": authorId
		}
		lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_AUTHORS, author).then(function(data){
			lmsFactory.readAllObjects(adminConstants.GET_ALL_AUTHORS).then(function(data){
				$scope.authors = data;
				$scope.pagination = Pagination.getNew(10);
				$scope.pagination.numPages = Math.ceil($scope.authors.length/$scope.pagination.perPage);
			})
			$window.location.href = "#/admin/viewauthors";
		})
	}
})

lmsApp.controller("AuthorDetailController",function($scope, $http, $window, $location,$routeParams,lmsFactory,adminConstants,Pagination,$filter){

	lmsFactory.readAllObjects("http://localhost:8080/lms/readAuthorsById/"+$routeParams.authorId).then(function(data){
			$scope.author = data;
	})
	$scope.updateAuthor = function(authorId){
		lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_AUTHORS,$scope.author).then(function(data){
			$window.location.href = "#/admin/viewauthors"
		})
	}
})
