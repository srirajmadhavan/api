'user strict';
ami.controller('RouteDetailsController', function ($scope, $routeParams, RouteService) {
    $scope.tagline = 'Nothing beats a pocket protector!';
    debugger;
    RouteService.getRouteDetails($routeParams.id).then(
           function (data) {
               $scope.directions = data;
           },
          function (error) {
              console.log(error)
          });
});