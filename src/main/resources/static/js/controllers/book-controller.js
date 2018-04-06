lmsApp.controller("bookController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter){
    if($location.path() == '/admin/addbook'){
		lmsFactory.readAllObjects(adminConstants.INITIALIZE_BOOK).then(function(data){
			$scope.book = data;
            $scope.book.authors = [];
            $scope.book.genres = [];
            $scope.book.publisher = {};
			lmsFactory.readAllObjects(adminConstants.GET_ALL_AUTHORS).then(function(data){
				$scope.authors =data;
            })
            lmsFactory.readAllObjects(adminConstants.GET_ALL_GENRES).then(function(data){
				$scope.genres =data;
            })
            lmsFactory.readAllObjects(adminConstants.GET_PUBLISHERS_WITHOUT_BOOK).then(function(data){
				$scope.publishers =data;
            })
		})

	}else{
			lmsFactory.readAllObjects(adminConstants.GET_ALL_BOOKS).then(function(data){
				$scope.books = data;
				$scope.pagination = Pagination.getNew(10);
				$scope.pagination.numPages = Math.ceil($scope.books.length/$scope.pagination.perPage);
			})
	}

	$scope.saveBook = function(){
		if($scope.selectedName == undefined){
			alert("Select one  publisher");
		}else{
			$scope.book.publisherId = $scope.selectedName.publisherId;
		}
		
		lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BOOKS, $scope.book).then(function(data){
		$window.location.href = "#/admin/viewbooks";
	})
}

	$scope.searchBooks = function(){
		lmsFactory.readAllObjects("http://localhost:8080/lms/readBookByTitle/"+$scope.searchString).then(function(data){
			$scope.books = data;
			$scope.pagination = Pagination.getNew(10);
			$scope.pagination.numPages = Math.ceil($scope.books.length/$scope.pagination.perPage);
	})
	}
})


lmsApp.controller("BookDetailController",function($scope, $http, $window, $location,$routeParams,lmsFactory,adminConstants,Pagination,$filter){
	lmsFactory.readAllObjects("http://localhost:8080/lms/readBookById/"+$routeParams.bookId).then(function(data){
		$scope.book = data;
		$scope.authorlist = $scope.book.authors;
		$scope.genrelist = $scope.book.genres;
		lmsFactory.saveAllObjects(adminConstants.DELETE_BOOK_AUTHOR_GENRE,$scope.book).then(function(data){
 })
})
	lmsFactory.readAllObjects(adminConstants.GET_ALL_AUTHORS).then(function(data){
		$scope.authors = data;
	})

	lmsFactory.readAllObjects(adminConstants.GET_ALL_GENRES).then(function(data){
		$scope.genres = data;
	})

	$scope.updateBook = function(bookId){
		$scope.book.authors = $scope.authorlist;
		$scope.book.genres = $scope.genrelist;
		lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BOOKS,$scope.book).then(function(data){
			$window.location.href = "#/admin/viewbooks"
		})
	}

})
