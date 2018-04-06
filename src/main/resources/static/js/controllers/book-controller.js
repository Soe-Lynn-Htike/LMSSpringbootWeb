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
		$scope.book.publisherId = $scope.selectedName.publisherId;
		console.log($scope.book);
	// 	lmsFactory.saveAllObjects(adminConstants.SAVE_ALL_BOOKS, $scope.book).then(function(data){
	// 	$window.location.href = "#/admin/viewauthors";
	// })
}
})


lmsApp.controller("BookDetailController",function($scope, $http, $window, $location,$routeParams,lmsFactory,adminConstants,Pagination,$filter){

})
