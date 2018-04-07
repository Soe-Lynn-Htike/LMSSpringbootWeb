"use strict";
lmsApp.config(["$routeProvider", function($routeProvider){
	return $routeProvider.when("/",{
		redirectTo: "/home"
	}).when("/borrower/checkborrower", {
		templateUrl: "checkborrower.html"
	})
}])
