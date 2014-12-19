//angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService']);

var ami = angular.module('ami', ['ngRoute', 'ngResource', 'LocalStorageModule','emguo.poller']);

ami.config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {

    $routeProvider

		// home page
		.when('/', {
		    templateUrl: 'views/home.html',
		    controller: 'MainController'
		})

		.when('/bussearch', {
		    templateUrl: 'views/bussearch.html',
		    controller: 'BusSearchController'
		})

		.when('/busroutelist', {
		    templateUrl: 'views/busroutelist.html',
		    controller: 'BusRouteListController'
		})

        .when('/busroutedetails', {
            templateUrl: 'views/busroutedetails.html',
            controller: 'BusRouteDetailsController'
        })

        .when('/busstoplist', {
            templateUrl: 'views/busstoplist.html',
            controller: 'BusStopController'
        })

        .when('/busstopdetails', {
            templateUrl: 'views/busstopdetails.html',
            controller: 'BusStopDetailController'
        })

        .when('/favorite', {
            templateUrl: 'views/favorite.html',
            controller: 'FavoriteController'
        })

        .when('/userinfo', {
            templateUrl: 'views/userinfo.html',
            controller: 'UserInfoController'
        });

    $routeProvider.otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);

    localStorageServiceProvider
        .setPrefix('ami')
        .setNotify(true, true);
});