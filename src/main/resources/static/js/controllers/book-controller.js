lmsApp.controller("bookController",function($scope, $http, $window, $location,lmsFactory,adminConstants,Pagination,$filter,ngNotify){
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
		if($scope.selectedName === undefined){
			ngNotify.set('Please choose publisher', {
				theme: 'pure',
				position: 'top',
				duration: 1000,
				type: 'warn',
				sticky: false,
				button: true,
				html: false
			});
		}else if($scope.book.title === null || $scope.book.title ===""){
			ngNotify.set('Book tilte is blank', {
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
			$scope.book.publisherId = $scope.selectedName.publisherId;
			lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BOOKS, $scope.book).then(function(data){
				ngNotify.set('Book created successfully', {
					theme: 'pure',
					position: 'top',
					duration: 1000,
					type: 'info',
					sticky: false,
					button: true,
					html: false
				});
			$window.location.href = "#/admin/viewbooks";
		})
		}
		
		
}

	$scope.searchBooks = function(){
		lmsFactory.readAllObjects("http://localhost:8080/lms/readBookByTitle/"+$scope.searchString).then(function(data){
			$scope.books = data;
			$scope.pagination = Pagination.getNew(10);
			$scope.pagination.numPages = Math.ceil($scope.books.length/$scope.pagination.perPage);
	})
	}
})


lmsApp.controller("BookDetailController",function($scope, $http, $window, $location,$routeParams,lmsFactory,adminConstants,Pagination,$filter,ngNotify){
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
		if($scope.book.title === undefined || $scope.book.title ===""){
			ngNotify.set('Book tilte is blank', {
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
			$scope.book.authors = $scope.authorlist;
			$scope.book.genres = $scope.genrelist;
			lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BOOKS,$scope.book).then(function(data){
				ngNotify.set('Book is updated successfully', {
					theme: 'pure',
					position: 'top',
					duration: 1000,
					type: 'info',
					sticky: false,
					button: true,
					html: false
				});
				$window.location.href = "#/admin/viewbooks"
			})
		}
		
	}

})
