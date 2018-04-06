"use strict";
lmsApp.controller("genreController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter){
    if($location.path() == '/admin/addgenre'){
		lmsFactory.readAllObjects(adminConstants.INITIALIZE_GENRE).then(function(data){
			$scope.genre = data;
			$scope.genre.books = [];
			lmsFactory.readAllObjects(adminConstants.GET_ALL_BOOKS).then(function(data){
				$scope.books =data;
			})
		})

	}else{
			lmsFactory.readAllObjects(adminConstants.GET_ALL_GENRES).then(function(data){
				$scope.genres = data;
				$scope.pagination = Pagination.getNew(10);
				$scope.pagination.numPages = Math.ceil($scope.genres.length/$scope.pagination.perPage);
			})
    }
    
    $scope.saveGenre= function(){
        lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_GENRES, $scope.genre).then(function(data){
			$window.location.href = "#/admin/viewgenres";
		})
    }

    $scope.searchGenre = function(){
        lmsFactory.readAllObjects("http://localhost:8080/lms/readGenreByName/"+$scope.searchString).then(function(data){
						$scope.genres = data;
						$scope.pagination = Pagination.getNew(10);
						$scope.pagination.numPages = Math.ceil($scope.genres.length/$scope.pagination.perPage);
				})
    }

    $scope.deleteGenre = function(genreId){
        var genre = {
            "genreId": genreId
        }
        lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_GENRES, genre).then(function(data){
			lmsFactory.readAllObjects(adminConstants.GET_ALL_GENRES).then(function(data){
				$scope.genres = data;
				$scope.pagination = Pagination.getNew(10);
				$scope.pagination.numPages = Math.ceil($scope.genres.length/$scope.pagination.perPage);
			})
			$window.location.href = "#/admin/viewauthors";
		})
    }
})


lmsApp.controller("GenreDetailController",function($scope, $http, $window, $location,$routeParams,lmsFactory,adminConstants,Pagination,$filter){

    lmsFactory.readAllObjects("http://localhost:8080/lms/readGenreById/"+$routeParams.genreId).then(function(data){
			$scope.genre = data;
	 		$scope.booklist = $scope.genre.books;
	 		lmsFactory.saveAllObjects(adminConstants.DELETE_BOOK_GENRE,$scope.genre).then(function(data){
	 })
    })
    
    lmsFactory.readAllObjects(adminConstants.GET_ALL_BOOKS).then(function(data){
		$scope.books =data;
	})
	$scope.updateGenre = function(genreId){
		 $scope.genre.books = $scope.booklist;
		lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_GENRES,$scope.genre).then(function(data){
			$window.location.href = "#/admin/viewgenres"
		})
	}
})