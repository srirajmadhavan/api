//angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService']);

var ami = angular.module('ami', ['ngRoute', 'ngResource', 'LocalStorageModule']);

ami.config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {

    $routeProvider

		// home page
		.when('/', {
		    templateUrl: 'views/home.html',
		    controller: 'MainController'
		})

		.when('/search', {
		    templateUrl: 'views/search.html',
		    controller: 'SearchController'
		})

		.when('/list', {
		    templateUrl: 'views/list.html',
		    controller: 'ListController'
		})

        .when('/routedetails', {
            templateUrl: 'views/routedetails.html',
            controller: 'RouteDetailsController'
        })

        .when('/stoplist', {
            templateUrl: 'views/stoplist.html',
            controller: 'StopController'
        })

        .when('/stopdetails', {
            templateUrl: 'views/stopdetails.html',
            controller: 'StopDetailController'
        })

        .when('/favorite', {
            templateUrl: 'views/favorite.html',
            controller: 'FavoriteController'
        });
    $routeProvider.otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);

    localStorageServiceProvider
        .setPrefix('ami')
        .setNotify(true, true);
});