"use strict";
lmsApp.controller("genreController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,ngNotify){
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
		if($scope.genre.genre_name === null){
			ngNotify.set('Genre name is blank ', {
				theme: 'pure',
				position: 'top',
				duration: 1000,
				type: 'warn',
				sticky: false,
				button: true,
				html: false
			});
		}else{
			lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_GENRES, $scope.genre).then(function(data){
				ngNotify.set('Genre created successfully ', {
					theme: 'pure',
					position: 'top',
					duration: 1000,
					type: 'info',
					sticky: false,
					button: true,
					html: false
				});
				$window.location.href = "#/admin/viewgenres";
			})
		}
        
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


lmsApp.controller("GenreDetailController",function($scope, $http, $window, $location,$routeParams,lmsFactory,adminConstants,Pagination,$filter,ngNotify){

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
		if($scope.genre.genre_name ===""){
			ngNotify.set('Genre is blank', {
				theme: 'pure',
				position: 'top',
				duration: 1000,
				type: 'warn',
				sticky: false,
				button: true,
				html: false
			});
		}else{
			$scope.genre.books = $scope.booklist;
			lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_GENRES,$scope.genre).then(function(data){
				ngNotify.set('Genre updated successfully', {
					theme: 'pure',
					position: 'top',
					duration: 1000,
					type: 'info',
					sticky: false,
					button: true,
					html: false
				});
				$window.location.href = "#/admin/viewgenres"
			})
		}
		
	}
})