"use strict";
lmsApp.config(["$routeProvider", function($routeProvider,$locationProvider){
	/*$locationProvider.html5Mode(true).hasPrefix("!");*/
	return $routeProvider.when("/",{
		redirectTo: "/home"
	}).when("/home", {
		templateUrl: "home.html"
	}).when("/admin", {
		templateUrl: "admin.html"
	}).when("/admin/author", {
		templateUrl: "author.html"
	}).when("/admin/addauthor", {
		templateUrl: "addauthor.html"
	}).when("/admin/viewauthors", {
		templateUrl: "viewauthors.html"
	}).when("/admin/editauthor/:authorId", {
		templateUrl: "editauthor.html",
		controller: "AuthorDetailController"
	}).when("/admin/book", {
		templateUrl: "book.html"
	}).when("/admin/addbook", {
		templateUrl: "addbook.html"
	}).when("/admin/publisher", {
		templateUrl: "publisher.html"
	}).when("/admin/viewpublishers", {
		templateUrl: "viewpublishers.html"
	}).when("/admin/editpublisher/:publisherId", {
		templateUrl: "editpublisher.html",
		controller: "PublisherDetailController"
	})

	// $locationProvider.html5Mode({
	// 							enabled: true,
	// 							requireBase: false
	// 			 });
}])
