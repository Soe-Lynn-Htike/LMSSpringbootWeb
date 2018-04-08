"use strict";
lmsApp.controller("authorController", function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,ngNotify){
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
		if($scope.author.authorName ===null){
			ngNotify.set('Author Name cannot be blank', {
				theme: 'pure',
					position: 'top',
					duration: 1000,
					type: 'error',
					sticky: false,
					button: true,
					html: false
			});
		}
		else{
			lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_AUTHORS, $scope.author).then(function(data){
				ngNotify.set('Author created successfully', {
					theme: 'pure',
					position: 'top',
					duration: 1000,
					type: 'info',
					sticky: false,
					button: true,
					html: false
				});
				$window.location.href = "#/admin/viewauthors";
			})
		}
			
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
			ngNotify.set('Author deleted successfully', {
					theme: 'pure',
					position: 'top',
					duration: 1000,
					type: 'info',
					sticky: false,
					button: true,
					html: false
			});
			$window.location.href = "#/admin/viewauthors";
		})
	}
})

lmsApp.controller("AuthorDetailController",function($scope, $http, $window, $location,$routeParams,lmsFactory,adminConstants,Pagination,$filter,ngNotify){

	lmsFactory.readAllObjects("http://localhost:8080/lms/readAuthorsById/"+$routeParams.authorId).then(function(data){
			$scope.author = data;
			$scope.booklist = $scope.author.books;
			lmsFactory.saveAllObjects(adminConstants.DELETE_AUTHOR_BOOKS,$scope.author).then(function(data){
	 })
	})
	
	lmsFactory.readAllObjects(adminConstants.GET_ALL_BOOKS).then(function(data){
		$scope.books =data;
	})
	$scope.updateAuthor = function(authorId){
		$scope.author.books = $scope.booklist;
		if($scope.author.authorName === ""){
			ngNotify.set('Author name is blank', {
				theme: 'pure',
				position: 'top',
				duration: 1000,
				type: 'warn',
				sticky: false,
				button: true,
				html: false
		});
		}
		else{
			lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_AUTHORS,$scope.author).then(function(data){
				ngNotify.set('Author update successfully', {
						theme: 'pure',
						position: 'top',
						duration: 1000,
						type: 'info',
						sticky: false,
						button: true,
						html: false
				});
				$window.location.href = "#/admin/viewauthors"
			})
		}
		
	}
	
})
