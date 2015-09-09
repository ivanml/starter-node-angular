angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'AuthController'
		})

        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'AuthController'
        })

		.when('/bills', {
			templateUrl: 'views/bill.html',
			controller: 'BillController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

	$locationProvider.html5Mode(true);

}]);