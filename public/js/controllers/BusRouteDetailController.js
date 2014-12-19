'user strict';
ami.controller('BusRouteDetailController', function ($scope, $routeParams, RouteService) {
    $scope.tagline = 'Nothing beats a pocket protector!';
    RouteService.getRouteDetails($routeParams.id).then(
           function (data) {
               $scope.directions = data;
           },
          function (error) {
              console.log(error)
          });
});