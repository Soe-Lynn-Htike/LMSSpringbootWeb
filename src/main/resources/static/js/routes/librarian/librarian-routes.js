"use strict";
lmsApp.config(["$routeProvider", function($routeProvider){
	return $routeProvider.when("/",{
		redirectTo: "/home"
	}).when("/librarian/viewbranches", {
		templateUrl: "viewbrancheslibrarian.html"
	}).when("/librarian/editbranch/:branchId", {
		templateUrl: "editbrancheslibrarian.html",
		controller: "LibrarianBranchDetailController"
	})
}])
