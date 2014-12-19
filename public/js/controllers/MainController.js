'user strict';
ami.controller('MainController', function ($scope, RouteService, UserService, localStorageService) {
    $scope.tagline = 'To the moon and back!';
    var menu = [
        { item: "userlogin", text: "Login", url: "/userinfo", icon: "" },
        { item: "busroutes", text: "Bus Routes", url: "", icon: "" },
        { item: "bussearch", text: "Search Bus", url: "", icon: "" },
        { item: "transitmaps", text: "Transit Maps", url: "", icon: "" },
        { item: "favorites", text: "My Favorites", url: "", icon: "" },
        { item: "contact", text: "Contact", url: "", icon: "" },
        { item: "mta", text: "MTA", url: "", icon: "" },
        { item: "airlines", text: "Flight Tracker", url: "", icon: "" },
        { item: "trains", text: "Trains", url: "", icon: "" },
    ];
    var user = localStorageService.get('user');
    if (user) {

    }
});