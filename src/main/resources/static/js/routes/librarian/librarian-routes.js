lmsApp.config(["$routeProvider", function($routeProvider){
	return $routeProvider.when("/",{
		redirectTo: "/home"
	}).when("/librarian/addauthor", {
		templateUrl: "addauthor.html"
	})
}])
