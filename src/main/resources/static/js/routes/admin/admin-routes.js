lmsApp.config(["$routeProvider", function($routeProvider){
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
	})
}])