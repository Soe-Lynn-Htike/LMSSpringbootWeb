"use strict";
lmsApp.config(["$routeProvider", function($routeProvider){
	return $routeProvider.when("/",{
		redirectTo: "/home"
	}).when("/borrower/checkborrower", {
		templateUrl: "checkborrower.html"
	}).when("/borrower/:cardNo/borrowerservice", {
		templateUrl: "borrowerservice.html"
	}).when("/borrower/:cardNo/checkoutbook", {
		templateUrl: "checkoutbook.html",
		controller : "CheckOutController"
	}).when("/borrower/:cardNo/returnbook", {
		templateUrl: "returnbook.html",
		controller : "ReturnBookController"
	})
}])
